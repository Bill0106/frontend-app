import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Game } from '../../models'
import { actionTypes } from '../../constants'

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
  private total: number = 0
  games: Game[] = []
  scrollDisabled: boolean = false
  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    store.select('games').subscribe((state: Games) => {
      this.games = this.games.concat(state.items)
      this.total = state.total
    })
  }

  onScroll(): void {
    this.store.dispatch({
      type: actionTypes.FETCH_GAMES,
      payload: { page: this.page },
    })
  }

  ngOnInit(): void {
    this.store.dispatch({
      type: actionTypes.FETCH_GAMES,
      payload: { page: this.page },
    })
  }

  goDetail(url: string): void {
    const link = ['/games', url]
    this.router.navigate(link)
  }
}

export default GamesComponent
