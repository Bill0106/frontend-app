import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs'
import { actionTypes, actionStatus } from '../constants'
import Services from './services'

@Injectable()
class Effects {
  constructor(
    private actions$: Actions,
    private services: Services,
  ) { }

  @Effect() getGames$ = this.actions$
    .ofType(actionTypes.FETCH_GAMES)
    .map(action => JSON.stringify(action.payload))
    .switchMap(payload => this.services.getGames(payload))
}

export default Effects
