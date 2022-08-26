import { Route, Switch, useRouteMatch, RouteProps } from 'react-router-dom'
import Detail from './pages/Detail'
import List from './pages/List'

const Games = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={path} exact component={List} />
      <Route path={`${path}/:id`} component={Detail} />
    </Switch>
  )
}

const games: RouteProps = {
  path: '/games',
  component: Games
}

export default games
