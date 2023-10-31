import axios from 'axios'
import routes from '@configs/api'
import { Course } from '@ugu/types'

// TODO - Refactor according to new api specs
/**
 * Publish Course - Send for review
 * @param course
 * @param reviewNote
 * @param contactEmail
 */
const publishCourse = (
  course_id: string,
  version: number,
  reviewNote: string,
  contactEmail: string
): Promise<Course> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/publish'
    const data = {
      reviewNote,
      contactEmail,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(URL, data, config)
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

export default publishCourse
