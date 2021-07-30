import GameDetail from '@/components/GameDetail'
import Image from '@/components/Image'
import MEDIA_QUERIES from '@/constants/mediaQueries'
import styled from '@emotion/styled'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import useViewData from './useViewData'

const Container = styled.div`
  display: grid;
  grid-template-columns: 270px 1fr;
  grid-gap: 20px;
  color: #fff;
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    display: block;
  }
`

const Side = styled.div`
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    magin: 0 auto;
    max-width: 270px
  }
`

const Detail = () => {
  const { game } = useViewData()

  return (
    <Container>
      <Side>
        <Image url={game?.cover || ''} icon={faGamepad} />
      </Side>
      {game && <GameDetail game={game} />}
    </Container>
  )
}

export default Detail
