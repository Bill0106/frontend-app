import * as React from 'react';
import { format } from 'date-fns';
import { GameTrophy } from '@/models';
import Image from '@/components/Image';
import { Trophies, Trophy, TrophyImg, TrophyText, TrophyEarned } from './style';

interface Props {
  trophies: Array<GameTrophy>;
}

const TrophyList: React.SFC<Props> = ({ trophies }) => {
  const renderTrophy = (item: GameTrophy) => (
    <Trophy key={item._id}>
      <TrophyImg earned={Boolean(item.earnedAt)}>
        <Image imageUrl={item.image} icon="trophy" />
      </TrophyImg>
      <TrophyText>
        <p>{item.title}</p>
        <span>{item.description}</span>
      </TrophyText>
      {item.earnedAt && (
        <TrophyEarned>
          Earned at: {format(item.earnedAt, 'Do MMM YYYY')}
        </TrophyEarned>
      )}
    </Trophy>
  );

  return <Trophies>{trophies.map(renderTrophy)}</Trophies>;
};

export default TrophyList;
