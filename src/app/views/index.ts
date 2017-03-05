import { Routes } from '@angular/router'
import HomeComponent from './home'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
]

export default routes
