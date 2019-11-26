import { useReducer, useCallback, useState, useEffect } from 'react';
import { stringify } from 'query-string';
import ActionType from '@/constants/actionType';
import Type, { TitleMap } from '@/constants/type';
import request from '@/utils/request';
import createReducers, { CustomReducers } from '@/utils/createReducers';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { InfiniteScrollProps } from '@/components/InfiniteScroll';

const PAGE_SIZE = 24;

interface ListState<T> {
  list: T[];
  total: number;
  isFetching: boolean;
}

interface ListPayliad<T> {
  list: T[];
  total: number;
}

interface ListResponse<T> {
  list: T[] | null;
  total: number;
}

const useList = <T>(type: Type, pageSize?: number) => {
  const initialState: ListState<T> = {
    list: [],
    total: 0,
    isFetching: false,
  };

  const customReducers: CustomReducers<ListState<T>, ListPayliad<T>> = (
    state,
    { payload }
  ) => {
    return new Map([
      [
        ActionType.Fetched,
        () => ({
          ...state,
          list: [...state.list, ...((payload && payload.list) || [])],
          total: (payload && payload.total) || 0,
          isFetching: false,
        }),
      ],
    ]);
  };

  const [page, setPage] = useState(1);
  const [{ list, total, isFetching }, dispatch] = useReducer(
    createReducers<ListState<T>, ListPayliad<T>>(customReducers),
    initialState
  );

  useDocumentTitle(TitleMap.get(type) || '');

  const fetch = useCallback(async () => {
    dispatch({ type: ActionType.Pending });
    try {
      const queryString = stringify({
        limit: pageSize || PAGE_SIZE,
        offset: (page - 1) * (pageSize || PAGE_SIZE),
      });

      const res = await request.get<ListResponse<T>>(`/${type}?${queryString}`);

      dispatch({
        type: ActionType.Fetched,
        payload: {
          list: res.list || [],
          total: res.total,
        },
      });
    } catch (error) {
      dispatch({ type: ActionType.Error });
    }
  }, [page, pageSize, type]);

  const handleLoadMore = useCallback(() => {
    if (list.length >= total || isFetching) {
      return false;
    }

    setPage(page + 1);
  }, [page, list, total, isFetching]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const infiniteScrollProps: InfiniteScrollProps = {
    hasMore: list.length === 0 || list.length < total,
    isBusy: isFetching,
    onLoadMore: handleLoadMore,
  };

  return { list, infiniteScrollProps };
};

export default useList;
