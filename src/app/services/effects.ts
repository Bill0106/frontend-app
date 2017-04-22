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
}

export default Effects
