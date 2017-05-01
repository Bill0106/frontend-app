import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { HearthstoneSeasonsState } from '../../models'
import { actionTypes, actionStatus, initState } from '../../constants'

@Component({
  selector: 'app-hearthstone-seasons',
  templateUrl: './template',
})

class HearthstoneSeasonsComponent implements OnInit {
  private limit: number = 6
  seasons: HearthstoneSeasonsState = initState.hearthstoneSeasons
  scrollDisabled: boolean = false
  loading: boolean
  error: string

  constructor(
    private store: Store<any>,
  ) {
    store
      .select('hearthstoneSeasons')
      .subscribe((state: HearthstoneSeasonsState) => this.manageState(state))
  }

  private manageState(state: HearthstoneSeasonsState) {}

  private getSeasons() {
    const { items, total } = this.seasons
    if (!items.length || items.length !== total) {
      const page = items.length / this.limit + 1
      this.store.dispatch({
        type: actionTypes.FETCH_LIST,
        payload: { page, state: 'hearthstoneSeasons', limit: this.limit },
      })
    }
  }

  ngOnInit() {
    if (!this.seasons.items.length) {
      this.getSeasons()
    }
  }
}

export default HearthstoneSeasonsComponent
