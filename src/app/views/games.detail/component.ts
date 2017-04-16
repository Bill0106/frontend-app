import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Store } from '@ngrx/store'
import { Game, GamesState } from '../../models'
import { actionTypes, actionStatus, gamePlatforms, gameGenres } from '../../constants'

@Component({
  selector: 'my-game',
  templateUrl: './template',
})

class GameComponent implements OnInit {
  game: Game
  trophy: any
  hideLoading: boolean = false
  error: string

  constructor(
    private store: Store<any>,
    private activeRoute: ActivatedRoute,
  ) {
    store.select('games')
      .do((state: GamesState) => this.getGame(state))
      .do((state: GamesState) => this.manageState(state))
      .subscribe()
  }

  private getGame(state: GamesState): void {
    this.activeRoute.params.forEach((params: Params) => {
      const url = params.url
      const game = state.items.find(item => item.url === url)

      if (game) {
        this.game = game
        this.hideLoading = true
      }
    })
  }

  private manageState(state: GamesState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        this.game = state.item
        this.hideLoading = true
        break
      case actionStatus.REJECTED:
        this.hideLoading = true
        this.error = state.error
        break
      default:
        break
    }
  }

  ngOnInit() {
    if (!this.game) {
      this.activeRoute.params.forEach((params: Params) => {
        this.store.dispatch({
          type: actionTypes.FETCH_ITEM,
          payload: {
            params: params.url,
            state: 'games',
          },
        })
      })
    }
  }

  getPlatform(): string {
    const platfrom = gamePlatforms.find(item => item.value === this.game.platform)
    return platfrom.name
  }

  getRateText(): string {
    const rateText = ['Terrible', 'Poor', 'Fair', 'Good', 'Great']
    return rateText[this.game.rate - 1]
  }

  getGenre(): string {
    const genre = gameGenres.find(item => item.value === this.game.genre)
    return genre.name
  }
}

export default GameComponent
