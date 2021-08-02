export enum GameConsole {
  Invalid,
  PlayStation3,
  PlayStationVita,
  PlayStation4,
  NintendoSwitch
}

export const GameConsoleMap = new Map([
  [GameConsole.PlayStation3, 'PlayStation 3'],
  [GameConsole.PlayStationVita, 'PlayStation Vita'],
  [GameConsole.PlayStation4, 'PlayStation 4'],
  [GameConsole.NintendoSwitch, 'Nintendo Switch']
])

export enum Genre {
  Invalid,
  Action,
  Adventure,
  Fighting,
  Racing,
  RolePlaying,
  Sports,
  FirstPersonShooter,
  ThirdPersonShooter,
  Strategy,
  Flight
}

export const GenreMap = new Map([
  [Genre.Action, 'Action'],
  [Genre.Adventure, 'Adventure'],
  [Genre.Fighting, 'Fighting'],
  [Genre.Racing, 'Racing'],
  [Genre.RolePlaying, 'Role-Playing'],
  [Genre.Sports, 'Sports'],
  [Genre.FirstPersonShooter, 'First-Person Shooter'],
  [Genre.ThirdPersonShooter, 'Third-Person Shooter'],
  [Genre.Strategy, 'Strategy'],
  [Genre.Flight, 'Flight']
])

export enum TrophyRarity {
  Bronze = 1,
  Silver,
  Gold,
  Platinum
}

export const TrophyRarityMap = new Map([
  [TrophyRarity.Bronze, 'Bronze'],
  [TrophyRarity.Silver, 'Silver'],
  [TrophyRarity.Gold, 'Gold'],
  [TrophyRarity.Platinum, 'Platinum']
])

export const TrophyRarityColors = new Map([
  [TrophyRarity.Bronze, '#c56636'],
  [TrophyRarity.Silver, '#c8c8c8'],
  [TrophyRarity.Gold, '#dbaf4f'],
  [TrophyRarity.Platinum, '#00a2d1']
])
