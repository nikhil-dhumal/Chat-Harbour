const formatTime = (isoString) => {
  const date = new Date(isoString)
  const options = { hour: "numeric", minute: "numeric", hour12: true }
  
  return new Intl.DateTimeFormat("en-US", options).format(date)
}

export default formatTime