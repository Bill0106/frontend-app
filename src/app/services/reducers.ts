import keymirror = require('keymirror')
import { Action, ActionReducer } from '@ngrx/store'
import { actionTypes, actionStatus, initState } from '../constants'

export function Reducers(state: any = initState, action: Action): string {
  const { type, payload } = action

  switch (type) {
    case actionTypes.FETCH_LIST:
    case actionTypes.FETCH_ITEM:
    case actionTypes.FETCH_GAME_TROPHY:
    case actionTypes.FETCH_HEARTHSTONE_MATCHES:
      return {
        ...state,
        [payload.state]: {
          ...state[payload.state],
          status: actionStatus.PENDING,
        },
      }
    case `${actionTypes.FETCH_LIST}_${actionStatus.REJECTED}`:
    case `${actionTypes.FETCH_ITEM}_${actionStatus.REJECTED}`:
    case `${actionTypes.FETCH_GAME_TROPHY}_${actionStatus.REJECTED}`:
    case `${actionTypes.FETCH_HEARTHSTONE_MATCHES}_${actionStatus.REJECTED}`:
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
    case `${actionTypes.FETCH_GAME_TROPHY}_${actionStatus.FETCHED}`:
      return {
        ...state,
        [payload.state]: {
          ...state[payload.state],
          status: actionStatus.FETCHED,
          item: payload.data,
        },
      }
    case `${actionTypes.FETCH_HEARTHSTONE_MATCHES}_${actionStatus.FETCHED}`:
      return {
        ...state,
        'hearthstoneMatches': {
          ...state['hearthstoneMatches'],
          status: actionStatus.FETCHED,
          item: payload.data.list,
          total: payload.data.total,
        },
      }
    default:
      return state
  }
}
