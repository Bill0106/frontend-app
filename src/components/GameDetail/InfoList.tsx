import { FC } from 'react'
import { Infos } from './style'

const SLASH = '|'

const InfoList: FC<{ infos: string[] }> = ({ infos }) => {
  const list = infos
    .reduce<string[]>((res, item) => [...res, SLASH, item], [])
    .slice(1)

  const renderItem = (v: string, i: number) => v === SLASH
    ? <i key={i}>{v}</i>
    : <span key={i}>{v}</span>

  return <Infos>{list.map(renderItem)}</Infos>
}

export default InfoList
