import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import navigation from '@/configs/navigation';
import CDN_URL from '@/configs/cdn';
import loadImage from '@/utils/loadImage';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useMessage from '@/hooks/useMessage';
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

const { useState, useEffect, useCallback } = React;
const defaultImage = navigation[0].image;

const Home: React.SFC<RouteComponentProps> = () => {
  const [background, setBackground] = useState(defaultImage);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  useDocumentTitle('');
  useMessage(error);

  const handlePreload = useCallback(async () => {
    try {
      await Promise.all(
        navigation.map(item => loadImage(CDN_URL + item.image))
      );
      setShow(true);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleTitleMouseEnter = () => setBackground(defaultImage);

  const handleEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerHTML;
    const section = navigation.find(item => item.title === text);
    if (!section) {
      return false;
    }

    if (e.type === 'click') {
      navigate(section.path);
    } else if (e.type === 'mouseenter' && document.body.clientWidth >= 768) {
      setBackground(section.image);
    }
  };

  useEffect(() => {
    handlePreload();
  }, [handlePreload]);

  return (
    <HomePage>
      <Container background={CDN_URL + background} show={show}>
        <Content>
          <Title onMouseEnter={handleTitleMouseEnter}>{`Bill's Hobby`}</Title>
          <Sections>
            {navigation
              .filter(item => item.title !== 'Home')
              .map(item => (
                <Section key={item.title}>
                  <div onClick={handleEvent} onMouseEnter={handleEvent}>
                    {item.title}
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
