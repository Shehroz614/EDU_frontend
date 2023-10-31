import axios, { AxiosResponse } from 'axios'
import { LectureProgress } from '@type/course'
import routes from '@configs/api'

/**
 * Update course lecture progress
 * @param courseId
 * @param lectureProgress
 */
const updateCourseLectureProgress = (
  courseId: string | string[],
  lectureProgress: LectureProgress
): Promise<LectureProgress> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + courseId + '/lecture-progress'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = {
      lecture_progress: lectureProgress,
    }
    axios
      .put(URL, data, config)
      .then((res: AxiosResponse<LectureProgress>) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export default updateCourseLectureProgress
