import axios from 'axios'
import routes from '@configs/api'
import { CourseParent } from '@ugu/types'

/**
 * Create new course
 */
const createCourse = (): Promise<CourseParent> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

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

export default createCourse
