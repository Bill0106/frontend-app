import * as React from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import navigation from '@/configs/navigation';
import CDN_URL from '@/configs/cdn';
import PAGE_TITLE from '@/constants/pageTitle';
import loadImage from '@/utils/loadImage';
import MessageContext from '@/contexts/MessageContext';
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

const { useState, useEffect, useContext } = React;
const defaultImage = navigation[0].image;

const Home: React.SFC<RouteComponentProps> = () => {
  const [background, setBackground] = useState(defaultImage);
  const [show, setShow] = useState(false);
  const { setError } = useContext(MessageContext);

  const preloadBackground = async () => {
    try {
      await Promise.all(
        navigation.map(item => loadImage(CDN_URL + item.image))
      );
      setShow(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTitleMouseEnter = () => setBackground(defaultImage);

  const handleEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerHTML;
    const section = navigation.find(item => item.title.toLowerCase() === text);
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
    document.title = PAGE_TITLE;

    if (!show) {
      preloadBackground();
    }
  }, []);

  return (
    <HomePage>
      <Container background={CDN_URL + background} show={show}>
        <Content>
          <Title onMouseEnter={handleTitleMouseEnter}>{`Bill's Hobby`}</Title>
          <Sections>
            {['games', 'gourmets'].map(item => (
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
