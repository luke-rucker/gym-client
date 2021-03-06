import React from 'react'
import { msToHoursAndMinutes } from '../util'

function TimeLeft({ start, duration }) {
  const [timeLeft, setTimeLeft] = React.useState(
    calculateTimeLeft(start, duration)
  )

  React.useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft(calculateTimeLeft(start, duration)),
      1000 * 60
    )
    return () => clearInterval(timer)
  }, [start, duration])

  function calculateTimeLeft(start, duration) {
    const finish = start.getTime() + duration
    const difference = finish - Date.now()

    if (difference > 0) {
      return msToHoursAndMinutes(difference)
    }
    return {}
  }

  const timerComponents = []

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    )
  })

  return timerComponents.length > 0 ? (
    <>{timerComponents}</>
  ) : (
    <span>Times up!</span>
  )
}

export default TimeLeft
