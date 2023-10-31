import axios from 'axios'
import routes from '@configs/api'
import { LiveCourse } from '@ugu/types'

/**
 * Get live version of the course
 * @param course_id
 * @param withContent
 */
const getLiveCourse = (course_id: string | string[]): Promise<LiveCourse> => {
  return new Promise((resolve, reject) => {
    const URL = routes.COURSE + course_id + '/live'
    axios
      .get(URL)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default getLiveCourse
