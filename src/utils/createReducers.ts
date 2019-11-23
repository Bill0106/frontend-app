import ActionType from '@/constants/actionType';

export interface Action<T> {
  type: ActionType;
  payload?: T;
}

export type CustomReducers<S, P> = (
  state: S,
  action: Action<P>
) => Map<ActionType, () => S>;

const createReducers = <S, P>(customReducers?: CustomReducers<S, P>) => (
  state: S,
  { type, payload }: Action<P>
) => {
  const defaultReducers = new Map<ActionType, () => S>([
    [ActionType.Pending, () => ({ ...state, isFetching: true })],
    [ActionType.Fetched, () => ({ ...state, ...payload, isFetching: false })],
    [ActionType.Error, () => ({ ...state, isFetching: false })],
  ]);

  const reducerMap = new Map([
    ...defaultReducers,
    ...(customReducers
      ? customReducers(state, { type, payload })
      : new Map<ActionType, () => S>()),
  ]);

  const reduce = reducerMap.get(type);

  return reduce ? reduce() : state;
};

export default createReducers;
