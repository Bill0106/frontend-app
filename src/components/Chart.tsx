import * as echarts from 'echarts/core'
import { BarSeriesOption, GaugeSeriesOption, PieSeriesOption } from 'echarts/charts'
import { TitleComponentOption, TooltipComponentOption } from 'echarts/components'
import { FC, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import useResize from '@/utils/useResize'

export type ChartOptions = echarts.ComposeOption<
  BarSeriesOption | PieSeriesOption | GaugeSeriesOption | TitleComponentOption | TooltipComponentOption
>

const Container = styled.div`
  height: 320px;
`

const Chart: FC<{ options: ChartOptions }> = ({ options }) => {
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

      instance.setOption(options)

      setChart(instance)
    }
  }, [options])

  return <Container ref={containerRef} />
}

export default Chart
