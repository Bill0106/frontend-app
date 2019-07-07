import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useFetchGameDetail from '@/store/useFetchGameDetail';
import Loading from '@/components/Loading';
import Image from '@/components/Image';
import GameDetail from '@/components/GameDetail';
import GameTrophyList from '@/components/GameTrophyList';
import { Container, Side } from './style';

interface Props extends RouteComponentProps {
  url?: string;
}

const { useEffect } = React;

const Detail: React.SFC<Props> = ({ url }) => {
  const [state, fetchGameDetail] = useFetchGameDetail();
  const { game, trophies, isFetching } = state;
  useDocumentTitle([game ? game.name : '', 'Games']);

  useEffect(() => {
    if (url) {
      fetchGameDetail(url);
    }
  }, [fetchGameDetail, url]);

  if (isFetching || !game) {
    return <Loading />;
  }

  const trophiesEarned =
    trophies.length &&
    (trophies.filter(item => item.earnAt).length / trophies.length) * 100;

  return (
    <Container>
      <Side>
        <Image imageKey={game.image || ''} icon="gamepad" />
      </Side>
      <GameDetail game={game} trophyRate={Math.round(trophiesEarned)} />
      <GameTrophyList trophies={trophies} />
    </Container>
  );
};

export default Detail;
