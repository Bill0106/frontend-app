import { GameTrophy } from '../models/gameTrophy'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import useMessage from '@/utils/useMessage'
import request from '@/utils/request'
import Loading from '@/components/Loading'
import TrophyItem from './TrophyItem'
import bem from '@/utils/bem'

interface TrophyListProps {
  id: number
  visible: boolean
  onHide: () => void
}

const TrophyList: FC<TrophyListProps> = ({ id, visible, onHide }) => {
  const { block, element } = bem('game-trophy')
  const { setMessage } = useMessage()

  const [trophies, setTrophies] = useState<GameTrophy[]>([])
  const [containerVisible, setContainerVisible] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const modalContainer = useRef<HTMLDivElement | null>(null)

  const fetch = useCallback(async () => {
    setIsFetching(true)
    try {
      const res = await request.get<GameTrophy[]>(`games/${id}/trophies`)

      setTrophies(res)
    } catch (e) {
      setMessage((e as Error).message)
    } finally {
      setIsFetching(false)
    }
  }, [id, setMessage])

  const handleClose = () => {
    setContainerVisible(false)

    setTimeout(() => {
      onHide()
    }, 400)
  }

  useEffect(() => {
    if (id && visible) {
      setTimeout(() => {
        setContainerVisible(true)

        fetch()
      }, 100)
    }
  }, [id, visible, fetch])

  return (
    <div {...block().modifiers({ show: visible })}>
      <div ref={modalContainer} {...element('container'). modifiers({ show: containerVisible })}>
        <div {...element('header').class}>
          <button {...element('close').class} onClick={handleClose}>&times;</button>
        </div>
        {
          isFetching
            ? <Loading />
            : (
              <div {...element('list').class}>
                {trophies.map(v => <TrophyItem key={v.id} item={v} />)}
              </div>
            )
        }
      </div>
      <div {...element('mask').class} onClick={handleClose} />
    </div>
  )
}

export default TrophyList
