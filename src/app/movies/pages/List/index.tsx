import useViewData from './useViewData'
import MovieList from '../../components/MovieList'
import Loading from '@/components/Loading'

const Movies = () => {
  const { classname: { block, element }, list, years, year, contentRef, isFetchingYears, handleYearChange } = useViewData()

  if (isFetchingYears) {
    return <Loading />
  }

  return (
    <div {...block().class}>
      <div {...element('years').class}>
        <ul {...element('years-list').class}>
          {years.map(v =>
            <li key={v} {...element('year').modifiers({ active: v === year })} onClick={() => handleYearChange(v)}>{v}</li>
          )}
        </ul>
      </div>
      <div ref={contentRef} {...element('content').class}>
        <MovieList list={list} />
      </div>
    </div>
  )
}

export default Movies
