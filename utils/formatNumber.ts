//example: 1234567.89 will be formated to 1,234,567.89
export const formatNumber = (num: number): string => {
  const formatted = num.toLocaleString('en-US')
  console.log('Formatted number:', formatted)
  return formatted
}
