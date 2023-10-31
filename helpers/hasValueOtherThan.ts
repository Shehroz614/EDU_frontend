/**
 * Has value other than
 * @param arr
 * @param givenValue
 */
const hasValueOtherThan = (arr: string | any[], givenValue: any) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== givenValue) {
      return true // Found a value other than the given value
    }
  }
  return false // No value other than the given value found
}
export default hasValueOtherThan
