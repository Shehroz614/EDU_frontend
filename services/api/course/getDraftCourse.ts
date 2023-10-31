import axios from 'axios'
import routes from '@configs/api'
import { Course } from '@ugu/types'

/**
 * Get draft version of the course
 * @param course_id
 */
const getDraftCourse = (course_id: string | string[]): Promise<Course> => {
  return new Promise((resolve, reject) => {
    const URL = routes.COURSE + course_id + '/draft'
    axios
      .get(URL)
      .then((res) => {
        console.log('Course Object Res from the backend: ', res)
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default getDraftCourse
