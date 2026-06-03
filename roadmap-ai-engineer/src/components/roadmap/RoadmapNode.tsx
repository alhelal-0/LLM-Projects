import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { RoadmapFlowData } from '../../lib/transformRoadmap'

function LineNode({
  orientation,
  style,
  width,
  height,
}: {
  orientation: 'horizontal' | 'vertical'
  style?: RoadmapFlowData['nodeStyle']
  width: number
  height: number
}) {
  const stroke = style?.stroke ?? '#2B78E4'
  const strokeWidth = style?.strokeWidth ?? 3.5
  const dash = style?.strokeDasharray ?? '0.8 8'

  if (orientation === 'horizontal') {
    return (
      <svg width={width} height={height} className="overflow-visible">
        <line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={dash}
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg width={width} height={height} className="overflow-visible">
      <line
        x1={width / 2}
        y1={0}
        x2={width / 2}
        y2={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
        strokeLinecap="round"
      />
    </svg>
  )
}

function RoadmapNodeComponent({ data, selected, width, height }: NodeProps) {
  const nodeData = data as unknown as RoadmapFlowData
  const { roadmapType, label, nodeStyle, href, url, backgroundColor, color, links } = nodeData
  const fontSize = nodeStyle?.fontSize ?? 17
  const nodeWidth = width ?? 80
  const nodeHeight = height ?? 40

  const clickable = ['topic', 'subtopic', 'button'].includes(roadmapType)

  if (roadmapType === 'horizontal' || roadmapType === 'vertical') {
    return (
      <div className="pointer-events-none" style={{ width: nodeWidth, height: nodeHeight }}>
        <LineNode
          orientation={roadmapType}
          style={nodeStyle}
          width={nodeWidth}
          height={nodeHeight}
        />
      </div>
    )
  }

  if (roadmapType === 'section') {
    return (
      <div
        className="h-full w-full rounded-sm border-2 border-black bg-white"
        style={{
          backgroundColor: nodeStyle?.backgroundColor ?? '#ffffff',
          borderColor: nodeStyle?.borderColor ?? '#000000',
        }}
      />
    )
  }

  if (roadmapType === 'title') {
    return (
      <div
        className="flex h-full w-full items-center justify-center font-bold text-gray-900"
        style={{ fontSize }}
      >
        {label}
      </div>
    )
  }

  if (roadmapType === 'label') {
    return (
      <div
        className="flex h-full w-full items-center font-semibold text-gray-900"
        style={{ fontSize, color: color ?? nodeStyle?.color ?? '#000000' }}
      >
        {label}
      </div>
    )
  }

  if (roadmapType === 'paragraph') {
    return (
      <div
        className="flex h-full w-full items-start justify-center rounded-sm border-2 border-black bg-white p-2 text-center text-gray-900"
        style={{
          fontSize,
          backgroundColor: nodeStyle?.backgroundColor ?? '#ffffff',
          borderColor: nodeStyle?.borderColor ?? '#000000',
          padding: nodeStyle?.padding ?? 8,
        }}
      >
        {label}
      </div>
    )
  }

  if (roadmapType === 'linksgroup') {
    return (
      <div className="flex h-full w-full flex-col gap-2 rounded-sm border border-gray-300 bg-white p-3">
        <div className="text-sm font-bold text-gray-900">{label}</div>
        <div className="flex flex-col gap-1">
          {(links ?? []).map((link) => (
            <a
              key={link.id}
              href={link.url || link.href || '#'}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    )
  }

  if (roadmapType === 'button') {
    const link = href || url
    const inner = (
      <div
        className={`flex h-full w-full items-center justify-center rounded-sm border border-gray-400 font-medium text-gray-900 transition hover:brightness-95 ${clickable ? 'cursor-pointer' : ''} ${selected ? 'ring-2 ring-accent' : ''}`}
        style={{
          fontSize,
          backgroundColor: backgroundColor ?? '#d1d1d1',
          color: color ?? '#000000',
        }}
      >
        {label}
      </div>
    )

    if (link) {
      return (
        <a href={link} target="_blank" rel="noreferrer" className="block h-full w-full" onClick={(e) => e.stopPropagation()}>
          {inner}
        </a>
      )
    }
    return inner
  }

  // topic & subtopic
  return (
    <>
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <div
        className={`flex h-full w-full items-center justify-center rounded-sm border-2 border-black bg-white px-2 text-gray-900 transition hover:bg-gray-50 ${clickable ? 'cursor-pointer' : ''} ${selected ? 'ring-2 ring-accent ring-offset-1' : ''}`}
        style={{
          fontSize,
          textAlign: (nodeStyle?.textAlign as React.CSSProperties['textAlign']) ?? 'center',
        }}
      >
        {label}
      </div>
    </>
  )
}

export default memo(RoadmapNodeComponent)
