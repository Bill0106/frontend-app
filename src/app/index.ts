import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { storeLogger } from 'ngrx-store-logger'
import MainComponents from './main'
import { components } from './views'
import AppRoutingModule from './router'
import { helloReducer } from './services/reducers'
import Effects from './services/effects'
import Services from './services/services'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.provideStore(helloReducer),
    EffectsModule.run(Effects),
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
  providers: [ Services ],
  bootstrap: [ MainComponents ],
})

class AppModule { }

export default AppModule
