import { FC } from 'react'
import { Infos } from './style'

const SLASH = '|'

const InfoItem: FC<{ text: string }> = ({ text }) => {
  if (text === SLASH) {
    return <i>{text}</i>
  }

  return <span>{text}</span>
}

const InfoList: FC<{ infos: string[] }> = ({ infos }) => {
  const list = infos
    .reduce<string[]>((res, item) => [...res, SLASH, item], [])
    .slice(1)

  return <Infos>{list.map((v, i) => <InfoItem key={i} text={v} />)}</Infos>
}

export default InfoList
