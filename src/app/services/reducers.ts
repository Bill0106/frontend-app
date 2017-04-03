import { Action, ActionReducer } from '@ngrx/store'

export const HELLO = 'HELLO'

export function helloReducer(state: string = 'fuck', action: Action): string {
  switch (action.type) {
    case HELLO:
      state = 'hello'
      return state
    default:
      return state
  }
}
