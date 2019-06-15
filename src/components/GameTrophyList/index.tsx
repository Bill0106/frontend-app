import * as React from 'react';
import { format } from 'date-fns';
import { GameTrophy } from '@/store/model';
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
    <Trophy key={item.id}>
      <TrophyImg color={colors[item.rarity]} earned={Boolean(item.earnAt)}>
        <Image icon="trophy" imageUrl={item.image} iconSize={24} />
      </TrophyImg>
      <TrophyText>
        <p>{item.title}</p>
        <span>{item.description}</span>
      </TrophyText>
      {item.earnAt && (
        <TrophyEarned>
          Earn at: {format(new Date(item.earnAt), 'Do MMM YYYY')}
        </TrophyEarned>
      )}
    </Trophy>
  );

  return <Trophies>{trophies.map(renderTrophy)}</Trophies>;
};

export default TrophyList;
