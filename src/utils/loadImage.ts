const loadImage = (url: string) => {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      resolve(null)
    }
    img.src = url
  })
}

export default loadImage
