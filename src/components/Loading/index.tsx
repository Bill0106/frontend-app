import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Loading = () => (
  <div className="loading">
    <FontAwesomeIcon icon={faSpinner} pulse />
  </div>
)

export default Loading
