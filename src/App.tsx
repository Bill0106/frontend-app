import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ErrorMessage from './components/ErrorMessage'
import Layout from './layouts/Layout'
import Games from './pages/Games'
import Gourmets from './pages/Gourmets'
import Home from './pages/Home'
import Movies from './pages/Movies'

const App = () => (
  <ErrorMessage>
    <Router>
      <Switch>
        <Route path="/" exact  component={Home} />
        <Layout>
          <Route path="/games" component={Games} />
          <Route path="/gourmets" component={Gourmets} />
          <Route path="/movies" component={Movies} />
        </Layout>
      </Switch>
    </Router>
  </ErrorMessage>
)

export default App
