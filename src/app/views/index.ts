import { Routes } from '@angular/router'
import HomeComponent from './home'
import GamesComponent from './games.list'
import GameComponent from './games.detail'

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
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
]

const ViewComponents = [
  HomeComponent,
  GamesComponent,
  GameComponent,
]

export { routes, ViewComponents }
