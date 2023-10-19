export enum MovieType {
  Invalid = 0,
  Stream = 1,
  Cinema = 2,
}

export interface Movie {
  id: number
  title: string
  poster: string
  rate: number
  watchedAt: number
  movieType: MovieType
}
