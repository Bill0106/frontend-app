import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Detail from './Detail'
import List from './List'

const Games = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={path} exact component={List} />
      <Route path={`${path}/:id`} component={Detail} />
    </Switch>
  )
}

export default Games
