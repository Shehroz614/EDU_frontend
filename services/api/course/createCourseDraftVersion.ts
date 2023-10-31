import axios from 'axios'
import routes from '@configs/api'
import { Course } from '@ugu/types'

/**
 * Create course's new draft version
 * @param course_id
 */
const createCourseDraftVersion = (
  course_id: string | string[]
): Promise<Course> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/draft'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(URL, {}, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default createCourseDraftVersion
