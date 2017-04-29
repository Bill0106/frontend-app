import { Component, Input } from '@angular/core'

@Component({
  selector: 'page-status',
  templateUrl: './template',
})

class PageStatusComponent {
  @Input() loading: boolean
  @Input() error: string
}

export default PageStatusComponent
