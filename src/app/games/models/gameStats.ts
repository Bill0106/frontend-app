import { GameItem } from '@/app/games/models/game'

type Year = {
  count: number
  month: Record<string, number>
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
