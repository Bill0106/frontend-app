import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import { UniversalTransition, LabelLayout } from 'echarts/features'
import App from './app'

const container = document.getElementById('app')

if (container) {
  const root = ReactDOM.createRoot(container)

  echarts.use([
    PieChart,
    TitleComponent,
    TooltipComponent,
    UniversalTransition,
    LabelLayout,
    SVGRenderer
  ])

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
