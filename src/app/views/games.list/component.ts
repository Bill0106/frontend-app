import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Game } from '../../models'
import { actionTypes, actionStatus } from '../../constants'

interface Games {
  items: Game[]
  total: number
  error: any
  status: string
}

@Component({
  selector: 'my-games',
  templateUrl: './template',
})

class GamesComponent implements OnInit {
  private page: number = 1
  private allFetched: boolean = true
  games: Game[]
  scrollDisabled: boolean = false
  hideLoading: boolean = false
  error: string

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    store.select('games')
      .do((state: Games) => this.manageState(state))
      .subscribe()
  }

  private manageState(state: Games): void {
    switch (state.status) {
      case actionStatus.PENDING:
        this.scrollDisabled = true
        break
      case actionStatus.FETCHED:
        this.scrollDisabled = false
        this.games = state.items
        this.allFetched = (this.games.length === state.total)
        this.hideLoading = this.allFetched
        this.page++
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

  ngOnInit(): void {
    this.store.dispatch({
      type: actionTypes.FETCH_LIST,
      payload: {
        page: this.page,
        state: 'games',
      },
    })
  }

  onScroll(): void {
    if (!this.allFetched) {
      this.store.dispatch({
        type: actionTypes.FETCH_LIST,
        payload: {
          page: this.page,
          state: 'games',
        },
      })
    }
  }

  goDetail(url: string): void {
    const link = ['/games', url]
    this.router.navigate(link)
  }
}

export default GamesComponent
