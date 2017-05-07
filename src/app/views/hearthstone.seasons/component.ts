import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { HearthstoneSeasonsState } from '../../models'
import { actionTypes, actionStatus, initState } from '../../constants'

@Component({
  selector: 'app-hearthstone-seasons',
  templateUrl: './template',
})

class HearthstoneSeasonsComponent implements OnInit {
  private limit: number = 6
  seasons: HearthstoneSeasonsState = initState.hearthstoneSeasons
  scrollDisabled: boolean = false
  loading: boolean = true
  error: string

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    store
      .select('hearthstoneSeasons')
      .subscribe((state: HearthstoneSeasonsState) => this.manageState(state))
  }

  private manageState(state: HearthstoneSeasonsState) {
    switch (state.status) {
      case actionStatus.PENDING:
        this.scrollDisabled = true
        break
      case actionStatus.FETCHED:
        this.scrollDisabled = false
        this.seasons = state
        this.loading = (this.seasons.items.length !== state.total)
        break
      case actionStatus.REJECTED:
        this.scrollDisabled = true
        this.loading = true
        this.error = state.error
        break
      default:
        break
    }
  }

  private getSeasons() {
    const { items, total } = this.seasons
    if (!items.length || items.length !== total) {
      const page = items.length / this.limit + 1
      this.store.dispatch({
        type: actionTypes.FETCH_LIST,
        payload: { page, state: 'hearthstoneSeasons', limit: this.limit },
      })
    }
  }

  ngOnInit() {
    if (!this.seasons.items.length) {
      this.getSeasons()
    }
  }

  onScroll(): void {
    this.getSeasons()
  }

  goDetail(url: string): void {
    const link = ['/hearthstone/seasons', url]
    this.router.navigate(link)
  }
}

export default HearthstoneSeasonsComponent
