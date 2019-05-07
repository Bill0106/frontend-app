import * as React from 'react';
import ACTION_TYPES from '@/constants/actionTypes';
import MessageContext from '@/contexts/MessageContext';
import { Game, GameTrophy } from './model';
import service from '@/store/service';

export interface GameDetail {
  game: Game | null;
  trophies: Array<GameTrophy>;
}

export interface GameState extends GameDetail {
  isFetching: boolean;
}

export interface GameAction {
  type: string;
  payload?: GameDetail;
}

const initialState: GameState = {
  game: null,
  trophies: [],
  isFetching: false,
};

const reducer = (state: GameState, action: GameAction) => {
  const { type, payload } = action;
  if (!payload) {
    return state;
  }

  switch (type) {
    case ACTION_TYPES.PENDING:
      return { ...state, isFetching: true };
    case ACTION_TYPES.FETCHED:
      return {
        ...state,
        ...payload,
        isFetching: false,
      };
    case ACTION_TYPES.ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const { useState, useEffect, useReducer, useContext } = React;

const useFetchGameDetail = (): [GameState, (url: string) => void] => {
  const [url, setUrl] = useState('');
  const { setError } = useContext(MessageContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: ACTION_TYPES.PENDING });
      try {
        const [game, trophies] = await Promise.all([
          service.fetchGame(url),
          service.fetchGameTrophies(url),
        ]);
        dispatch({
          type: ACTION_TYPES.FETCHED,
          payload: { game, trophies },
        });
      } catch (error) {
        setError(error.message);
        dispatch({ type: ACTION_TYPES.ERROR });
      }
    };

    if (url) {
      fetch();
    }
  }, [url]);

  const fetchGameDetail = (url: string) => setUrl(url);

  return [state, fetchGameDetail];
};

export default useFetchGameDetail;
