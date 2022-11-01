import MEDIA_QUERIES, { COLUMN_LAYOUT } from '@/constants/mediaQueries'
import { GameTrophy } from '../models/gameTrophy'
import styled from '@emotion/styled'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import useMessage from '@/utils/useMessage'
import request from '@/utils/request'
import Loading from '@/components/Loading'
import TrophyItem from './TrophyItem'

interface TrophyListProps {
  id: number
  visible: boolean
  onHide: () => void
}

const Modal = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${p => p.show ? '100%' : 0};
  height: ${p => p.show ? '100%' : 0};
  z-index: 100;
  overflow: hidden;
  @media (max-width: ${MEDIA_QUERIES.TABLET_MAX}) {
    top: 52px;
  height: ${p => p.show ? 'calc(100% - 52px)' : 0};
  }
`

const Container = styled.div<{ show: boolean }>`
  position: relative;
  margin: 100px auto 0;
  padding: 16px 0;
  width: 80vw;
  height: 800px;
  border-radius: 4px;
  background: #393e49;
  overflow: hidden;
  box-sizing: border-box;
  transform: translateY(${p => p.show ? '0' : '200%'});
  transition: transform .3s ease-in-out;
  z-index: 2;
  @media (max-width: ${MEDIA_QUERIES.TABLET_MAX}) {
    margin: 0;
    width: 100%;
    height: 100%;
  }
`

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Head = styled.div`
  margin-bottom: 8px;
  padding: 0 16px;
  height: 20px;
  text-align: right;
`

const Close = styled.button`
  padding: 0;
  line-height: 20px;
  font-size: 32px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
`

const Trophies = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 16px;
  height: calc(100% - 28px);
  overflow: auto;
  z-index: 100;
  @media (max-width: ${COLUMN_LAYOUT.COLUMN_5}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${COLUMN_LAYOUT.COLUMN_3}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${MEDIA_QUERIES.MOBILE}) {
    grid-template-columns: 1fr;
  }
`

const TrophyList: FC<TrophyListProps> = ({ id, visible, onHide }) => {
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
    <Modal show={visible}>
      <Container ref={modalContainer} show={containerVisible}>
        <Head>
          <Close onClick={handleClose}>&times;</Close>
        </Head>
        {
          isFetching
            ? <Loading />
            : (
                <Trophies>
                  {trophies.map(v => <TrophyItem key={v.id} item={v} />)}
                </Trophies>
              )
        }
      </Container>
      <Mask onClick={handleClose} />
    </Modal>
  )
}

export default TrophyList
