import React from 'react'
import { msToHoursAndMinutes } from '../util'

function SessionDuration({ session }) {
  const durationInMs = new Date(session.finish) - new Date(session.start)
  const duration = msToHoursAndMinutes(durationInMs)

  const timeComponents = []

  Object.keys(duration).forEach(interval => {
    if (!duration[interval]) {
      return
    }

    timeComponents.push(
      <span key={interval}>
        {duration[interval]} {interval}{' '}
      </span>
    )
  })

  return <>{timeComponents}</>
}

export default SessionDuration
