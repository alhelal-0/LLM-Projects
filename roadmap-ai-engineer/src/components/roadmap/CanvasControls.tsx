import { Maximize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
import { useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'

export function CanvasControls({ onFullscreen }: { onFullscreen: () => void }) {
  const { zoomIn, zoomOut, fitView } = useReactFlow()

  const handleFit = useCallback(() => {
    fitView({ padding: 0.15, duration: 300 })
  }, [fitView])

  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
      <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-bg-secondary shadow-lg">
        <button
          type="button"
          onClick={() => zoomIn({ duration: 200 })}
          className="flex h-9 w-9 items-center justify-center text-gray-200 hover:bg-bg-card"
          title="Zoom in"
        >
          <ZoomIn size={16} />
        </button>
        <button
          type="button"
          onClick={() => zoomOut({ duration: 200 })}
          className="flex h-9 w-9 items-center justify-center border-t border-border text-gray-200 hover:bg-bg-card"
          title="Zoom out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          type="button"
          onClick={handleFit}
          className="flex h-9 w-9 items-center justify-center border-t border-border text-gray-200 hover:bg-bg-card"
          title="Fit view"
        >
          <RotateCcw size={16} />
        </button>
        <button
          type="button"
          onClick={onFullscreen}
          className="flex h-9 w-9 items-center justify-center border-t border-border text-gray-200 hover:bg-bg-card"
          title="Fullscreen"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  )
}
