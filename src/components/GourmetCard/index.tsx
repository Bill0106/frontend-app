import * as React from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Gourmet } from '@/store/model';
import Image from '@/components/Image';
import { Card, Header, Content, Title, EatAt } from './style';

const GourmetCard: React.SFC<{ gourmet: Gourmet }> = ({ gourmet }) => (
  <Card>
    <Header>
      <FontAwesomeIcon icon={['fas', 'map-marker-alt']} color="#ccc" />
      <span>{gourmet.restaurant}</span>
    </Header>
    <Image imageKey={gourmet.image} icon="utensils" />
    <Content>
      <Title>{gourmet.food}</Title>
      <EatAt>{format(new Date(gourmet.eatAt), 'yyyy-MM-dd')}</EatAt>
    </Content>
  </Card>
);

export default GourmetCard;
