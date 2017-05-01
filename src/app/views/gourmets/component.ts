import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { GourmetsState } from '../../models'
import { actionTypes, actionStatus, initState } from '../../constants'

@Component({
  selector: 'app-gourmets',
  templateUrl: './template',
})

class GourmetsComponent implements OnInit {
  private limit: number = 20
  gourmets: GourmetsState = initState.gourmets
  scrollDisabled: boolean = false
  loading: boolean = true
  error: string

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    store
      .select('gourmets')
      .subscribe((state: GourmetsState) => this.manageState(state))
  }

  private manageState(state: GourmetsState): void {
    switch (state.status) {
      case actionStatus.PENDING:
        this.scrollDisabled = true
        break
      case actionStatus.FETCHED:
        this.scrollDisabled = false
        this.gourmets = state
        this.loading = !(this.gourmets.items.length === state.total)
        break
      case actionStatus.REJECTED:
        this.scrollDisabled = true
        this.loading = false
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
        payload: { page, state: 'gourmets' },
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

  goDetail(url): void {
    window.open(url, '_blank')
  }
}

export default GourmetsComponent
