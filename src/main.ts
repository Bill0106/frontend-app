import 'core-js'
import 'reflect-metadata'
import 'zone.js'

import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { bootloader } from '@angularclass/hmr';
import AppModule from './app/index'

const platform = platformBrowserDynamic()

if (process.env.NODE_ENV === 'production') {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
