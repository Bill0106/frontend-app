import * as React from 'react';

interface Props {
  percent: number;
  color: string;
}

const { useState, useEffect } = React;

const FPS = 1000 / 200;
const ONE_PERCENT = 360 / 100;

const drawCircle = (
  canvas: HTMLCanvasElement,
  percentage: number,
  color: string
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return false;
  }
  ctx.lineCap = 'round';

  const posX = canvas.width / 2;
  const posY = canvas.height / 2;
  const result = ONE_PERCENT * percentage;
  const change = { percent: 0, degrees: 0 };

  const draw = () => {
    change.degrees += 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    change.percent = change.degrees / ONE_PERCENT;

    const start = (Math.PI / 180) * 270;
    const end = (Math.PI / 180) * (270 + change.degrees);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.arc(posX, posY, 40, start, end);
    ctx.stroke();

    if (change.degrees < result) {
      setTimeout(draw, FPS);
    }
  };

  setTimeout(draw, FPS);
};

const CircleCanvas: React.SFC<Props> = ({ percent, color }) => {
  let canvas: HTMLCanvasElement | null;

  const [isDrawed, setIsDrawed] = useState(false);

  useEffect(() => {
    if (canvas && !Number.isNaN(percent) && !isDrawed) {
      drawCircle(canvas, percent, color);
      setIsDrawed(true);
    }
  });

  return <canvas ref={ele => (canvas = ele)} width="100" height="100" />;
};

export default CircleCanvas;
