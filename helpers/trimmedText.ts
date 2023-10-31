const trimmedText = (text: string, length: number): String => {
  return text.substring(0, length) + (text.length > length ? '...' : '')
}
export default trimmedText
