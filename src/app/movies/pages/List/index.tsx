import useViewData from './useViewData'
import MovieList from '../../components/MovieList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import classnames from '@/utils/classnames'

const Movies = () => {
  const classname = classnames('movies')
  const { list, year, contentRef, prevYear, nextYear, handleNext, handlePrev } = useViewData()

  return (
    <div {...classname()}>
      <h3 {...classname('year')}>{year}</h3>
      <div ref={contentRef} {...classname('content')}>
        <MovieList list={list} />
      </div>
      {prevYear && (
        <button {...classname('btn', { prev: true })} onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowUp} />
          <span>{prevYear}</span>
        </button>
      )}
      {nextYear && (
        <button {...classname('btn', { next: true })} onClick={handleNext}>
          <span>{nextYear}</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      )}
    </div>
  )
}

export default Movies
