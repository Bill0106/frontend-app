import { useRoutes, useLocation, RouteObject } from 'react-router-dom'
import ReactGA from 'react-ga'
import ErrorMessage from '@/components/ErrorMessage'
import games from './games'
import home from './home'
import gourmets from './gourmets'
import movies from './movies'
import { useEffect, useState } from 'react'
import { isProduction } from '@/constants/env'

const App = () => {
  const location = useLocation()
  const [initialized, setInitialized] = useState(false)

  const routes: RouteObject[] = [{
    path: '/',
    children:[home, games, gourmets, movies]
  }]

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
      {useRoutes(routes)}
    </ErrorMessage>
  )
}

export default App
