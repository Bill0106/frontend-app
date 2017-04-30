import { Routes } from '@angular/router'
import HomeComponent from './home'
import GamesComponent from './games.list'
import GameComponent from './games.detail'
import GourmetsComponent from './gourmets'
import HearthstoneSeasonsComponent from './hearthstone.seasons'

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
]

export { routes, ViewComponents }
