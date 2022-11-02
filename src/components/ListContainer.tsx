import { COLUMN_LAYOUT, MAX_WIDTH } from '@/constants/mediaQueries'
import styled from '@emotion/styled'

const ListContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 auto;
  max-width: ${MAX_WIDTH}px;
  @media (max-width: ${COLUMN_LAYOUT.COLUMN_5}) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: ${COLUMN_LAYOUT.COLUMN_4}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: ${COLUMN_LAYOUT.COLUMN_3}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${COLUMN_LAYOUT.COLUMN_2}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${COLUMN_LAYOUT.COLUMN_1}) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default ListContainer
