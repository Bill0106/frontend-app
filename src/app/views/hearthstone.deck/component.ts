import * as moment from 'moment'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Store } from '@ngrx/store'
import { HearthstoneDeck, HearthstoneDeckState, HearthstoneCard, HearthstoneCardsState, HearthstoneMatch, HearthstoneMatchesState, HearthstoneSeasonsState } from '../../models'
import { actionStatus, actionTypes } from '../../constants'

@Component({
  selector: 'app-hearthstone-deck',
  templateUrl: './template',
})

class HearthstoneDeckComponent implements OnInit {
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
    this.activeRoute.params.forEach((params: Params) => {
      const deck = state.items.find((item: HearthstoneDeck) => item._id === params.id)

      if (!this.deck && deck) {
        this.deck = deck
        this.getCardsAndMatches(deck)
      }
    })
  }

  private manageDeckState(state: HearthstoneDeckState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        this.deck = state.item
        this.getCardsAndMatches(state.item)
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
          const count = this.deck.cards.find(x => x.card === item._id).count
          return {
            ...item,
            count,
          }
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
        this.total = matches.length
        this.wins = matches.filter(match => match.result === 1).length
        this.lose = matches.filter(match => match.result === -1).length
        const months = matches.map(match => moment(match.time).format('YYYYMM'))
        this.getMatchSeasons(new Set(months))
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
        this.loading = false
        this.showMatches = true
      case actionStatus.REJECTED:
        this.loading = false
        this.error = state.error
      default:
        break
    }
  }

  ngOnInit() {
    if (!this.deck) {
      this.activeRoute.params.forEach((params: Params) => {
        this.store.dispatch({
          type: actionTypes.FETCH_ITEM,
          payload: {
            params: params.id,
            state: 'hearthstoneDecks',
          },
        })
      })
    }
  }
}

export default HearthstoneDeckComponent
