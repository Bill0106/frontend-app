export interface Game {
  _id: string;
  title: string;
  name: string;
  genre: string;
  platform: string;
  rate: number;
  developer: string;
  publisher: string;
  buyAt: string;
  releaseAt: string;
  image: string;
  url: string;
  description: string;
}

export interface GameList {
  list: Array<Game>;
  total: number;
}

export interface GameTrophy {
  _id: string;
  title: string;
  description: string;
  image: string;
  rarity: string;
  earnedAt: string | null;
}

export interface Gourmet {
  _id: string;
  food: string;
  restaurant: string;
  image: string;
  date: string;
  url: string;
}

export interface GourmetList {
  list: Array<Gourmet>;
  total: number;
}
