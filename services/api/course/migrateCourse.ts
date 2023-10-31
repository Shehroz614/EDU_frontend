import axios from 'axios'
import routes from '@configs/api'
import { CourseParent } from '@ugu/types'

/**
 * Migrate course to new architecture
 * @param course_id
 */
const migrateCourse = (course_id: string | string[]): Promise<CourseParent> => {
  const tokenId = localStorage.getItem('tokenId')
  const URL = routes.COURSE + course_id + '/migrate'
  const config = {
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  }
  return new Promise((resolve, reject) => {
    axios
      .post(URL, {}, config)
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

export default migrateCourse
