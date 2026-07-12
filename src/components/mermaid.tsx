'use client'

import { ArrowCounterClockwiseIcon, HandGrabbingIcon, MinusIcon, PlusIcon } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useRef, useState } from 'react'

interface MermaidProps {
  chart: string
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  // Zoom & Pan states
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Initialize Mermaid and render diagram
  useEffect(() => {
    let active = true

    async function renderChart() {
      try {
        const { default: mermaid } = await import('mermaid')

        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'var(--font-sans)',
        })

        // Generate a unique ID for the mermaid render
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`

        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(id, chart)

        if (active) {
          setSvg(renderedSvg)
          setError(null)
          // Reset transform when chart content changes
          setScale(1)
          setOffset({ x: 0, y: 0 })
        }
      }
      catch (err: any) {
        console.error('Mermaid render error:', err)
        if (active) {
          setError(err.message || 'Failed to render Mermaid chart')
        }
      }
    }

    renderChart()

    return () => {
      active = false
    }
  }, [chart, resolvedTheme])

  // Hook wheel events for zooming (without page scrolling)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas)
      return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const zoomFactor = 0.08
      const direction = e.deltaY < 0 ? 1 : -1
      setScale(prev => Math.max(0.1, Math.min(8, prev + direction * zoomFactor)))
    }

    canvas.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [svg])

  // Mouse Drag / Pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0)
      return // Left click only
    setIsDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging)
      return
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      const touch = e.touches[0]
      setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y })
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging)
      return
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      setOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Zoom controls
  const zoomIn = () => setScale(s => Math.min(s + 0.2, 8))
  const zoomOut = () => setScale(s => Math.max(s - 0.2, 0.1))
  const resetTransform = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  if (error) {
    return (
      <div className="my-6 p-4 overflow-auto text-xs text-red-500 bg-red-500/10 rounded-md border border-red-500/20 font-mono">
        <div className="font-semibold mb-1">Mermaid Render Error:</div>
        <code>{error}</code>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center p-8 text-xs text-muted-foreground animate-pulse font-mono bg-os-surface border border-os-border rounded-sm h-[400px] my-6">
        Rendering chart...
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] border border-os-border bg-os-surface rounded-sm overflow-hidden my-6 group select-none"
    >
      {/* Zoom Controls Overlay */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 p-1 bg-os-surface/85 backdrop-blur-md border border-os-border rounded-sm shadow-sm opacity-80 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={zoomOut}
          title="Zoom Out"
          className="p-1 text-muted-foreground hover:text-foreground hover:bg-os-border/30 rounded-sm transition-colors cursor-pointer"
        >
          <MinusIcon size={12} weight="bold" />
        </button>
        <span className="text-[10px] font-mono px-1.5 text-muted-foreground min-w-[42px] text-center">
          {Math.round(scale * 100)}
          %
        </span>
        <button
          onClick={zoomIn}
          title="Zoom In"
          className="p-1 text-muted-foreground hover:text-foreground hover:bg-os-border/30 rounded-sm transition-colors cursor-pointer"
        >
          <PlusIcon size={12} weight="bold" />
        </button>
        <div className="w-[1px] h-3 bg-os-border mx-0.5" />
        <button
          onClick={resetTransform}
          title="Fit / Reset View"
          className="p-1 text-muted-foreground hover:text-foreground hover:bg-os-border/30 rounded-sm transition-colors cursor-pointer"
        >
          <ArrowCounterClockwiseIcon size={12} />
        </button>
      </div>

      {/* Floating Panning Guide */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 bg-os-surface/75 backdrop-blur-sm border border-os-border rounded-sm text-[9px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <HandGrabbingIcon size={11} className="mr-0.5 text-os-accent" />
        Drag to Pan | Scroll to Zoom
      </div>

      {/* Interactive Drag/Zoom Canvas */}
      <div
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={resetTransform}
        className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden bg-[radial-gradient(var(--color-os-border)_1px,transparent_1px)] bg-[size:16px_16px] flex items-center justify-center"
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.12s ease-out',
          }}
          className="absolute max-w-full max-h-full flex items-center justify-center [&>svg]:max-w-none [&>svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </div>
  )
}
