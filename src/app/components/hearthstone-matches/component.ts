import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { HearthstoneMatch, HearthstoneSeason } from '../../models'
import { actionStatus, actionTypes, hearthstonePlayerClasses } from '../../constants'

@Component({
  selector: 'hearthstone-matches',
  templateUrl: './template',
})

class HearthstoneMatchesComponent implements OnInit {
  @Input() type: string
  @ViewChild('headerTemplate') headerTemplate: TemplateRef<any>
  @ViewChild('cellTemplate') cellTemplate: TemplateRef<any>
  matches: HearthstoneMatch[]
  rows: any
  columns: any

  constructor(private store: Store<any>) {}

  private getStats(matches: HearthstoneMatch[]): any {
    const totalWin = matches.filter(match => match.result === 1).length
    const totalLose = matches.filter(match => match.result === -1).length
    let stats = {
      total: `${totalWin} - ${totalLose}`,
      pct: totalWin / matches.length,
    }

    hearthstonePlayerClasses.forEach(item => {
      const classMatches = matches.filter(match => match.opponent === item.value)
      const classWin = classMatches.filter(match => match.result === 1).length
      const classLose = classMatches.filter(match => match.result === -1).length

      stats[item.name.toLowerCase()] = `${classWin} - ${classLose}`
    })

    return stats
  }

  private getColumns(): any {
    let columns = hearthstonePlayerClasses.map(item => ({ name: item.name }))
    columns.unshift({ name: this.type === 'season' ? 'Deck' : 'Season' })
    columns.push({ name: 'Total' })
    columns.push({ name: 'PCT' })
    columns = columns.map(column => {
      column['headerTemplate'] = this.headerTemplate
      column['cellTemplate'] = this.cellTemplate
      return column
    })

    return columns
  }

  private getSeasonRows(): any {
    const deckSets = new Set(this.matches.map(match => match.deck_id))
    const deckIds = Array.from(deckSets)
    let rows = []

    deckIds.forEach(id => {
      const matches = this.matches.filter(match => match.deck_id === id)
      let row = this.getStats(matches)
      row.deck = id

      rows.push(row)
    })

    let totalRow = this.getStats(this.matches)
    totalRow.deck = 'Total'
    rows.push(totalRow)

    return rows
  }

  ngOnInit() {
    this.store.select('hearthstoneMatches')
      .pluck('items')
      .subscribe((items: HearthstoneMatch[]) => this.matches = items)

    this.columns = this.getColumns()
    this.rows = this.getSeasonRows()
  }
}

export default HearthstoneMatchesComponent
