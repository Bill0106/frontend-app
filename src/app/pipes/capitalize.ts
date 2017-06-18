import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'capitalize' })

class Capitalize implements PipeTransform {
  transform(str: string) {
    const first = str.slice(0, 1)
    const other = str.substr(1)

    return first.toUpperCase() + other
  }
}

export default Capitalize
