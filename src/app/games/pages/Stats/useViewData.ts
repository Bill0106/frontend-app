import useDocumentTitle from '@/utils/useDocumentTitle'
import useMessage from '@/utils/useMessage'
import { useCallback, useEffect, useState } from 'react'
import { GameStats } from '@/app/games/models/gameStats'
import { ChartOptions } from '@/components/Chart'
import request from '@/utils/request'
import { BarSeriesOption } from 'echarts/charts'
import dayjs from 'dayjs'
import { TitleComponentOption } from 'echarts/components'

const useViewData = () => {
  const { setTitle } = useDocumentTitle()
  const { setMessage } = useMessage()

  const [stats, setStats] = useState<GameStats | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const chartTitleStyle: TitleComponentOption['textStyle'] = {
    color: 'rgba(229, 224, 216, 0.45)',
    fontWeight: 'normal'
  }

  const pies: ChartOptions[] = [
    { title: 'Consoles', data: stats?.consoles ?? [] },
    { title: 'Genres', data: stats?.genres ?? [] },
    { title: 'Rates', data: stats?.rates ?? [] }
  ].map(v => ({
    title: { text: v.title, textStyle: chartTitleStyle },
    tooltip: { trigger: 'item' },
    backgroundColor: '',
    series: {
      name: v.title,
      type: 'pie',
      radius: '70%',
      center: ['50%', '55%'],
      label: { show: false },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data: v.data
    }
  }))

  const month = Object.values(stats?.years ?? {})
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
      emphasis: { focus: 'series' },
      data: v
    }))

  const yearsOptions: ChartOptions = {
    title: { text: 'Games bought per year', textStyle: chartTitleStyle },
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
      data: Object.keys(stats?.years ?? {})
    }],
    yAxis: [{ type: 'value' }],
    series: [
      {
        name: 'Total',
        type: 'bar',
        data: Object.values(stats?.years ?? {}).map(v => v.count),
        emphasis: {
          focus: 'series'
        }
      },
      ...month
    ]
  }

  const trophyOptions: ChartOptions = {
    title: { text: 'Earned Trophies', textStyle: chartTitleStyle },
    backgroundColor: '',
    tooltip: {
      formatter: `Total: ${stats?.totalTrophies} <br /> Earned: ${stats?.earnedTrophies}`
    },
    series: [{
      name: 'Earned Trophies',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}%'
      },
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '70%'],
      radius: '100%',
      data: [
        {
          value: stats? Math.round((stats.earnedTrophies / stats.totalTrophies) * 100) : 0
        }
      ]
    }]
  }

  const fetch = useCallback(async () => {
    setIsFetching(true)
    try {
      const res = await request.get<GameStats>('stats/game')

      setStats(res)
    } catch (e) {
      setMessage((e as Error).message)
    } finally {
      setIsFetching(false)
    }
  }, [setMessage])

  useEffect(() => {
    setTitle('Games')
  }, [setTitle])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { stats, pies, yearsOptions, trophyOptions, isFetching }
}

export default useViewData
