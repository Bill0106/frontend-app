export enum GamePlatform {
  PSV = 'PlayStation Vita',
  PS3 = 'PlayStation 3',
  PS4 = 'PlayStation 4',
  NS = 'Nintendo Switch',
}

export interface Game {
  id: string;
  title: string;
  name: string;
  genre: string;
  platform: GamePlatform;
  rate: number;
  developer: string;
  publisher: string;
  buyAt: string;
  image: string;
}

export interface GameTrophy {
  id: string;
  title: string;
  description: string;
  image: string;
  rarity: string;
  earnAt?: string;
}

export interface Gourmet {
  id: string;
  food: string;
  restaurant: string;
  image: string;
  eatAt: string;
}

export interface Movie {
  id: string;
  poster: string;
  rate: number;
  title: string;
  watchAt: string;
}
