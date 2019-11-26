import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import navigation from '@/configs/navigation';
import useViewData from './viewData';
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

const Home: React.SFC<RouteComponentProps> = () => {
  const [
    { background, show },
    { handleTitleMouseEnter, handleEvent },
  ] = useViewData();

  return (
    <HomePage>
      <Container background={background} show={show}>
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
