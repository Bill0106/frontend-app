import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import AppModule from './app/index'

const platform = platformBrowserDynamic()

if (process.env.NODE_ENV === 'production') {
  enableProdMode()
}

platform.bootstrapModule(AppModule)
