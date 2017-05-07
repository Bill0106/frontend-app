import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Store } from '@ngrx/store'
import { HearthstoneSeason, HearthstoneSeasonsState } from '../../models'
import { actionStatus, actionTypes } from '../../constants'

@Component({
  selector: 'app-hearthstone-season',
  templateUrl: './template',
})

class HearthstoneSeasonComponent implements OnInit {
  season: HearthstoneSeason = null
  loading: boolean = true
  error: string

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<any>,
  ) {
    store
      .select('hearthstoneSeasons')
      .subscribe((state: HearthstoneSeasonsState) => {
        this.getSeason(state)
        if (!this.season) {
          this.manageState(state)
        }
      })
  }

  private getSeason(state: HearthstoneSeasonsState): void {
    this.activeRoute.params.forEach((params: Params) => {
      const url = params.url
      const season = state.items.find(item => item.url === url)

      if (season) {
        this.season = season
        this.loading = false
      }
    })
  }

  private manageState(state: HearthstoneSeasonsState): void {
    switch (state.status) {
      case actionStatus.FETCHED:
        this.season = state.item
        this.loading = false
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
      const url = params.url

      if (!this.season) {
        this.store.dispatch({
          type: actionTypes.FETCH_ITEM,
          payload: {
            params: url,
            state: 'hearthstoneSeasons',
          },
        })
      }
    })
  }
}

export default HearthstoneSeasonComponent
