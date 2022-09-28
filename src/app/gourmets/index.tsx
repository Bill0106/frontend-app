import { RouteObject } from 'react-router-dom'
import List from './pages/List'
import Layout from '@/layouts/Layout'

const gourmets: RouteObject = {
  path: 'gourmets',
  element: (
    <Layout>
      <List />
    </Layout>
  )
}

export default gourmets
