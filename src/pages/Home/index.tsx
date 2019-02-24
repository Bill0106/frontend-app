import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import navigations from '@/constants/navigations';
import loadImage from '@/utils/loadImage';
import {
  HomePage,
  Loading,
  Text,
  Container,
  Content,
  Title,
  Sections,
  Section,
  Mask,
} from './style';

const { useState, useEffect } = React;

const Home: React.SFC<RouteComponentProps> = () => {
  const defaultImage = navigations[0].image;
  const [background, setBackground] = useState(defaultImage);
  const [show, setShow] = useState(false);

  const preloadBackground = async () => {
    try {
      await Promise.all(navigations.map(item => loadImage(item.image)));
      setShow(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTitleMouseEnter = () => setBackground(defaultImage);

  const handleEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerHTML;
    const section = navigations.find(item => item.title.toLowerCase() === text);
    if (!section) {
      return false;
    }

    if (e.type === 'click') {
      navigate(section.path);
    } else if (e.type === 'mouseenter') {
      setBackground(section.image);
    }
  };

  useEffect(() => {
    if (!show) {
      preloadBackground();
    }
  });

  return (
    <HomePage>
      <Container background={background} show={show}>
        <Content>
          <Title onMouseEnter={handleTitleMouseEnter}>Bill's Hobby</Title>
          <Sections>
            {['games', 'gourmets', 'hearthstone'].map(item => (
              <Section key={item}>
                <div onClick={handleEvent} onMouseEnter={handleEvent}>
                  {item}
                </div>
              </Section>
            ))}
          </Sections>
        </Content>
        <Mask />
      </Container>
      <Loading show={!show}>
        <Text>Loading...</Text>
      </Loading>
    </HomePage>
  );
};

export default Home;
