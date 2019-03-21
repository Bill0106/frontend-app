import * as React from 'react';
import CircleCanvas from '@/components/CircleCanvas';
import { Circle } from './style';

interface Props {
  title: string;
  text: string | number;
  percent: number;
  color: string;
  size?: string;
}

const CircleInfo: React.SFC<Props> = ({
  title,
  text,
  percent,
  color,
  size,
}) => {
  const textStyle: React.CSSProperties = { color, fontSize: size };

  return (
    <Circle>
      <CircleCanvas percent={percent} color={color} />
      <span style={textStyle}>{text}</span>
      <p>{title}</p>
    </Circle>
  );
};

export default CircleInfo;
