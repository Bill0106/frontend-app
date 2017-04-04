import { Component, Input } from '@angular/core'

@Component({
  selector: 'games-list',
  templateUrl: './template',
})

class GamesList {
  @Input() games
}

export default GamesList
