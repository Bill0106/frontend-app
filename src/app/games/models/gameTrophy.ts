import { TrophyRarity } from '../constants'

export interface GameTrophy {
  id: number
  title: string
  description: string
  rarity: TrophyRarity
  image: string
  earnedAt?: number
}
