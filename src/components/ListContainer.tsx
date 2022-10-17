import styled from '@emotion/styled'

const IMG_WIDTH = 360
const GAP = 16

const media = (num: number) => IMG_WIDTH * num + GAP * (num + 1)

const ListContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 auto;
  max-width: ${IMG_WIDTH * 6 + GAP * 5}px;
  @media (max-width: ${media(5)}px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: ${media(4)}px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: ${media(3)}px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${media(2)}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${media(1)}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default ListContainer
