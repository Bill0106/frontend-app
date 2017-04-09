import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { LazyLoadImageModule } from 'ng-lazyload-image'
import { Reducers, Services, Effects } from './services'
import { ViewComponents } from './views'
import MainComponents from './main'
import AppRoutingModule from './router'
import Pipes from './pipes'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.provideStore(Reducers),
    EffectsModule.run(Effects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5,
    }),
    MaterialModule,
    LazyLoadImageModule,
    AppRoutingModule,
  ],
  declarations: [
    MainComponents,
    ...ViewComponents,
    ...Pipes,
  ],
  providers: [ Services ],
  bootstrap: [ MainComponents ],
})

class AppModule { }

export default AppModule
