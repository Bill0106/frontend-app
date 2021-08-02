import GameDetail from '@/components/GameDetail'
import Image from '@/components/Image'
import Loading from '@/components/Loading'
import TrophyList from '@/components/TrophyList'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import styled from '@emotion/styled'
import { faGamepad, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useViewData from './useViewData'

const Container = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;
  grid-gap: 20px;
  padding-top: 40px;
  color: #fff;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
  }
`

const Side = styled.div`
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    margin: 0 auto;
    max-width: 270px
  }
`

const Empty = styled.div`
  padding-top: 48px;
  grid-column-start: 1;
  grid-column-end: span 3;
  text-align: center;
  font-size: 28px;
  color: rgba(255, 255, 255, 0.25);
`

const EpmtyIcon = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 148px;
  height: 148px;
  color: #303030;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 100%;
`

const Detail = () => {
  const { game, isFetching } = useViewData()

  if (isFetching) {
    return <Loading />
  }

  return (
    <Container>
      <Side>
        <Image url={game?.cover || ''} icon={faGamepad} />
      </Side>
      {game && <GameDetail game={game} />}
      {game?.trophies ? (
        <TrophyList trophies={game.trophies} />
      ) : (
        <Empty>
          <EpmtyIcon>
            <FontAwesomeIcon icon={faTrophy} size="3x" />
          </EpmtyIcon>
          <p>Oops! No Trophy</p>
        </Empty>
      )}
    </Container>
  )
}

export default Detail
