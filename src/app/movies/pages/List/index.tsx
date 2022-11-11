import useViewData from './useViewData'
import MovieList from '../../components/MovieList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const Movies = () => {
  const { list, year, contentRef, prevYear, nextYear, handleNext, handlePrev } = useViewData()

  return (
    <div className="movies">
      <h3 className="movies__year">{year}</h3>
      <div ref={contentRef} className="movies__content">
        <MovieList list={list} />
      </div>
      {prevYear && (
        <button className="movies__btn movies__btn--prev" onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowUp} />
          <span>{prevYear}</span>
        </button>
      )}
      {nextYear && (
        <button className="movies__btn movies__btn--next" onClick={handleNext}>
          <span>{nextYear}</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      )}
    </div>
  )
}

export default Movies
