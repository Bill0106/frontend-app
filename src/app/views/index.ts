import { Routes } from '@angular/router'
import HomeComponent from './home'
import GamesComponent from './games'
import GamesListComponent from './games/list'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'games',
    component: GamesComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
]

const components = [
  HomeComponent,
  GamesComponent,
  GamesListComponent,
]

export { routes, components }
