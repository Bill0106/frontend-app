import { Component } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

declare const ga: Function

@Component({
  selector: 'my-app',
  templateUrl: './template',
})

class MainComponent {
  constructor(router: Router) {
    router.events.distinctUntilChanged((previous: any, current: any) => {
      if (current instanceof NavigationEnd) {
        return previous.url === current.url
      }
      return true
    }).subscribe((x: any) => {
      if (typeof ga !== 'undefined') {
        ga('set', 'page', x.url)
        ga('send', 'pageview')
      }
    })
  }
}

export default MainComponent
