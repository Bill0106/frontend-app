export const isProduction = window.location.host === 'www.zhuhaolin.com'

export const API_URI = isProduction
  ? '//api.zhuhaolin.com'
  : 'http://localhost:9999'

export const CDN_URI = '//d30jecx7p602b2.cloudfront.net'
