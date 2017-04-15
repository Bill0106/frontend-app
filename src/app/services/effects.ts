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
}

export default Effects
