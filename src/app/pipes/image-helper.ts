import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'imageHelper' })

class ImageHelperPipe implements PipeTransform {
  transform(image: string, field: string) {
    let data = ''

    if (typeof image !== 'undefined') {
      const imageData = JSON.parse(image)
      if (field === 'color') {
        let color = imageData.color
        data = '#' + color.substr(2)
      } else {
        data = imageData.url
      }
    }

    return data
  }
}

export default ImageHelperPipe
