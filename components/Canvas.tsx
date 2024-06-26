'use client'
import { useRef, useEffect } from 'react'

interface CanvasProps {
  width: number
  height: number
  draw: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void
  style: React.CSSProperties
}

const Canvas = ({ width, height, draw, style }: CanvasProps) => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  console.log('canvas', canvas)

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d')
      if (ctx) {
        draw(canvas.current, ctx)
      }
    }
  }, [width, height, draw])

  return <canvas ref={canvas} width={width} height={height} style={style} />
}

export default Canvas
