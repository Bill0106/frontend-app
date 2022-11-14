import pages from '@/constants/pages'
import { Link } from 'react-router-dom'
import useViewData from './useViewData'

const Home = () => {
  const { classname: { block, element }, background, show, handleEvent, handleTitleMouseEnter } = useViewData()

  return (
    <div {...block().class}>
      <div {...element('container').modifiers({ show })} style={{ backgroundImage: `url(${background})` }}>
        <div {...element('content').class}>
          <h1 {...element('title').class} onMouseEnter={handleTitleMouseEnter}>
            {'Bill\'s Hobby'}
          </h1>
          <div {...element('sections').class}>
            {pages.slice(1).map(v => (
              <div key={v.title}>
                <Link {...element('link').class} to={v.path} onMouseEnter={handleEvent}>
                  {v.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div {...element('mask').class} />
      </div>
      <div {...element('loading').modifiers({ show: !show })}>
        <p {...element('loading').sub('text').class}>Loading...</p>
      </div>
    </div>
  )
}

export default Home
