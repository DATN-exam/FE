import { cn } from '@/lib/utils'
import { HorizontalBarChartProps } from '@/types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const chartOptions = (title: string) => ({
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 3,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: title,
    },
  },
})

const HorizontalBarChart = (props: HorizontalBarChartProps) => {
  const {
    layoutClassName,
    title,
    dataLabel,
    dataset,
    labels,
    chartBackgroundColor,
    chartBorderColor,
  } = props

  const data = {
    labels,
    datasets: [
      {
        label: dataLabel,
        data: dataset,
        borderColor: chartBackgroundColor || 'rgb(53, 162, 235)',
        backgroundColor: chartBorderColor || 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className={cn(layoutClassName)}>
      <Bar options={chartOptions(title)} data={data} />
    </div>
  )
}

export default HorizontalBarChart
