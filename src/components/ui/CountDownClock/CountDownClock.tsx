import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function CountDownClock(props: any) {
  const { time, onComplete } = props
  const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWidth: 6,
    duration: time,
  }
  const hourSeconds = 3600
  const minuteSeconds = 60

  const getTimeMinutes = (timeInSeconds: any) => {
    const hours = Math.floor(timeInSeconds / hourSeconds)
    const minutes = Math.floor((timeInSeconds % hourSeconds) / minuteSeconds)
    const seconds = Math.floor(timeInSeconds % minuteSeconds)

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }
  const renderTime = (time: any) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
      </div>
    )
  }
  return (
    <CountdownCircleTimer {...timerProps} colors="#EF798A" onComplete={onComplete}>
      {({ elapsedTime, color }) => (
        <span style={{ color }}>{renderTime(getTimeMinutes(time - elapsedTime))}</span>
      )}
    </CountdownCircleTimer>
  )
}

export default CountDownClock
