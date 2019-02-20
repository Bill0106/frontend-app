export interface Game {
  _id: string;
  title: string;
  name: string;
  genre: string;
  platform: string;
  rate: number;
  image: string;
}

export interface GameList {
  list: Array<Game>;
  total: number;
}
