import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Store } from '@ngrx/store'
import { Game, GamesState, GameTrophy, GameTrophyState } from '../../models'
import { actionTypes, actionStatus, gamePlatforms, gameGenres } from '../../constants'

@Component({
  selector: 'my-game',
  templateUrl: './template',
})

class GameComponent implements OnInit {
  game: Game = null
  trophy: GameTrophy
  trophyCompleted: number
  hideLoading: boolean = false
  error: string

  constructor(
    private store: Store<any>,
    private activeRoute: ActivatedRoute,
  ) {
    store.select('games')
      .do((state: GamesState) => this.getGame(state))
      .do((state: GamesState) => this.manageGameState(state))
      .subscribe()

    store.select('gameTrophy')
      .do((state: GameTrophyState) => this.manageTrophyState(state))
      .subscribe()
  }

  private getGame(state: GamesState): void {
    this.activeRoute.params.forEach((params: Params) => {
      const url = params.url
      const game = state.items.find(item => item.url === url)

      if (state.item && state.item.url === url) {
        this.game = state.item
        this.hideLoading = true
      } else if (game) {
        this.game = game
        this.hideLoading = true
      }
    })
  }

  private manageGameState(state: GamesState): void {
    if (!this.game) {
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
  }

  private manageTrophyState(state: GameTrophyState): void {
    if (state.status === actionStatus.FETCHED && state.item) {
      this.trophy = state.item
      this.trophyCompleted = state.item.earned / state.item.total * 100
    }
  }

  ngOnInit() {
    this.activeRoute.params.forEach((params: Params) => {
      const url = params.url

      if (!this.game) {
        this.store.dispatch({
          type: actionTypes.FETCH_ITEM,
          payload: {
            params: url,
            state: 'games',
          },
        })
      }

      if (!this.game || !this.trophy || this.game._id !== this.trophy.game_id) {
        this.store.dispatch({
          type: actionTypes.FETCH_GAME_TROPHY,
          payload: {
            params: url,
            state: 'gameTrophy',
          },
        })
      }
    })
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
