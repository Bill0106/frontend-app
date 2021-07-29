import { Route, Switch, useRouteMatch } from 'react-router-dom'
import List from './List'

const Games = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={path} exact component={List} />
    </Switch>
  )
}

export default Games
