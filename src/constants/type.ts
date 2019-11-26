enum Type {
  Game = 'games',
  Gourmet = 'gourmets',
  Movie = 'movies',
}

export const TitleMap = new Map([
  [Type.Game, 'Games'],
  [Type.Gourmet, 'Gourmets'],
  [Type.Movie, 'Movies'],
]);

export const BackgroundMap = new Map([
  [Type.Game, '#303030'],
  [Type.Gourmet, '#F7F2EB'],
  [Type.Movie, '#272727'],
]);

export default Type;
