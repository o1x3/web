'use client'

import { memo, useState, useCallback, useRef, useEffect } from 'react'

interface NodePosition {
  x: number
  y: number
}

interface SkillNode {
  id: string
  label: string
  skills: string[]
}

// Skill categories data
const skillNodesData: SkillNode[] = [
  { id: 'aiml', label: 'AI/ML', skills: ['TensorFlow', 'PyTorch', 'LLMs', 'Computer Vision'] },
  { id: 'cloud', label: 'Cloud', skills: ['AWS', 'Azure', 'GCP', 'BigQuery'] },
  { id: 'devops', label: 'DevOps', skills: ['Docker', 'Kubernetes', 'CI/CD', 'Git'] },
  { id: 'backend', label: 'Backend', skills: ['Python', 'Flask', 'REST APIs', 'GraphDBs'] },
  { id: 'data', label: 'Data', skills: ['Pandas', 'ETL', 'Knowledge Graphs', 'SQL'] },
]

// Organic clustered initial positions (percentages)
const initialPositions: Record<string, NodePosition> = {
  aiml: { x: 25, y: 12 },
  cloud: { x: 75, y: 22 },
  devops: { x: 40, y: 40 },
  backend: { x: 80, y: 58 },
  data: { x: 30, y: 75 },
}

// Edges connecting nodes
const edges = [
  { from: 'aiml', to: 'cloud' },
  { from: 'cloud', to: 'devops' },
  { from: 'devops', to: 'backend' },
  { from: 'backend', to: 'data' },
  { from: 'aiml', to: 'devops' },
  { from: 'cloud', to: 'data' },
]

interface SkillGraphProps {
  className?: string
}

export const SkillGraph = memo(function SkillGraph({ className = '' }: SkillGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<Record<string, NodePosition>>(initialPositions)
  const [draggingNode, setDraggingNode] = useState<string | null>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Handle mouse down on node
  const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.preventDefault()
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const nodePos = positions[nodeId]

    // Calculate offset from node center to mouse position
    const nodeX = (nodePos.x / 100) * rect.width
    const nodeY = (nodePos.y / 100) * rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    dragOffset.current = {
      x: mouseX - nodeX,
      y: mouseY - nodeY,
    }

    setDraggingNode(nodeId)
    setActiveNode(nodeId)
  }, [positions])

  // Handle mouse move
  useEffect(() => {
    if (!draggingNode) return

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left - dragOffset.current.x
      const mouseY = e.clientY - rect.top - dragOffset.current.y

      // Convert to percentage and clamp
      const newX = Math.max(10, Math.min(90, (mouseX / rect.width) * 100))
      const newY = Math.max(5, Math.min(95, (mouseY / rect.height) * 100))

      setPositions(prev => ({
        ...prev,
        [draggingNode]: { x: newX, y: newY },
      }))
    }

    const handleMouseUp = () => {
      setDraggingNode(null)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [draggingNode])

  // Calculate bezier curve path between two nodes
  const getBezierPath = useCallback((from: NodePosition, to: NodePosition) => {
    // Control point offset for curve
    const dx = to.x - from.x
    const dy = to.y - from.y

    // Create organic curve by offsetting control points
    const cx1 = from.x + dx * 0.3 + (dy > 0 ? 15 : -15)
    const cy1 = from.y + dy * 0.3
    const cx2 = to.x - dx * 0.3 + (dy > 0 ? -10 : 10)
    const cy2 = to.y - dy * 0.3

    return `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`
  }, [])

  const isNodeConnected = useCallback((nodeId: string) => {
    if (!activeNode) return false
    return edges.some(
      (edge) =>
        (edge.from === activeNode && edge.to === nodeId) ||
        (edge.to === activeNode && edge.from === nodeId)
    )
  }, [activeNode])

  const isEdgeConnected = useCallback((edge: { from: string; to: string }) => {
    if (!activeNode) return false
    return edge.from === activeNode || edge.to === activeNode
  }, [activeNode])

  return (
    <div ref={containerRef} className={`skill-graph-floating ${className}`}>
      {/* SVG for curved edges */}
      <svg className="skill-graph-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
        {edges.map((edge) => {
          const from = positions[edge.from]
          const to = positions[edge.to]
          const isHighlighted = isEdgeConnected(edge)
          const isDimmed = activeNode && !isHighlighted

          return (
            <path
              key={`${edge.from}-${edge.to}`}
              d={getBezierPath(from, to)}
              className={`skill-edge-curve ${isHighlighted ? 'highlighted' : ''} ${isDimmed ? 'dimmed' : ''}`}
            />
          )
        })}
      </svg>

      {/* Draggable nodes */}
      {skillNodesData.map((node) => {
        const pos = positions[node.id]
        const isActive = activeNode === node.id
        const isConnected = isNodeConnected(node.id)
        const isDimmed = activeNode && !isActive && !isConnected
        const isDragging = draggingNode === node.id

        return (
          <div
            key={node.id}
            className={`skill-node-floating ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''} ${isDragging ? 'dragging' : ''}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
            onMouseEnter={() => !draggingNode && setActiveNode(node.id)}
            onMouseLeave={() => !draggingNode && setActiveNode(null)}
            role="button"
            tabIndex={0}
            aria-label={`${node.label}: ${node.skills.join(', ')}. Drag to reposition.`}
          >
            <span className="skill-node-dot" />
            <span className="skill-node-label">{node.label}</span>
          </div>
        )
      })}

      {/* Tooltip on hover */}
      {activeNode && !draggingNode && (
        <div
          className="skill-tooltip-floating"
          style={{
            left: `${Math.min(positions[activeNode].x + 8, 70)}%`,
            top: `${positions[activeNode].y}%`,
          }}
        >
          {skillNodesData
            .find((n) => n.id === activeNode)
            ?.skills.map((skill) => (
              <span key={skill} className="skill-tooltip-item">{skill}</span>
            ))}
        </div>
      )}

      {/* Mobile fallback */}
      <div className="skill-tags-mobile">
        {skillNodesData.map((node) => (
          <div key={node.id} className="flex flex-wrap gap-1">
            <span className="tag tag-accent">{node.label}</span>
            {node.skills.map((skill) => (
              <span key={skill} className="tag">{skill}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
})
