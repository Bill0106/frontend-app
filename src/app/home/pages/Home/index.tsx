import pages from '@/constants/pages'
import classnames from '@/utils/classnames'
import { Link } from 'react-router-dom'
import useViewData from './useViewData'

const Home = () => {
  const classname = classnames('home')
  const { background, show, handleEvent, handleTitleMouseEnter } = useViewData()

  return (
    <div {...classname()}>
      <div {...classname('container', { show })} style={{ backgroundImage: `url(${background})` }}>
        <div {...classname('content')}>
          <h1 {...classname('title')} onMouseEnter={handleTitleMouseEnter}>
            {'Bill\'s Hobby'}
          </h1>
          <div {...classname('sections')}>
            {pages.slice(1).map(v => (
              <div key={v.title}>
                <Link {...classname('link')} to={v.path} onMouseEnter={handleEvent}>
                  {v.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div {...classname('mask')} />
      </div>
      <div {...classname('loading', { show: !show })}>
        <p {...classname('loading-text')}>Loading...</p>
      </div>
    </div>
  )
}

export default Home
