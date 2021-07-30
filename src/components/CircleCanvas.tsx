import { FC, useEffect, useRef, useState } from 'react'

export interface CircelCanvasProps {
  percent: number
  color: string
}

const FPS = 1000 / 200
const ONE_PERCENT = 360 / 100

const drawCircle = (canvas: HTMLCanvasElement, perc: number, color: string) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return false
  }
  ctx.lineCap = 'round'

  const posX = canvas.width / 2
  const posY = canvas.height / 2
  const res = ONE_PERCENT * perc
  const change = { percent: 0, degrees: 0 }

  const draw = () => {
    change.degrees += 1

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    change.percent = change.degrees / ONE_PERCENT

    const start = (Math.PI / 180) * 270
    const end = (Math.PI / 180) * (270 + change.degrees)

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 10
    ctx.arc(posX, posY, 40, start, end)
    ctx.stroke()

    if (change.degrees < res) {
      setTimeout(draw, FPS)
    }
  }

  setTimeout(draw, FPS)
}

const CircleCanvas: FC<CircelCanvasProps> = ({ percent, color }) => {
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const [isDrawed, setIsDrawed] = useState(false)

  useEffect(() => {
    if (canvas.current && !isNaN(percent) && !isDrawed) {
      drawCircle(canvas.current, percent, color)
      setIsDrawed(true)
    }
  }, [color, percent, isDrawed])

  return <canvas ref={canvas} width="100" height="100" />
}

export default CircleCanvas
