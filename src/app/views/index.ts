import { Routes } from '@angular/router'
import HomeComponent from './home'
import GamesComponent from './games.list'

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

const ViewComponents = [
  HomeComponent,
  GamesComponent,
]

export { routes, ViewComponents }
