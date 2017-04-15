import keymirror = require('keymirror')
import { Action, ActionReducer } from '@ngrx/store'
import { actionTypes, actionStatus } from '../constants'

const initState: any = {
  games: {
    status: null,
    items: [],
    item: null,
    total: 0,
    error: null,
  },
}

export function Reducers(state: any = initState, action: Action): string {
  const { type, payload } = action

  switch (type) {
    case actionTypes.FETCH_LIST:
    case actionTypes.FETCH_ITEM:
      return {
        ...state,
        [payload.state]: {
          ...state[payload.state],
          status: actionStatus.PENDING,
        },
      }
    case `${actionTypes.FETCH_LIST}_${actionStatus.REJECTED}`:
    case `${actionTypes.FETCH_ITEM}_${actionStatus.REJECTED}`:
      return {
        ...state,
        [payload.state]: {
          ...state[payload.state],
          status: actionStatus.REJECTED,
          error: payload.error,
        },
      }
    case `${actionTypes.FETCH_LIST}_${actionStatus.FETCHED}`:
      return {
        ...state,
        [payload.state]: {
          ...state[payload.state],
          status: actionStatus.FETCHED,
          items: state[payload.state].items.concat(payload.data.list),
          total: payload.data.total,
        },
      }
    case `${actionTypes.FETCH_ITEM}_${actionStatus.FETCHED}`:
      return {
        ...state,
        [payload.state]: {
          ...state[payload.state],
          status: actionStatus.FETCHED,
          item: payload.data,
        },
      }
    default:
      return state
  }
}
