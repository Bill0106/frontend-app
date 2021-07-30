import { GameConsole, Genre } from '@/constants/game'

export interface GameTrophy {
  id: number
  title: string
  description: string
  rarity: number
  image: string
  earnedAt?: number
}

export interface Game {
  id: number
  title: string
  subtitle: string
  cover: string
  developer: string
  publisher: string
  genre: Genre
  gameConsole: GameConsole
  rate: number
  buyAt: number
  trophies?: GameTrophy[]
}

export type GameItem = Pick<Game, 'id' | 'title' | 'cover' | 'rate'>
