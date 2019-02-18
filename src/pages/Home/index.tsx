import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import navigations from '@/constants/navigations';
import { Container, Content, Title, Sections, Section, Mask } from './style';

const { useState, useEffect } = React;

const loadImage = (url: string) => {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      resolve();
    };
    image.src = url;
  });
};

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

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerHTML;
    const section = navigations.find(item => item.title.toLowerCase() === text);
    if (!section) {
      return false;
    }

    setBackground(section.image);
  };

  useEffect(() => {
    if (!show) {
      preloadBackground();
    }
  });

  return (
    <Container background={background} show={show}>
      <Content>
        <Title onMouseEnter={handleTitleMouseEnter}>Bill's Hobby</Title>
        <Sections>
          {['games', 'gourmets', 'hearthstone'].map(item => (
            <Section key={item}>
              <div onMouseEnter={handleMouseEnter}>{item}</div>
            </Section>
          ))}
        </Sections>
      </Content>
      <Mask />
    </Container>
  );
};

export default Home;
