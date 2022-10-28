import { GameConsole, Genre } from '../constants'
import { GameTrophy } from './gameTrophy'

export interface Game {
  id: number
  title: string
  subtitle: string
  cover: string
  genre: Genre
  gameConsole: GameConsole
  rate: number
  playtime: number
  buyAt: number
  trophies?: GameTrophy[]
}

export type GameItem = Pick<Game, 'id' | 'title' | 'cover' | 'rate' | 'gameConsole' | 'playtime' | 'buyAt'>
