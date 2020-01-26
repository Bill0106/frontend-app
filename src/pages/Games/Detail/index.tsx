import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import Loading from '@/components/Loading';
import Image from '@/components/Image';
import GameDetail from '@/components/GameDetail';
import GameTrophyList from '@/components/GameTrophyList';
import { Container, Side } from '../style';
import useViewData from './viewData';

interface Props extends RouteComponentProps {
  id?: string;
}

const Detail: React.SFC<Props> = ({ id }) => {
  const { game, trophies, earned, isFetching } = useViewData(id);

  if (isFetching || !game) {
    return <Loading />;
  }

  return (
    <Container>
      <Side>
        <Image imageKey={game.image || ''} icon="gamepad" />
      </Side>
      <GameDetail game={game} trophyRate={Math.round(earned)} />
      <GameTrophyList trophies={trophies} />
    </Container>
  );
};

export default Detail;
