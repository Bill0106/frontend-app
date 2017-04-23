import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'lazy-image',
  templateUrl: './template',
})

class LazyImageComponent {
  @Input() image: string
  @Input() text: string
  @Output() onClick = new EventEmitter()

  clicked() {
    this.onClick.emit()
  }
}

export default LazyImageComponent
