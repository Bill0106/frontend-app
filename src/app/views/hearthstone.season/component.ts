import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Store } from '@ngrx/store'
import { HearthstoneSeason, HearthstoneSeasonsState, HearthstoneMatch, HearthstoneMatchesState, HearthstoneDeckState } from '../../models'
import { actionStatus, actionTypes } from '../../constants'

@Component({
  selector: 'app-hearthstone-season',
  templateUrl: './template',
})

class HearthstoneSeasonComponent implements OnInit {
  url: string
  season: HearthstoneSeason = null
  wins: number
  lose: number
  total: number
  showMatches: boolean
  loading: boolean = true
  error: string

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<any>,
  ) {
    activeRoute.params.subscribe((params: Params) => this.url = params.url)

    store
      .select('hearthstoneSeasons')
      .subscribe((state: HearthstoneSeasonsState) => {
        this.getSeason(state)
        if (!this.season) this.manageSeasonState(state)
      })

    store
      .select('hearthstoneMatches')
      .subscribe((state: HearthstoneMatchesState) => this.manageMatchesState(state))

    store
      .select('hearthstoneDecks')
      .subscribe((state: HearthstoneDeckState) => this.manageDecksState(state))
  }

  private getSeason(state: HearthstoneSeasonsState): void {
    const season = state.items.find(item => item.url === this.url)

    if (!this.season && season) {
      this.season = season
      this.getMatches(season)
    }
  }

  private manageSeasonState(state: HearthstoneSeasonsState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        if (state.item && state.item.url === this.url) {
          this.season = state.item
          this.getMatches(state.item)
        }
        break
      case actionStatus.REJECTED:
        this.loading = false
        this.error = state.error
        break
      default:
        break
    }
  }

  private getMatches(season: HearthstoneSeason): void {
    this.store.dispatch({
      type: actionTypes.FETCH_HEARTHSTONE_MATCHES,
      payload: {
        state: 'hearthstoneMatches',
        season: season.month,
      },
    })
  }

  private manageMatchesState(state: HearthstoneMatchesState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        const matches = state.items
        if (matches.length) {
          this.total = matches.length
          this.wins = matches.filter(match => match.result === 1).length
          this.lose = matches.filter(match => match.result === -1).length
          this.getDecks(matches)
        } else {
          this.loading = false
        }
        break
      case actionStatus.REJECTED:
        this.loading = false
        this.error = state.error
        break
      default:
        break
    }
  }

  private getDecks(matches: HearthstoneMatch[]): void {
    const idsSet = new Set(matches.map(match => match.deck_id))
    const ids = Array.from(idsSet).join(',')

    this.store.dispatch({
      type: actionTypes.FETCH_LIST_BY_IDS,
      payload: {
        ids,
        state: 'hearthstoneDecks',
      },
    })
  }

  private manageDecksState(state: HearthstoneDeckState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        if (this.total) {
          this.showMatches = true
          this.loading = false
        }
        break
      case actionStatus.REJECTED:
        this.loading = false
        this.error = state.error
        break
      default:
        break
    }
  }

  ngOnInit() {
    if (!this.season) {
      this.store.dispatch({
        type: actionTypes.FETCH_ITEM,
        payload: {
          params: this.url,
          state: 'hearthstoneSeasons',
        },
      })
    }
  }
}

export default HearthstoneSeasonComponent
