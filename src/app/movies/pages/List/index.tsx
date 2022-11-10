import MEDIA_QUERIES from '@/constants/mediaQueries'
import styled from '@emotion/styled'
import useViewData from './useViewData'
import MovieList from '../../components/MovieList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  position: relative;
  height: calc(100vh - 84px);
  overflow: hidden;
`

const Year = styled.p`
  margin: 0 0 20px;
  line-height: 32px;
  font-size: 24px;
  font-weight: bolder;
  color: #ffe400;
  @media (min-width: ${MEDIA_QUERIES.TABLET}) {
    font-size: 28px;
    text-align: center;
  }
`

const Content = styled.div`
  margin: 0 -16px;
  height: calc(100% - 52px);
  overflow: auto;
`

const Button = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 14px 0 6px;
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #ffe400;
  border: none;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  cursor: pointer;
  > span {
    display: block;
    line-height: 20px;
  }
`

const Movies = () => {
  const { list, year, prevYear, nextYear, changeYear } = useViewData()

  const handlePrev = () => {
    if (prevYear) {
      changeYear(prevYear)
    }
  }

  const handleNext = () => {
    if (nextYear) {
      changeYear(nextYear)
    }
  }

  return (
    <Container>
      <Year>{year}</Year>
      <Content>
        <MovieList list={list} />
      </Content>
      {prevYear && (
        <Button onClick={handlePrev}>
          <FontAwesomeIcon icon={faArrowUp} />
          <span>{prevYear}</span>
        </Button>
      )}
      {nextYear && (
        <Button onClick={handleNext}>
          <span>{nextYear}</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </Button>
      )}
    </Container>
  )
}

export default Movies
