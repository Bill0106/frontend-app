import * as React from 'react';
import { format } from 'date-fns';
import { Game } from '@/models';
import CircleInfo from './CircleInfo';
import { Main, Header, Title, Subtitle, Infos, Description } from './style';

interface Props {
  game: Game;
  trophyRate: number;
}

const DetailMain: React.SFC<Props> = ({ game, trophyRate }) => {
  const renderDescription = (item: string, index: number) => (
    <Description key={index}>{item}</Description>
  );

  return (
    <Main>
      <Header>
        <div>
          <Title>{game.title}</Title>
          <Subtitle>{game.name}</Subtitle>
          <Infos>
            <span>{game.platform}</span>
            <i>|</i>
            <span>{game.genre}</span>
            <i>|</i>
            <span>Buy at : {format(game.buyAt, 'YYYY-MM-DD')}</span>
          </Infos>
        </div>
        <CircleInfo
          title="Rate"
          text={game.rate}
          percent={(game.rate / 5) * 100}
          color="#e03800"
        />
        <CircleInfo
          title="Trophy"
          text={`${trophyRate}%`}
          percent={trophyRate}
          color="#075fff"
        />
      </Header>
      <hr />
      {game.description.split('\n').map(renderDescription)}
    </Main>
  );
};

export default DetailMain;
