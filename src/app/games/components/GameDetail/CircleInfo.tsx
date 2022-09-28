import { FC, ReactNode } from 'react'
import CircleCanvas from '@/components/CircleCanvas'
import { Circle } from './style'

export interface CircleInfoProps {
  title: string
  percent: number
  color: string
  children?: ReactNode
}

const CircleInfo: FC<CircleInfoProps> = ({
  children,
  title,
  percent,
  color
}) => (
  <Circle>
    <CircleCanvas percent={percent} color={color} />
    {children}
    <p>{title}</p>
  </Circle>
)

export default CircleInfo
