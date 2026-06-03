#!/usr/bin/env python3
"""Terminal Snake — a classic arcade game for the command line.

Controls
--------
  Arrow keys / WASD  Move
  P                  Pause / resume
  R                  Restart (after game over)
  Q                  Quit

Run: python3 snake_game.py
"""

from __future__ import annotations

import curses
import random
from collections import deque
from dataclasses import dataclass
from typing import Deque, Optional, Set, Tuple

Position = Tuple[int, int]

MAX_BOARD_WIDTH = 42
MAX_BOARD_HEIGHT = 22
MIN_BOARD_WIDTH = 12
MIN_BOARD_HEIGHT = 8
MIN_TERM_COLS = 28
MIN_TERM_ROWS = 14
INITIAL_DELAY_MS = 120
MIN_DELAY_MS = 55
SPEEDUP_EVERY = 5
SPEEDUP_STEP_MS = 8


@dataclass
class BoardSize:
    width: int
    height: int


@dataclass
class Layout:
    board: BoardSize
    board_y: int
    board_x: int
    status_y: int
    message_y: int
    help_y: int


@dataclass
class GameState:
    snake: Deque[Position]
    direction: Position
    pending_direction: Position
    food: Position
    score: int
    delay_ms: int
    paused: bool
    game_over: bool
    message: str


def compute_layout(stdscr: curses.window) -> Layout:
    rows, cols = stdscr.getmaxyx()
    if rows < MIN_TERM_ROWS or cols < MIN_TERM_COLS:
        raise curses.error(
            f"Terminal too small ({cols}x{rows}). "
            f"Resize to at least {MIN_TERM_COLS}x{MIN_TERM_ROWS} and try again."
        )

    status_y = 0
    help_y = rows - 1
    message_y = rows - 2
    board_y = 1

    max_board_h = message_y - board_y - 1
    max_board_w = cols - 4

    board_h = min(MAX_BOARD_HEIGHT, max(MIN_BOARD_HEIGHT, max_board_h - 2))
    board_w = min(MAX_BOARD_WIDTH, max(MIN_BOARD_WIDTH, max_board_w - 2))
    board_x = max(1, (cols - (board_w + 2)) // 2)

    return Layout(
        board=BoardSize(width=board_w, height=board_h),
        board_y=board_y,
        board_x=board_x,
        status_y=status_y,
        message_y=message_y,
        help_y=help_y,
    )


def safe_addstr(win: curses.window, y: int, x: int, text: str, attr: int = 0) -> None:
    if not text:
        return
    height, width = win.getmaxyx()
    if y < 0 or y >= height or x >= width - 1:
        return
    clipped = text[: max(0, width - x - 1)]
    if not clipped:
        return
    try:
        win.addstr(y, x, clipped, attr)
    except curses.error:
        pass


def random_empty_cell(occupied: Set[Position], board: BoardSize) -> Position:
    free = [
        (y, x)
        for y in range(board.height)
        for x in range(board.width)
        if (y, x) not in occupied
    ]
    if not free:
        raise RuntimeError("Board is full")
    return random.choice(free)


def new_game(board: BoardSize) -> GameState:
    center = (board.height // 2, board.width // 2)
    snake: Deque[Position] = deque(
        [center, (center[0], center[1] - 1), (center[0], center[1] - 2)]
    )
    direction = (0, 1)
    food = random_empty_cell(set(snake), board)
    return GameState(
        snake=snake,
        direction=direction,
        pending_direction=direction,
        food=food,
        score=0,
        delay_ms=INITIAL_DELAY_MS,
        paused=False,
        game_over=False,
        message="Eat the food. Avoid walls and yourself.",
    )


def opposite(a: Position, b: Position) -> bool:
    return a[0] == -b[0] and a[1] == -b[1]


def apply_direction(state: GameState, new_dir: Position) -> None:
    if state.game_over:
        return
    if not opposite(new_dir, state.direction):
        state.pending_direction = new_dir


def step(state: GameState, board: BoardSize) -> None:
    if state.paused or state.game_over:
        return

    state.direction = state.pending_direction
    head_y, head_x = state.snake[0]
    dy, dx = state.direction
    new_head = (head_y + dy, head_x + dx)

    if not (0 <= new_head[0] < board.height and 0 <= new_head[1] < board.width):
        state.game_over = True
        state.message = f"Game over — wall hit. Score: {state.score}. Press R to restart."
        return

    if new_head in state.snake:
        state.game_over = True
        state.message = f"Game over — you bit yourself. Score: {state.score}. Press R."
        return

    state.snake.appendleft(new_head)

    if new_head == state.food:
        state.score += 1
        if state.score % SPEEDUP_EVERY == 0:
            state.delay_ms = max(MIN_DELAY_MS, state.delay_ms - SPEEDUP_STEP_MS)
        try:
            state.food = random_empty_cell(set(state.snake), board)
        except RuntimeError:
            state.game_over = True
            state.message = f"You win! Score: {state.score}. Press R to play again."
    else:
        state.snake.pop()


def draw(
    stdscr: curses.window,
    layout: Layout,
    state: GameState,
    high_score: int,
    color_snake: int,
    color_head: int,
    color_food: int,
    color_text: int,
) -> None:
    board = layout.board
    stdscr.erase()

    win_h = board.height + 2
    win_w = board.width + 2
    board_win = curses.newwin(win_h, win_w, layout.board_y, layout.board_x)
    board_win.box()

    for segment in list(state.snake)[1:]:
        board_win.addch(segment[0] + 1, segment[1] + 1, "o", color_snake)
    head_y, head_x = state.snake[0]
    board_win.addch(head_y + 1, head_x + 1, "@", color_head)
    food_y, food_x = state.food
    board_win.addch(food_y + 1, food_x + 1, "*", color_food)

    status = f" Score: {state.score}  High: {high_score}  Speed: {state.delay_ms}ms "
    if state.paused:
        status += " [PAUSED]"
    if state.game_over:
        status += " [GAME OVER]"

    safe_addstr(stdscr, layout.status_y, 1, status, color_text)
    safe_addstr(stdscr, layout.message_y, 1, state.message, color_text)
    safe_addstr(
        stdscr,
        layout.help_y,
        1,
        "Move: arrows/WASD  Pause: P  Quit: Q  Restart: R",
        color_text,
    )

    board_win.refresh()
    stdscr.refresh()


def read_input(stdscr: curses.window, state: GameState) -> Optional[str]:
    try:
        key = stdscr.getch()
    except curses.error:
        return None

    if key == -1:
        return None

    if key == curses.KEY_RESIZE:
        return "resize"

    if key in (ord("q"), ord("Q")):
        return "quit"
    if key in (ord("r"), ord("R")):
        return "restart"
    if key in (ord("p"), ord("P")):
        return "pause"

    direction_map = {
        curses.KEY_UP: (-1, 0),
        curses.KEY_DOWN: (1, 0),
        curses.KEY_LEFT: (0, -1),
        curses.KEY_RIGHT: (0, 1),
        ord("w"): (-1, 0),
        ord("W"): (-1, 0),
        ord("s"): (1, 0),
        ord("S"): (1, 0),
        ord("a"): (0, -1),
        ord("A"): (0, -1),
        ord("d"): (0, 1),
        ord("D"): (0, 1),
    }

    if key in direction_map:
        apply_direction(state, direction_map[key])

    return None


def run(stdscr: curses.window) -> int:
    curses.curs_set(0)
    stdscr.nodelay(True)
    stdscr.keypad(True)

    color_snake = color_head = color_food = color_text = curses.A_NORMAL
    if curses.has_colors():
        curses.start_color()
        curses.use_default_colors()
        curses.init_pair(1, curses.COLOR_GREEN, -1)
        curses.init_pair(2, curses.COLOR_YELLOW, -1)
        curses.init_pair(3, curses.COLOR_RED, -1)
        curses.init_pair(4, curses.COLOR_CYAN, -1)
        color_snake = curses.color_pair(1)
        color_head = curses.color_pair(2) | curses.A_BOLD
        color_food = curses.color_pair(3) | curses.A_BOLD
        color_text = curses.color_pair(4)

    layout = compute_layout(stdscr)
    state = new_game(layout.board)
    high_score = 0

    while True:
        stdscr.timeout(state.delay_ms if not state.paused and not state.game_over else 100)
        action = read_input(stdscr, state)

        if action == "quit":
            return max(high_score, state.score)
        if action == "resize":
            layout = compute_layout(stdscr)
            state = new_game(layout.board)
            continue
        if action == "restart":
            high_score = max(high_score, state.score)
            layout = compute_layout(stdscr)
            state = new_game(layout.board)
            continue
        if action == "pause" and not state.game_over:
            state.paused = not state.paused
            state.message = "Paused — press P to resume." if state.paused else "Resumed."

        if not state.paused and not state.game_over:
            step(state, layout.board)
            high_score = max(high_score, state.score)

        draw(stdscr, layout, state, high_score, color_snake, color_head, color_food, color_text)


def main() -> None:
    try:
        final_high = curses.wrapper(run)
    except curses.error as exc:
        raise SystemExit(
            "Could not start the terminal UI. Resize the window and try again.\n"
            f"Details: {exc}"
        ) from exc

    print(f"Thanks for playing! Best score this session: {final_high}")


if __name__ == "__main__":
    main()
