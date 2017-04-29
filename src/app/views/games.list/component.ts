import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { GamesState } from '../../models'
import { actionTypes, actionStatus, initState } from '../../constants'

@Component({
  selector: 'my-games',
  templateUrl: './template',
})

class GamesComponent implements OnInit {
  private limit: number = 20
  private allFetched: boolean = true
  games: GamesState = initState.games
  scrollDisabled: boolean = false
  hideLoading: boolean = false
  error: string

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    store
      .select('games')
      .subscribe((state: GamesState) => this.manageState(state))
  }

  private manageState(state: GamesState): void {
    switch (state.status) {
      case actionStatus.PENDING:
        this.scrollDisabled = true
        break
      case actionStatus.FETCHED:
        this.scrollDisabled = false
        this.games = state
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

  private getGames() {
    const { items, total } = this.games
    if (!items.length || items.length !== total) {
      const page = items.length / this.limit + 1
      this.store.dispatch({
        type: actionTypes.FETCH_LIST,
        payload: { page, state: 'games' },
      })
    }
  }

  ngOnInit(): void {
    if (!this.games.items.length) {
      this.getGames()
    }
  }

  onScroll(): void {
    this.getGames()
  }

  goDetail(url: string): void {
    const link = ['/games', url]
    this.router.navigate(link)
  }
}

export default GamesComponent
