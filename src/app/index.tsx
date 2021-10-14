import {
  Route,
  Switch,
  useLocation
} from 'react-router-dom'
import ReactGA from 'react-ga'
import ErrorMessage from '@/components/ErrorMessage'
import Layout from '@/layouts/Layout'
import games from './games'
import home from './home'
import gourmets from './gourmets'
import movies from './movies'
import { useEffect, useState } from 'react'
import { isProduction } from '@/constants/env'

const routes = [games, gourmets, movies]

const App = () => {
  const location = useLocation()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (isProduction) {
      ReactGA.initialize('UA-56615048-1')
      setInitialized(true)
    }
  }, [location])

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search)
    }
  }, [initialized, location])

  return (
    <ErrorMessage>
      <Switch>
        <Route {...home} />
        <Layout>
          {routes.map((v, i) => <Route key={i} {...v} />)}
        </Layout>
      </Switch>
    </ErrorMessage>
  )
}

export default App
