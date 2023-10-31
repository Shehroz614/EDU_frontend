import { transform, isEqual, isObject, isArray } from 'lodash'

/**
 * Deep diff between two object, using lodash
 * @param  {Object} newObject Object compared
 * @param  {Object} oldObject   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function difference(newObject: any, oldObject: any): any {
  return transform(newObject, (result, value, key) => {
    if (!isEqual(value, oldObject[key])) {
      if (isObject(value) && isObject(oldObject[key])) {
        if (isArray(value) && isArray(oldObject[key])) {
          if (value !== oldObject[key]) {
            result[key] = value
          }
        } else {
          result[key] = difference(value, oldObject[key])
        }
      } else {
        result[key] = value
      }
    }
  })
}
