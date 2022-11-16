import useViewData from './useViewData'
import MovieList from '../../components/MovieList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const Movies = () => {
  const { classname: { block, element }, list, year, contentRef, prevYear, nextYear, handleNext, handlePrev } = useViewData()

  return (
    <div {...block().class}>
      <h3 {...element('year').class}>{year}</h3>
      <div ref={contentRef} {...element('content').class}>
        <MovieList list={list} />
      </div>
      {prevYear && (
        <button {...element('btn').modifiers({ prev: true })} onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowUp} />
          <span>{prevYear}</span>
        </button>
      )}
      {nextYear && (
        <button {...element('btn').modifiers({ next: true })} onClick={handleNext}>
          <span>{nextYear}</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      )}
    </div>
  )
}

export default Movies
