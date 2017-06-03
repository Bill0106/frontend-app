import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Store } from '@ngrx/store'
import { HearthstoneDeck, HearthstoneDeckState } from '../../models'
import { actionStatus, actionTypes } from '../../constants'

@Component({
  selector: 'app-hearthstone-deck',
  templateUrl: './template',
})

class HearthstoneDeckComponent implements OnInit {
  deck: HearthstoneDeck
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
  }

  private getDeck(state: HearthstoneDeckState): void {
    this.activeRoute.params.forEach((params: Params) => {
      const id = params.id
      const deck = state.items.find((item: HearthstoneDeck) => item._id === id)

      if (deck) {
        this.deck = deck
      }
    })
  }

  private manageDeckState(state: HearthstoneDeckState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        this.deck = state.item
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
    this.activeRoute.params.forEach((params: Params) => {
      console.log(params)
    })
  }
}

export default HearthstoneDeckComponent
