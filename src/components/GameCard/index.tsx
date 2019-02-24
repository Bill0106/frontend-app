import * as React from 'react';
import { Game } from '@/models';
import Image from '@/components/Image';
import { Card, Text, Title, Info, Rate } from './style';

const GameCard: React.SFC<{ game: Game }> = ({ game }) => {
  const rates = Array(game.rate)
    .fill(null)
    .map((_, index) => <i key={index} className="fab fa-playstation" />);

  return (
    <Card>
      <Image imageKey={game.image} />
      <Text>
        <Title>{game.name}</Title>
        <Info>
          <span>{game.genre}</span>
          <Rate>{rates}</Rate>
        </Info>
      </Text>
    </Card>
  );
};

export default GameCard;
