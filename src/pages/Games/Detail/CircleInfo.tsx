import * as React from 'react';
import CircleCanvas from '@/components/CircleCanvas';
import { Circle } from './style';

interface Props {
  title: string;
  percent: number;
  color: string;
}

const CircleInfo: React.SFC<Props> = ({ children, title, percent, color }) => (
  <Circle>
    <CircleCanvas percent={percent} color={color} />
    {children}
    <p>{title}</p>
  </Circle>
);

export default CircleInfo;
