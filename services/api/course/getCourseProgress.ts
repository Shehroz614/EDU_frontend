import axios, { AxiosResponse } from 'axios'
import { CourseProgress } from '@type/course'
import routes from '@configs/api'

/**
 * Get Course progress
 * @param courseId
 */
const getCourseProgress = (
  courseId: string | string[]
): Promise<CourseProgress> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + courseId + '/progress'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(URL, config)
      .then((res: AxiosResponse<CourseProgress>) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export default getCourseProgress
