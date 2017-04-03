import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import MainComponents from './main'
import { components } from './views'
import AppRoutingModule from './router'
import { helloReducer } from './services/reducers'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.provideStore({ hello: helloReducer }),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5,
    }),
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
