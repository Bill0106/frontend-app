import GameDetail from '@/components/GameDetail'
import Image from '@/components/Image'
import Loading from '@/components/Loading'
import TrophyList from '@/components/TrophyList'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import styled from '@emotion/styled'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
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
      {game?.trophies && <TrophyList trophies={game.trophies} />}
    </Container>
  )
}

export default Detail
