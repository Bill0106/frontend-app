import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ErrorMessage from '@/components/ErrorMessage'
import Layout from '@/layouts/Layout'
import games from './games'
import home from './home'
import gourmets from './gourmets'
import movies from './movies'

const routes = [games, gourmets, movies]

const App = () => (
  <ErrorMessage>
    <Router>
      <Switch>
        <Route {...home} />
        <Layout>
          {routes.map((v, i) => <Route key={i} {...v} />)}
        </Layout>
      </Switch>
    </Router>
  </ErrorMessage>
)

export default App
