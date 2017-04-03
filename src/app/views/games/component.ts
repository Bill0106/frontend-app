import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { HELLO } from '../../services/reducers'

interface Game {
  hello: string
}

@Component({
  selector: 'my-games',
  templateUrl: './template',
})

class GamesComponent implements OnInit {
  hello: Observable<string>
  constructor(private store: Store<Game>) {
    this.hello = store.select('hello')
  }

  ngOnInit() {
    this.store.dispatch({ type: HELLO })
  }
}

export default GamesComponent
