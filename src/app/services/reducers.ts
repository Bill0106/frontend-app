import keymirror = require('keymirror')
import { Action, ActionReducer } from '@ngrx/store'
import actionTypes from '../constants/actionTypes'
import actionStatus from '../constants/actionStatus'

export const HELLO = 'HELLO'

const initState: any = {
  games: {
    status: null,
    items: [],
    total: 0,
    error: null,
  },
}

export function Reducers(state: any = initState, action: Action): string {
  switch (action.type) {
    case actionTypes.FETCH_GAMES:
      return {
        ...state,
        games: {
          ...state.games,
          status: actionStatus.PENDING,
        },
      }
    case `${actionTypes.FETCH_GAMES}_${actionStatus.FETCHED}`:
      return {
        ...state,
        games: {
          status: actionStatus.FETCHED,
          items: action.payload.list,
          total: action.payload.total,
        },
      }
    case `${actionTypes.FETCH_GAMES}_${actionStatus.REJECTED}`:
      return {
        ...state,
        games: {
          ...state.games,
          status: actionStatus.REJECTED,
          error: action.payload.body,
        },
      }
    default:
      return state
  }
}
