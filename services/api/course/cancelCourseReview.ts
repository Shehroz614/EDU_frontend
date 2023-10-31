import axios from 'axios'
import routes from '@configs/api'
import { Course } from '@ugu/types'

// TODO - Refactor according to new api specs
/**
 * Publish Course - Send for review * @param course_id
 * @param version
 * @param reviewId
 */
const cancelCourseReview = (
  course_id: string,
  version: number
  //reviewId: string
): Promise<Course> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/review-record'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .delete(URL, config)
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

export default cancelCourseReview
