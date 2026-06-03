import {
  Background,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import roadmapData from '../../data/ai-engineer.json'
import { loadProgress, toggleProgress } from '../../lib/progress'
import { transformRoadmap } from '../../lib/transformRoadmap'
import type { RoadmapData, SelectedNode } from '../../types/roadmap'
import { CanvasControls } from './CanvasControls'
import RoadmapNodeComponent from './RoadmapNode'
import { NodeDetailPanel } from './NodeDetailPanel'

const nodeTypes = { roadmapNode: RoadmapNodeComponent }

function RoadmapCanvasInner() {
  const data = roadmapData as RoadmapData
  const containerRef = useRef<HTMLDivElement>(null)
  const { fitView } = useReactFlow()
  const [selected, setSelected] = useState<SelectedNode | null>(null)
  const [progress, setProgress] = useState<Set<string>>(() => loadProgress())
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { nodes, edges } = useMemo(() => transformRoadmap(data), [data])

  useEffect(() => {
    const timer = setTimeout(() => fitView({ padding: 0.12, duration: 400 }), 100)
    return () => clearTimeout(timer)
  }, [fitView])

  const onNodeClick: NodeMouseHandler = useCallback((_event, node: Node) => {
    const type = (node.data as { roadmapType?: string }).roadmapType ?? ''
    if (!['topic', 'subtopic', 'button'].includes(type)) return
    const label = (node.data as { label?: string }).label ?? 'Untitled'
    setSelected({ id: node.id, label, type })
  }, [])

  const handleToggleDone = useCallback(() => {
    if (!selected) return
    setProgress(toggleProgress(selected.id))
  }, [selected])

  const handleFullscreen = useCallback(async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      await el.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const canvasHeight = isFullscreen ? '100vh' : 'min(70vh, 720px)'

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`roadmap-flow overflow-hidden rounded-xl border border-border bg-white ${isFullscreen ? 'rounded-none' : ''}`}
        style={{ height: canvasHeight }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          panOnScroll
          zoomOnScroll
          minZoom={0.15}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e5e7eb" gap={20} size={1} />
          <MiniMap
            nodeColor={(n) => {
              const t = (n.data as { roadmapType?: string }).roadmapType
              if (t === 'topic') return '#2b78e4'
              if (t === 'subtopic') return '#6b7280'
              return '#d1d5db'
            }}
            maskColor="rgba(15, 17, 23, 0.75)"
          />
          <CanvasControls onFullscreen={handleFullscreen} />
        </ReactFlow>
      </div>

      <NodeDetailPanel
        node={selected}
        isDone={selected ? progress.has(selected.id) : false}
        onClose={() => setSelected(null)}
        onToggleDone={handleToggleDone}
      />
    </div>
  )
}

export function RoadmapCanvas() {
  return (
    <ReactFlowProvider>
      <RoadmapCanvasInner />
    </ReactFlowProvider>
  )
}
