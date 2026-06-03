export interface RoadmapNodeStyle {
  fontSize?: number
  backgroundColor?: string
  borderColor?: string
  color?: string
  textAlign?: string
  justifyContent?: string
  padding?: number
  stroke?: string
  strokeWidth?: number
  strokeDasharray?: string
  strokeLinecap?: string
}

export interface RoadmapLink {
  id: string
  label: string
  href?: string
  url?: string
}

export interface RoadmapNodeData {
  label?: string
  href?: string
  url?: string
  color?: string
  backgroundColor?: string
  style?: RoadmapNodeStyle
  links?: RoadmapLink[]
  oldId?: string
}

export interface RoadmapNode {
  id: string
  type: string
  position: { x: number; y: number }
  width?: number
  height?: number
  zIndex?: number
  data: RoadmapNodeData
  style?: { width?: number; height?: number }
  measured?: { width?: number; height?: number }
}

export interface RoadmapEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  style?: RoadmapNodeStyle
  data?: { edgeStyle?: string }
}

export interface RichTextDoc {
  type: string
  content?: Array<{
    type: string
    content?: Array<{ type: string; text?: string }>
  }>
}

export interface RoadmapQuestion {
  type: string
  title: string
  description?: RichTextDoc | string
  _id?: string
}

export interface RoadmapData {
  title: { card: string; page: string }
  description: string
  slug: string
  nodes: RoadmapNode[]
  edges: RoadmapEdge[]
  questions: RoadmapQuestion[]
  dimensions?: { width: number; height: number }
}

export interface SelectedNode {
  id: string
  label: string
  type: string
}
