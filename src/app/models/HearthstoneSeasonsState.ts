import HearthstoneSeason from './HearthstoneSeason'

class HearthstoneSeasonsState {
  items: HearthstoneSeason[]
  item: HearthstoneSeason
  matchSeasons: HearthstoneSeason[]
  total: number
  error: string
  status: string
}

export default HearthstoneSeasonsState
