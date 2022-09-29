import pages from '@/constants/pages'
import {
  Container,
  Content,
  Item,
  Loading,
  Mask,
  Page,
  Sections,
  Text,
  Title
} from './style'
import useViewData from './useViewData'

const Home = () => {
  const { background, show, handleEvent, handleTitleMouseEnter } = useViewData()

  return (
    <Page>
      <Container background={background} show={show}>
        <Content>
          <Title onMouseEnter={handleTitleMouseEnter}>{'Bill\'s Hobby'}</Title>
          <Sections>
            {pages.slice(1).map(v => (
              <div key={v.title}>
                <Item to={v.path} onMouseEnter={handleEvent}>
                  {v.title}
                </Item>
              </div>
            ))}
          </Sections>
        </Content>
        <Mask />
      </Container>
      <Loading show={!show}>
        <Text>Loading...</Text>
      </Loading>
    </Page>
  )
}

export default Home
