import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import MainComponents from './main'
import AppRoutingModule from './modules'
import components from './components'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [...components],
  bootstrap: [MainComponents]
})

class AppModule { }

export default AppModule