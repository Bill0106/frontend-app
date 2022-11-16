import { Gourmet } from '../models/gourmet'
import { faMapMarkerAlt, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { FC } from 'react'
import Image from '@/components/Image'
import bem from '@/utils/bem'

const GourmetCard: FC<{ item: Gourmet }> = ({ item }) => {
  const { block, element } = bem('gourmet-card')

  return (
    <div {...block().class}>
      <div {...element('header').class}>
        <FontAwesomeIcon icon={faMapMarkerAlt} color="#ccc" />
        <span>{item.restaurant}</span>
      </div>
      <Image url={item.image} icon={faUtensils} />
      <div {...element('content').class}>
        <p {...element('title').class}>{item.food}</p>
        <span {...element('eat-at').class}>{dayjs.unix(item.eatAt).format('YYYY-MM-DD')}</span>
      </div>
    </div>
  )
}

export default GourmetCard
