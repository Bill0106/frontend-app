import { RouteObject } from 'react-router-dom'
import List from './pages/List'
import Layout from '@/layouts/Layout'

const gourmets: RouteObject = {
  path: 'gourmets',
  element: <Layout />,
  children: [{ index: true, element: <List /> }]
}

export default gourmets
