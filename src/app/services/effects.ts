import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { actionTypes, actionStatus } from '../constants'
import Services from './services'

@Injectable()
class Effects {
  constructor(
    private actions$: Actions,
    private services: Services,
  ) { }

  @Effect() getList$ = this.actions$
    .ofType(actionTypes.FETCH_LIST)
    .map(action => JSON.stringify(action.payload))
    .switchMap(payload => this.services.getList(payload))

  @Effect() getItem$ = this.actions$
    .ofType(actionTypes.FETCH_ITEM)
    .map(action => JSON.stringify(action.payload))
    .switchMap(payload => this.services.getItem(payload))

  @Effect() getGameTrophy$ = this.actions$
    .ofType(actionTypes.FETCH_GAME_TROPHY)
    .map(action => JSON.stringify(action.payload))
    .switchMap(payload => this.services.getGameTrophy(payload))

  @Effect() getHearthstoneMatches$ = this.actions$
    .ofType(actionTypes.FETCH_HEARTHSTONE_MATCHES)
    .map(action => JSON.stringify(action.payload))
    .switchMap(payload => this.services.getHearthstoneMatches(payload))

  @Effect() getHearthstoneDecksByIds$ = this.actions$
    .ofType(actionTypes.FETCH_HEARTHSTONE_DECKS_BY_IDS)
    .map(action => JSON.stringify(action.payload))
    .switchMap(payload => this.services.getHearthstoneDecksByIds(payload))
}

export default Effects
