import { GameItem } from '@/app/games/models/game'

interface Year {
  count: number
  month: Record<string, number>
}

export interface GameStats {
  totalPlayed: number
  consoles: Record<string, number>
  genres: Record<string, number>
  rates: Record<string, number>
  years: Record<string, Year>
  recent: GameItem[]
  mostPlayed: GameItem[]
}
