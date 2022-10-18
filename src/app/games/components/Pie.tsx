import * as echarts from 'echarts/core'
import { PieSeriesOption } from 'echarts/charts'
import { FC, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { TitleComponentOption, TooltipComponentOption } from 'echarts/components'
import useResize from '@/utils/useResize'

type Options = echarts.ComposeOption<PieSeriesOption | TitleComponentOption | TooltipComponentOption>

const Container = styled.div`
  height: 320px;
`

const Pie: FC<{ title: string; data: { value: number; name: string }[] }> = ({ title, data }) => {
  const { size } = useResize()
  const [chart, setChart] = useState<echarts.ECharts | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (size && chart) {
      chart.resize()
    }
  }, [chart, size])

  useEffect(() => {
    if (containerRef.current) {
      const instance = echarts.init(containerRef.current, 'dark')

      instance.setOption<Options>({
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

      setChart(instance)
    }
  }, [title, data])

  return <Container ref={containerRef} />
}

export default Pie
