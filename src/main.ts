import 'core-js'
import 'reflect-metadata'
import 'zone.js'
import 'hammerjs'
import 'normalize.css'
import './style'

import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import AppModule from './app'

const platform = platformBrowserDynamic()

if (process.env.NODE_ENV === 'production') {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
