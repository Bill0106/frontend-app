import * as React from 'react';
import { navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Game } from '@/constants/models';
import Image from '@/components/Image';
import { Card, Text, Title, Rate } from './style';

const GameCard: React.SFC<{ game: Game }> = ({ game }) => {
  const rates = Array(game.rate)
    .fill(null)
    .map((_, index) => (
      <FontAwesomeIcon key={index} icon={['fas', 'gamepad']} />
    ));

  const handleClick = () => navigate(`/games/${game.id}`);

  return (
    <Card onClick={handleClick}>
      <Image imageKey={game.image} icon="gamepad" />
      <Text>
        <Title>{game.name}</Title>
        <Rate>{rates}</Rate>
      </Text>
    </Card>
  );
};

export default GameCard;
