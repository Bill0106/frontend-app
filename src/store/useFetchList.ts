import * as React from 'react';
import ACTION_TYPES from '@/constants/actionTypes';
import useMessage from '@/hooks/useMessage';
import service, { List } from '@/store/service';

export interface ListState<T> extends List<T> {
  isFetching: boolean;
}

export interface ListAction<T> {
  type: string;
  payload?: List<T>;
}

const reducer = <T>(state: ListState<T>, action: ListAction<T>) => {
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

const { useReducer, useState, useEffect, useCallback } = React;

const useFetchList = <T>(type: string): [ListState<T>, () => void] => {
  const initialState: ListState<T> = {
    list: [],
    total: 0,
    isFetching: false,
  };

  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useMessage(error);

  const fetch = useCallback(async () => {
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
  }, [page, type]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const fetchList = () => {
    if (state.list.length >= state.total || state.isFetching) {
      return false;
    }

    setPage(page + 1);
  };

  return [state as ListState<T>, fetchList];
};

export default useFetchList;
