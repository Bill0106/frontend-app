import * as moment from 'moment'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Store } from '@ngrx/store'
import { HearthstoneDeck, HearthstoneDeckState, HearthstoneCard, HearthstoneCardsState, HearthstoneMatch, HearthstoneMatchesState, HearthstoneSeasonsState } from '../../models'
import { actionStatus, actionTypes } from '../../constants'

@Component({
  selector: 'app-hearthstone-deck',
  templateUrl: './template',
})

class HearthstoneDeckComponent implements OnInit, OnDestroy {
  id: string
  deck: HearthstoneDeck
  cards: HearthstoneCard[]
  wins: number
  lose: number
  total: number
  showMatches: boolean
  loading: boolean = true
  error: string

  constructor(
    private store: Store<any>,
    private activeRoute: ActivatedRoute,
  ) {
    activeRoute.params.subscribe((params: Params) => this.id = params.id)

    store
      .select('hearthstoneDecks')
      .subscribe((state: HearthstoneDeckState) => {
        this.getDeck(state)
        if (!this.deck) this.manageDeckState(state)
      })

    store
      .select('hearthstoneCards')
      .subscribe((state: HearthstoneCardsState) => this.manageCardsState(state))

    store
      .select('hearthstoneMatches')
      .subscribe((state: HearthstoneMatchesState) => this.manageMatchesState(state))

    store
      .select('hearthstoneSeasons')
      .subscribe((state: HearthstoneSeasonsState) => this.manageSeasonsState(state))
  }

  private getDeck(state: HearthstoneDeckState): void {
    const deck = state.items.find((item: HearthstoneDeck) => item._id === this.id)
    if (!this.deck && deck) {
      this.deck = deck
      this.getCardsAndMatches(deck)
    }
  }

  private manageDeckState(state: HearthstoneDeckState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        if (state.item && state.item._id === this.id) {
          this.deck = state.item
          this.getCardsAndMatches(state.item)
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

  private getCardsAndMatches(deck: HearthstoneDeck): void {
    this.store.dispatch({
      type: actionTypes.FETCH_LIST_BY_IDS,
      payload: {
        ids: deck.cards.map(item => item.card).join(','),
        state: 'hearthstoneCards',
      },
    })

    this.store.dispatch({
      type: actionTypes.FETCH_HEARTHSTONE_MATCHES,
      payload: {
        deck: deck._id,
        state: 'hearthstoneMatches',
      },
    })
  }

  private manageCardsState(state: HearthstoneCardsState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        this.cards = state.items.map((item: HearthstoneCard) => {
          const card = this.deck.cards.find(x => x.card === item._id)
          if (card) return { ...item, count: card.count }
        })
        break
      case actionStatus.REJECTED:
        this.loading = false
        this.error = state.error
        break
      default:
        break
    }
  }

  private manageMatchesState(state: HearthstoneMatchesState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        const matches = state.items
        if (matches.length) {
          this.total = matches.length
          this.wins = matches.filter(match => match.result === 1).length
          this.lose = matches.filter(match => match.result === -1).length
          const months = matches.map(match => moment(match.time).format('YYYYMM'))
          this.getMatchSeasons(new Set(months))
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

  private getMatchSeasons(months: any): void {
    this.store.dispatch({
      type: actionTypes.FETCH_HEARTHSTONE_SEASONS_BY_MONTHS,
      payload: {
        state: 'hearthstoneSeasons',
        months: Array.from(months).join(','),
      },
    })
  }

  private manageSeasonsState(state: HearthstoneSeasonsState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        if (this.total) {
          this.loading = false
          this.showMatches = true
        }
      case actionStatus.REJECTED:
        this.loading = false
        this.error = state.error
      default:
        break
    }
  }

  ngOnInit() {
    if (!this.deck) {
      this.store.dispatch({
        type: actionTypes.FETCH_ITEM,
        payload: {
          params: this.id,
          state: 'hearthstoneDecks',
        },
      })
    }
  }

  ngOnDestroy() {
    this.store.dispatch({
      type: actionTypes.INIT_STATE,
      payload: {
        state: 'hearthstoneCards',
      },
    })
  }
}

export default HearthstoneDeckComponent
