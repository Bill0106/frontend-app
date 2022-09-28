import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

const container = document.getElementById('app')

if (container) {
  const root = ReactDOM.createRoot(container)

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
