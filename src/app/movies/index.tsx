import { RouteObject } from 'react-router-dom'
import List from './pages/List'
import Layout from '@/layouts/Layout'

const movies: RouteObject = {
  path: '/movies',
  element: <Layout />,
  children: [{ index: true, element: <List /> }]
}

export default movies
