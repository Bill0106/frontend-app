import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './layouts/Layout'
import Games from './pages/Games'
import Gourmets from './pages/Gourmets'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact  component={Home} />
        <Layout>
          <Route path="/games" component={Games} />
          <Route path="/gourmets" component={Gourmets} />
        </Layout>
      </Switch>
    </Router>
  )
}

export default App
