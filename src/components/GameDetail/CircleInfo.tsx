import { FC } from 'react'
import CircleCanvas from '../CircleCanvas'
import { Circle } from './style'

export interface CircleInfoProps {
  title: string
  percent: number
  color: string
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
