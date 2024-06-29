import { cn } from '@/lib/utils'
import { LineChartProps } from '@/types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register necessary components for the Line Chart
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

// Define chart options for the Line Chart
const chartOptions = (title: string) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: title,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Tháng',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Số lượng',
      },
      min: 0,
    },
  },
})

// Define the LineChart component
const LineChart = (props: LineChartProps) => {
  const {
    layoutClassName,
    title,
    dataLabel,
    dataset,
    labels,
    chartBackgroundColor,
    chartBorderColor,
  } = props

  // Define data for the Line Chart
  const data = {
    labels,
    datasets: [
      {
        label: dataLabel,
        data: dataset,
        borderColor: chartBorderColor || 'rgb(75, 192, 192)',
        backgroundColor: chartBackgroundColor || 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  }

  return (
    <div className={cn(layoutClassName)}>
      <Line options={chartOptions(title)} data={data} />
    </div>
  )
}

export default LineChart
