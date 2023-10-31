import axios, { AxiosResponse } from 'axios'
import { CourseProgress } from '@type/course'
import routes from '@configs/api'

/**
 * Update Course Progress
 * @param courseId
 * @param lastLectureId
 */
const updateCourseProgress = (
  courseId: string | string[],
  lastLectureId: string
): Promise<CourseProgress> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + courseId + '/progress'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = {
      lastLectureId: lastLectureId,
    }
    axios
      .put(URL, data, config)
      .then((res: AxiosResponse<CourseProgress>) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export default updateCourseProgress
