import * as React from 'react';
import ACTION_TYPES from '@/constants/actionTypes';
import MessageContext from '@/contexts/MessageContext';
import service, { List } from './service';

export interface ListState<T> extends List<T> {
  isFetching: boolean;
}

export interface ListAction<T> {
  type: string;
  payload?: List<T>;
}

const reducer = <T>(state: ListState<T>, action: ListAction<T>) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.PENDING:
      return { ...state, error: '', isFetching: true };
    case ACTION_TYPES.FETCHED:
      if (!payload) {
        return state;
      }

      return {
        ...state,
        list: [...state.list, ...payload.list],
        total: payload.total,
        isFetching: false,
      };
    case ACTION_TYPES.ERROR:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

const { useReducer, useState, useEffect, useContext } = React;

const useFetchList = <T>(type: string): [ListState<T>, () => void] => {
  const initialState: ListState<T> = {
    list: [],
    total: 0,
    isFetching: false,
  };

  const [page, setPage] = useState(1);
  const { setError } = useContext(MessageContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      dispatch({ type: ACTION_TYPES.PENDING });
      try {
        const data = await service.fetchList<T>(type, page);
        dispatch({
          type: ACTION_TYPES.FETCHED,
          payload: data,
        });
      } catch (error) {
        setError(error.message);
        dispatch({ type: ACTION_TYPES.ERROR });
      }
    };

    fetch();
  }, [page]);

  const fetchList = () => {
    if (state.list.length >= state.total || state.isFetching) {
      return false;
    }

    setPage(page + 1);
  };

  return [state as ListState<T>, fetchList];
};

export default useFetchList;
