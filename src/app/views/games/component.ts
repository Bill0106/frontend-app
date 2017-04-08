import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import Game from '../../models/Game'
import actionTypes from '../../constants/actionTypes'

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
  games: Game[] = []
  constructor(private store: Store<Games>) {
    store.select('games').subscribe((state: Games) => {
      this.games = this.games.concat(state.items)
    })
  }

  ngOnInit() {
    this.store.dispatch({
      type: actionTypes.FETCH_GAMES,
      payload: { page: 1 },
    })
  }
}

export default GamesComponent
