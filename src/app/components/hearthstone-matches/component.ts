import * as moment from 'moment'
import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { HearthstoneMatch, HearthstoneSeason, HearthstoneDeck } from '../../models'
import { actionStatus, actionTypes, hearthstonePlayerClasses } from '../../constants'

@Component({
  selector: 'hearthstone-matches',
  templateUrl: './template',
})

class HearthstoneMatchesComponent implements OnInit, OnDestroy {
  @Input() type: string

  matches: HearthstoneMatch[]
  decks: HearthstoneDeck[]
  seasons: HearthstoneSeason[]
  rows: any
  columns: any

  constructor(
    private store: Store<any>,
    private router: Router,
  ) {
    store
      .select('hearthstoneMatches')
      .pluck('items')
      .subscribe((items: HearthstoneMatch[]) => this.matches = items)

    store
      .select('hearthstoneDecks')
      .pluck('items')
      .subscribe((items: HearthstoneDeck[]) => this.decks = items)

    store
      .select('hearthstoneSeasons')
      .pluck('matchSeasons')
      .subscribe((items: HearthstoneSeason[]) => this.seasons = items)
  }

  private getStats(matches: HearthstoneMatch[]): any {
    const totalWin = matches.filter(match => match.result === 1).length
    const totalLose = matches.filter(match => match.result === -1).length
    let stats = {
      total: [totalWin, totalLose],
      PCT: totalWin / matches.length,
    }

    hearthstonePlayerClasses.forEach(item => {
      const classMatches = matches.filter(match => match.opponent === item.value)
      const classWin = classMatches.filter(match => match.result === 1).length
      const classLose = classMatches.filter(match => match.result === -1).length

      stats[item.name] = [classWin, classLose]
    })

    return stats
  }

  private getRows(): any {
    let totalRow = this.getStats(this.matches)
    let rows = []

    if (this.type === 'deck') {
      this.decks.forEach((deck: HearthstoneDeck) => {
        const matches = this.matches.filter(match => match.deck_id === deck._id)
        let row = this.getStats(matches)
        row.deck = deck

        rows.push(row)
      })
      totalRow.deck = { name: 'Total' }
    }

    if (this.type === 'season') {
      this.seasons.forEach((season: HearthstoneSeason) => {
        const matches = this.matches.filter((match: HearthstoneMatch) => moment(match.time).format('YYYYMM') === moment(season.month).format('YYYYMM'))
        let row = this.getStats(matches)
        row.season = season

        rows.push(row)
      })
      totalRow.season = { title: 'Total' }
    }

    rows.push(totalRow)

    return rows
  }

  ngOnInit() {
    this.columns = hearthstonePlayerClasses.map(item => item.name).concat(['total', 'PCT'])
    this.rows = this.getRows()
  }

  ngOnDestroy() {
    this.store.dispatch({
      type: actionTypes.INIT_STATE,
      payload: {
        state: 'hearthstoneMatches',
      },
    })
  }

  goDeck(deck: HearthstoneDeck): void {
    this.router.navigate(['/hearthstone/decks', deck._id])
  }

  goSeason(season: HearthstoneSeason): void {
    this.router.navigate(['/hearthstone/seasons', season.url])
  }
}

export default HearthstoneMatchesComponent
