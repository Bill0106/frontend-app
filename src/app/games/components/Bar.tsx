import * as echarts from 'echarts/core'
import { BarSeriesOption } from 'echarts/charts'
import { TitleComponentOption, TooltipComponentOption } from 'echarts/components'
import { FC, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import useResize from '@/utils/useResize'
import { GameStats } from '@/app/games/models/gameStats'
import dayjs from 'dayjs'

type Options = echarts.ComposeOption<BarSeriesOption | TitleComponentOption | TooltipComponentOption>

const Container = styled.div`
  height: 320px;
`

const Bar: FC<{ years: GameStats['years'] }> = ({ years }) => {
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

      const month = Object.values(years)
        .map(v => v.month)
        .reduce<number[][]>((res, item) => {
          item.forEach((v, i) => {
            res[i] = [...(res[i] ?? []), v]
          })

          return res
        }, [])
        .map<BarSeriesOption>((v, i) => ({
          name: dayjs().month(i).format('MMM'),
          type: 'bar',
          barWidth: 5,
          stack: 'Total',
          emphasis: {
            focus: 'series'
          },
          data: v
        }))

      instance.setOption<Options>({
        title: { text: 'Games bought per year' },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          left: '16px',
          right: '16px',
          bottom: '16px',
          containLabel: true
        },
        backgroundColor: '',
        xAxis: [{
            type: 'category',
            data: Object.keys(years)
        }],
        yAxis: [{ type: 'value' }],
        series: [
          {
            name: 'Total',
            type: 'bar',
            data: Object.values(years).map(v => v.count),
            emphasis: {
              focus: 'series'
            }
          },
          ...month
        ]
      })

      setChart(instance)
    }
  }, [years])

  return <Container ref={containerRef} />
}

export default Bar
