import { FC } from 'react'

const IndexCard: FC<{ children: JSX.Element }> = ({ children }) => <section className="games__card">{children}</section>

export default IndexCard
