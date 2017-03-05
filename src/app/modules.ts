import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import routes from './views'

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

class AppRoutingModule { }

export default AppRoutingModule
