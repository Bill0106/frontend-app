import styled from '@emotion/styled'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

const Rate = styled.div<{ align: string; count: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.count}, auto);
  grid-column-gap: 8px;
  justify-content: ${p => p.align};
  height: 16px;
  font-size: 16px;
`

const Rates: FC<{ rate: number; align?: 'center' | 'left'; size?: 'sm' | 'lg' }> = ({ rate, align = 'left', size = 'sm' }) => {
  const rates = Array(rate)
    .fill(null)
    .map((_, i) => <FontAwesomeIcon key={i} size={size} icon={faGamepad} />)

  return <Rate count={rate} align={align}>{rates}</Rate>
}

export default Rates
