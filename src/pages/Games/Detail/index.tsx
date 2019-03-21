import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import PAGE_TITLE from '@/constants/pageTitle';
import { Game, GameTrophy } from '@/models';
import services from '@/services';
import Loading from '@/components/Loading';
import Side from './DetailSide';
import Main from './DetailMain';
import TrophyList from './TrophyList';
import { Container } from './style';

interface Props extends RouteComponentProps {
  url?: string;
}

const { useState, useEffect } = React;

const Detail: React.SFC<Props> = ({ url }) => {
  const [game, setGame] = useState({} as Game);
  const [trophies, setTrophies] = useState([] as Array<GameTrophy>);
  const [isFetching, setIsFetching] = useState(false);

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
      console.log(error.message);
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
      <Side game={game} />
      <Main game={game} trophyRate={Math.round(trophiesEarned)} />
      <TrophyList trophies={trophies} />
    </Container>
  );
};

export default Detail;
