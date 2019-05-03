import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import PAGE_TITLE from '@/constants/pageTitle';
import { Game, GameTrophy } from '@/models';
import services from '@/services';
import MessageContext from '@/contexts/MessageContext';
import Loading from '@/components/Loading';
import Image from '@/components/Image';
import GameDetail from '@/components/GameDetail';
import GameTrophyList from '@/components/GameTrophyList';
import { Container, Side } from './style';

interface Props extends RouteComponentProps {
  url?: string;
}

const { useState, useEffect, useContext } = React;

const Detail: React.SFC<Props> = ({ url }) => {
  const [game, setGame] = useState({} as Game);
  const [trophies, setTrophies] = useState([] as Array<GameTrophy>);
  const [isFetching, setIsFetching] = useState(false);
  const { setError } = useContext(MessageContext);

  const fetch = async () => {
    if (!url) {
      return false;
    }

    setIsFetching(true);
    try {
      const [gameRes, trophiesRes] = await Promise.all([
        services.fetchGame(url),
        services.fetchGameTrophies(url),
      ]);

      setGame(gameRes);
      setTrophies(trophiesRes);
      document.title = `${gameRes.name} - Games | ${PAGE_TITLE}`;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  if (isFetching || !game._id) {
    return <Loading />;
  }
  const trophiesEarned =
    trophies.length &&
    (trophies.filter(item => item.earnedAt).length / trophies.length) * 100;

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
