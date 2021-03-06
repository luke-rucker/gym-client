function msToHoursAndMinutes(ms) {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  const minutes = Math.ceil((ms / 1000 / 60) % 60)

  const hourLabel = hours === 1 ? 'hour' : 'hours'
  const minuteLabel = minutes === 1 ? 'minute' : 'minutes'

  return {
    [hourLabel]: hours,
    [minuteLabel]: minutes,
  }
}

export { msToHoursAndMinutes }
