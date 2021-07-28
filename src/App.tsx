import { BrowserRouter as Router, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Games from './pages/Games'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Route path="/" exact  component={Home} />
      <Layout>
        <Route path="/games" component={Games} />
      </Layout>
    </Router>
  )
}

export default App
