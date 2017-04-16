import Game from './Game'

interface GamesState {
  items: Game[]
  item: Game
  total: number
  error: any
  status: string
}

export default GamesState
