export interface Game {
  id: number
  title: string
  subtitle: string
  cover: string
  developer: string
  publisher: string
  genre: number
  gameConsole: number
  rate: number
  buy_at: number
}

export type GameItem = Pick<Game, 'id' | 'title' | 'cover' | 'rate'>
