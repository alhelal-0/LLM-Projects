import type { Edge, Node } from '@xyflow/react'
import type { RoadmapData, RoadmapNode } from '../types/roadmap'

export interface RoadmapFlowData {
  label: string
  roadmapType: string
  href?: string
  url?: string
  color?: string
  backgroundColor?: string
  nodeStyle?: RoadmapNode['data']['style']
  links?: RoadmapNode['data']['links']
}

function nodeSize(node: RoadmapNode): { width: number; height: number } {
  const width = node.measured?.width ?? node.width ?? node.style?.width ?? 120
  const height = node.measured?.height ?? node.height ?? node.style?.height ?? 40
  return { width, height }
}

export function transformRoadmap(data: RoadmapData): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = data.nodes.map((node) => {
    const { width, height } = nodeSize(node)
    return {
      id: node.id,
      type: 'roadmapNode',
      position: node.position,
      zIndex: node.zIndex ?? 0,
      data: {
        label: node.data.label ?? '',
        roadmapType: node.type,
        href: node.data.href,
        url: node.data.url,
        color: node.data.color,
        backgroundColor: node.data.backgroundColor,
        nodeStyle: node.data.style,
        links: node.data.links,
      } satisfies RoadmapFlowData,
      style: { width, height },
      draggable: false,
      selectable: ['topic', 'subtopic', 'button'].includes(node.type),
    }
  })

  // Connector visuals are rendered via horizontal/vertical line nodes in the JSON.
  const edges: Edge[] = []

  return { nodes, edges }
}
