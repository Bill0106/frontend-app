import * as React from 'react';
import CDN_URL from '@/constants/cdn';
import { Game } from '@/models';
import { Card, Img, Text, Title, Info, Rate } from './style';

const GameCard: React.SFC<{ game: Game }> = ({ game }) => {
  return (
    <Card>
      <Img src={CDN_URL + game.image} alt="" />
      <Text>
        <Title>{game.name}</Title>
        <Info>
          <span>{game.genre}</span>
          <Rate>
            {Array(game.rate)
              .fill(null)
              .map((_, index) => (
                <i key={index} className="fas fa-star" />
              ))}
          </Rate>
        </Info>
      </Text>
    </Card>
  );
};

export default GameCard;
