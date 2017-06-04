import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Store } from '@ngrx/store'
import { HearthstoneDeck, HearthstoneDeckState, HearthstoneCard, HearthstoneCardsState } from '../../models'
import { actionStatus, actionTypes } from '../../constants'

@Component({
  selector: 'app-hearthstone-deck',
  templateUrl: './template',
})

class HearthstoneDeckComponent implements OnInit {
  deck: HearthstoneDeck
  cards: HearthstoneCard[]
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
  }

  private getDeck(state: HearthstoneDeckState): void {
    this.activeRoute.params.forEach((params: Params) => {
      const id = params.id
      const deck = state.items.find((item: HearthstoneDeck) => item._id === id)

      if (deck) {
        this.deck = deck
        this.getCards(deck.cards)
      }
    })
  }

  private manageDeckState(state: HearthstoneDeckState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        this.deck = state.item
        this.getCards(state.item.cards)
        break
      case actionStatus.REJECTED:
        this.loading = false
        this.error = state.error
        break
      default:
        break
    }
  }

  private getCards(cards: any): void {
    const ids = cards.map(item => item.card).join(',')
    this.store.dispatch({
      type: actionTypes.FETCH_LIST_BY_IDS,
      payload: {
        ids,
        state: 'hearthstoneCards',
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
