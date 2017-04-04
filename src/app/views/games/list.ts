import { Component, Input } from '@angular/core'

@Component({
  selector: 'games-list',
  templateUrl: './games-list',
})

class GamesList {
  @Input() games
}

export default GamesList
