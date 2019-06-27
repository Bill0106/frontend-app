export interface Game {
  id: string;
  title: string;
  name: string;
  genre: string;
  platform: string;
  rate: number;
  developer: string;
  publisher: string;
  buyAt: string;
  image: string;
  url: string;
}

export interface GameTrophy {
  id: string;
  title: string;
  description: string;
  image: string;
  rarity: string;
  earnAt: string | null;
}

export interface Gourmet {
  id: string;
  food: string;
  restaurant: string;
  image: string;
  eatAt: string;
  url: string;
}

export interface Movie {
  id: string;
  poster: string;
  rate: number;
  title: string;
  watchAt: string;
}
