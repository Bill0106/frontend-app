import * as React from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Gourmet } from '@/models';
import Image from '@/components/Image';
import { Card, Header, Content, Title, Date } from './style';

const GourmetCard: React.SFC<{ gourmet: Gourmet }> = ({ gourmet }) => (
  <Card>
    <Header>
      <FontAwesomeIcon icon={['fas', 'map-marker-alt']} color="#ccc" />
      <span>{gourmet.restaurant}</span>
    </Header>
    <Image imageKey={gourmet.image} icon="utensils" />
    <Content>
      <Title>{gourmet.food}</Title>
      <Date>{format(gourmet.date, 'YYYY-MM-DD')}</Date>
    </Content>
  </Card>
);

export default GourmetCard;
