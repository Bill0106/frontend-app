import styled from '@emotion/styled'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
  margin-top: 16px;
  text-align: center;
  font-size: 32px;
  color: #fff;
`

const Loading = () => (
  <Container>
    <FontAwesomeIcon icon={faSpinner} pulse />
  </Container>
)

export default Loading
