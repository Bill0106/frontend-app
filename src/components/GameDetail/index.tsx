import * as React from 'react';
import { format, parseISO } from 'date-fns';
import { Game } from '@/constants/models';
import CircleInfo from './CircleInfo';
import InfoList from './InfoList';
import { Header, Title, Subtitle, Rate, Earned } from './style';

interface Props {
  game: Game;
  trophyRate: number;
}

const DetailMain: React.SFC<Props> = ({ game, trophyRate }) => {
  const infos = [
    game.platform,
    game.genre,
    format(parseISO(game.buyAt), 'yyyy-MM-dd'),
  ];
  const companies = [game.developer, game.publisher].filter(
    (item, index, arr) => arr.indexOf(item) === index
  );

  return (
    <div>
      <Header>
        <div>
          <Title>{game.title}</Title>
          <Subtitle>{game.name}</Subtitle>
        </div>
        <CircleInfo
          title="Rate"
          percent={(game.rate / 5) * 100}
          color="#e03800"
        >
          <Rate>{game.rate}</Rate>
        </CircleInfo>
        <CircleInfo title="Trophy" percent={trophyRate} color="#075fff">
          <Earned>{`${trophyRate}%`}</Earned>
        </CircleInfo>
      </Header>
      <hr />
      <InfoList infos={infos} />
      <InfoList infos={companies} />
    </div>
  );
};

export default DetailMain;
