import * as React from 'react';
import { navigate } from '@reach/router';
import { Game } from '@/models';
import Image from '@/components/Image';
import { Card, Text, Title, Info, Rate } from './style';

const GameCard: React.SFC<{ game: Game }> = ({ game }) => {
  const rates = Array(game.rate)
    .fill(null)
    .map((_, index) => <i key={index} className="fab fa-playstation" />);

  const handleClick = () => navigate(`/games/${game.url}`);

  return (
    <Card onClick={handleClick}>
      <Image imageKey={game.image} icon="gamepad" />
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
