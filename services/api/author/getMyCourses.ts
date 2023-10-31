import axios from 'axios'
import routes from '@configs/api'
import { CourseProgress, CourseVersion } from '@ugu/types'

const getMyCourses = (): Promise<{
  courses: CourseVersion[]
  progress: CourseProgress[]
}> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.MY_COURSES
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(URL, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default getMyCourses
