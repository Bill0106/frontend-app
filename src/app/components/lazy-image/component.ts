import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'lazy-image',
  templateUrl: './template',
})

class LazyImageComponent {
  @Input() image: string
  @Input() text: string
  @Input() size: string
  @Output() onClick = new EventEmitter()
  square: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII='
  rectangle: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAbCAQAAAB8FaHvAAAAGUlEQVRYR+3BAQEAAACAkP6v7ggKAAAAoAEQIwABgZwLrQAAAABJRU5ErkJggg=='

  clicked() {
    this.onClick.emit()
  }
}

export default LazyImageComponent
