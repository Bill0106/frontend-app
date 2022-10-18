import * as echarts from 'echarts/core'
import { PieSeriesOption } from 'echarts/charts'
import { FC, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { TitleComponentOption, TooltipComponentOption } from 'echarts/components'

type Options = echarts.ComposeOption<PieSeriesOption | TitleComponentOption | TooltipComponentOption>

const Container = styled.div`
  height: 320px;
`

const Pie: FC<{ title: string; data: { value: number; name: string }[] }> = ({ title, data }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, 'dark')

      chart.setOption<Options>({
        title: {
          text: title
        },
        tooltip: {
          trigger: 'item'
        },
        backgroundColor: '',
        series: {
          name: title,
          type: 'pie',
          radius: '70%',
          data
        }
      })
    }
  }, [title, data])

  return <Container ref={containerRef} />
}

export default Pie
