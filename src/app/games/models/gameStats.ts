import { GameItem } from '@/app/games/models/game'

type Year = {
  count: number
  month: number[]
}

type Chart = {
  name: string
  value: number
}

export interface GameStats {
  totalPlayed: number
  consoles: Chart[]
  genres: Chart[]
  rates: Chart[]
  years: Record<string, Year>
  recent: GameItem[]
  mostPlayed: GameItem[]
}
