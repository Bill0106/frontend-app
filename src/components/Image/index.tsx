import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import CDN_URL from '@/constants/cdn';
import loadImage from '@/utils/loadImage';
import { ImageContainer, Placeholder, Img, Icon } from './style';

const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=';

export interface Props {
  imageKey?: string;
  imageUrl?: string;
  icon: string;
}

const { useState, useEffect } = React;

const Image: React.SFC<Props> = ({ imageKey, imageUrl, icon }) => {
  let isMounted: boolean = true;
  const src = imageKey ? CDN_URL + imageKey : imageUrl || '';
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show && src) {
      loadImage(src).then(() => {
        if (isMounted) {
          setShow(true);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  });

  return (
    <ImageContainer>
      <Placeholder src={placeholder} />
      <Img src={src} show={show} />
      <Icon show={!show}>
        <FontAwesomeIcon icon={['fas', icon as IconName]} />
      </Icon>
    </ImageContainer>
  );
};

export default Image;
