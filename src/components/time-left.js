import React from 'react'

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
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)

      const hourLabel = hours === 1 ? 'hour' : 'hours'
      const minuteLabel = minutes === 1 ? 'minute' : 'minutes'

      return {
        [hourLabel]: hours,
        [minuteLabel]: minutes,
      }
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
