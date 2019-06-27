import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import CDN_URL from '@/configs/cdn';
import loadImage from '@/utils/loadImage';
import { ImageContainer, Placeholder, Img, Icon } from './style';

const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=';

export interface Props {
  imageKey?: string;
  imageUrl?: string;
  icon: IconName;
  iconSize?: number;
}

const { useState, useEffect, useRef } = React;

const Image: React.SFC<Props> = ({ imageKey, imageUrl, icon, iconSize }) => {
  const src = imageKey ? CDN_URL + imageKey : imageUrl || '';
  const [show, setShow] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    if (!show && src) {
      loadImage(src).then(() => {
        if (isMounted) {
          setShow(true);
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  });

  return (
    <ImageContainer>
      <Placeholder src={placeholder} />
      <Img src={src} show={show} />
      <Icon show={!show} size={iconSize || 50}>
        <FontAwesomeIcon icon={['fas', icon]} />
      </Icon>
    </ImageContainer>
  );
};

export default Image;
