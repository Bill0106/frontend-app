import { FC } from 'react'
import { GameConsole, GameConsoleColorMap, GameConsoleShortMap } from '@/app/games/constants'
import styled from '@emotion/styled'

const Label = styled.span<{ color: string }>`
  padding: 0 4px;
  line-height: 12px;
  font-size: 10px;
  font-weight: bolder;
  color: ${p => p.color};
  border: 1px solid ${p => p.color};
  border-radius: 4px;
`

const Console: FC<{ console: GameConsole }> = ({ console }) => (
  <Label color={GameConsoleColorMap.get(console) ?? ''}>
    {GameConsoleShortMap.get(console)}
  </Label>
)

export default Console
