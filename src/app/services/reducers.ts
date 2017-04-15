import keymirror = require('keymirror')
import { Action, ActionReducer } from '@ngrx/store'
import { actionTypes, actionStatus } from '../constants'

const initState: any = {
  games: {
    status: null,
    items: [],
    total: 0,
    error: null,
  },
}

export function Reducers(state: any = initState, action: Action): string {
  const { type, payload } = action

  switch (type) {
    case actionTypes.FETCH_LIST:
      return {
        ...state,
        [payload.state]: {
          ...state[payload.state],
          status: actionStatus.PENDING,
        },
      }
    case `${actionTypes.FETCH_LIST}_${actionStatus.FETCHED}`:
      return {
        ...state,
        [payload.state]: {
          status: actionStatus.FETCHED,
          items: state[payload.state].items.concat(payload.data.list),
          total: payload.data.total,
        },
      }
    case `${actionTypes.FETCH_LIST}_${actionStatus.REJECTED}`:
      return {
        ...state,
        [payload.state]: {
          ...state[payload.state],
          status: actionStatus.REJECTED,
          error: action.payload.body,
        },
      }
    default:
      return state
  }
}
