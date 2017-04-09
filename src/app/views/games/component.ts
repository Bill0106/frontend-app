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
  games: Game[] = []
  scrollDisabled: boolean = false
  allFetched: boolean = true

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    store.select('games').subscribe((state: Games) => {
      switch (state.status) {
        case actionStatus.PENDING:
          this.scrollDisabled = true
          break
        case actionStatus.FETCHED:
          this.scrollDisabled = false
          this.page++
        default:
          break
      }

      this.games = state.items
      this.allFetched = (this.games.length === state.total)
    })
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: actionTypes.FETCH_GAMES,
      payload: { page: this.page },
    })
  }

  onScroll(): void {
    if (!this.allFetched) {
      this.store.dispatch({
        type: actionTypes.FETCH_GAMES,
        payload: { page: this.page },
      })
    }
  }

  goDetail(url: string): void {
    const link = ['/games', url]
    this.router.navigate(link)
  }
}

export default GamesComponent
