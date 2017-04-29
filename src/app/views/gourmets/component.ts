import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { GourmetsState } from '../../models'
import { actionTypes, actionStatus, initState } from '../../constants'

@Component({
  selector: 'my-gourmets',
  templateUrl: './template',
})

class GourmetsComponent implements OnInit {
  private limit: number = 24
  private allFetched: boolean = true
  gourmets: GourmetsState = initState.gourmets
  scrollDisabled: boolean = false
  hideLoading: boolean = false
  error: string

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    store.select('gourmets')
      .subscribe(
        (state: GourmetsState) => this.manageState(state),
      )
  }

  private manageState(state: GourmetsState): void {
    switch (state.status) {
      case actionStatus.PENDING:
        this.scrollDisabled = true
        break
      case actionStatus.FETCHED:
        this.scrollDisabled = false
        this.gourmets = state
        this.hideLoading = this.allFetched
        break
      case actionStatus.REJECTED:
        this.scrollDisabled = true
        this.hideLoading = true
        this.error = state.error
        break
      default:
        break
    }
  }

  private getGourmets() {
    const { items, total } = this.gourmets
    if (!items.length || items.length !== total) {
      const page = (items.length / this.limit) + 1
      this.store.dispatch({
        type: actionTypes.FETCH_LIST,
        payload: { page, state: 'gourmets', limit: this.limit },
      })
    }
  }

  ngOnInit(): void {
    if (!this.gourmets.items.length) {
      this.getGourmets()
    }
  }

  onScroll(): void {
    this.getGourmets()
  }
}

export default GourmetsComponent
