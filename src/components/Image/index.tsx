import * as React from 'react';
import CDN_URL from '@/constants/cdn';
import loadImage from '@/utils/loadImage';
import { ImageContainer, Placeholder, Img } from './style';

const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=';

export interface Props {
  imageKey: string;
}

const { useState, useEffect } = React;

const Image: React.SFC<Props> = ({ imageKey }) => {
  const src = CDN_URL + imageKey;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) {
      loadImage(src).then(() => setShow(true));
    }
  });

  return (
    <ImageContainer>
      <Placeholder src={placeholder} />
      <Img src={src} show={show} />
    </ImageContainer>
  );
};

export default Image;
