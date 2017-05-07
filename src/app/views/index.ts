import { Routes } from '@angular/router'
import HomeComponent from './home'
import GamesComponent from './games.list'
import GameComponent from './games.detail'
import GourmetsComponent from './gourmets'
import HearthstoneSeasonsComponent from './hearthstone.seasons'
import HearthstoneSeasonComponent from './hearthstone.season'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'games',
    children: [
        { path: '', component: GamesComponent },
        { path: ':url', component: GameComponent },
    ],
  },
  {
    path: 'gourmets',
    component: GourmetsComponent,
  },
  {
    path: 'hearthstone',
    children: [
      { path: '', component: HearthstoneSeasonsComponent },
      { path: 'seasons', redirectTo: '/hearthstone', pathMatch: 'full' },
      { path: 'seasons/:url', component: HearthstoneSeasonComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
]

const ViewComponents = [
  HomeComponent,
  GamesComponent,
  GameComponent,
  GourmetsComponent,
  HearthstoneSeasonsComponent,
  HearthstoneSeasonComponent,
]

export { routes, ViewComponents }
