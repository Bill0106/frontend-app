import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import MainComponents from './main'
import { components } from './views'
import AppRoutingModule from './router'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
  ],
  declarations: [
    MainComponents,
    ...components,
  ],
  bootstrap: [ MainComponents ],
})

class AppModule { }

export default AppModule
