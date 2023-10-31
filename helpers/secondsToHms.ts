export const secondsToHms = (seconds: number) => {
  var h = Math.floor(seconds / 3600)
  var m = Math.floor((seconds % 3600) / 60)
  var s = Math.floor((seconds % 3600) % 60)
  var hDisplay = h > 0 ? h + (m > 0 || s > 0 ? ':' : '') : ''
  var mDisplay =
    m > 0 ? (m > 9 ? m + (s > 0 ? ':' : ':') : '0' + m + ':') : '00:'
  var sDisplay = s > 0 ? (s > 9 ? s : '0' + s) : '00'
  return hDisplay + mDisplay + sDisplay
}

export const secondsToHours = (seconds: number) => {
  var hours = Math.ceil(seconds / 3600)
  return hours
}
