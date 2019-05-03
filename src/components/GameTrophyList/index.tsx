import * as React from 'react';
import { format } from 'date-fns';
import { GameTrophy } from '@/models';
import Image from '@/components/Image';
import { Trophies, Trophy, TrophyImg, TrophyText, TrophyEarned } from './style';

interface Props {
  trophies: Array<GameTrophy>;
}

const colors: { [key: string]: string } = {
  Gold: '#FFD700',
  Silver: '#C0C0C0',
  Bronze: '#CD7F32',
  Platinum: '#E5E4E2',
};

const TrophyList: React.SFC<Props> = ({ trophies }) => {
  const renderTrophy = (item: GameTrophy) => (
    <Trophy key={item._id}>
      <TrophyImg color={colors[item.rarity]} earned={Boolean(item.earnedAt)}>
        <Image icon="trophy" imageUrl={item.image} iconSize={24} />
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
