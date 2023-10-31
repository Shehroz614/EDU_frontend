export const isNumber = (str: string) => {
  return !isNaN(parseFloat(str)) && isFinite(Number(str))
}
