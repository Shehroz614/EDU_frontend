import axios from 'axios'
import routes from '@configs/api'
import { Lecture } from '@ugu/types'

/**
 * Add Course Lecture
 * @param course_id
 * @param version
 * @param sectionId
 * @param title
 * @param preview
 * @param duration
 */
const addCourseLecture = (
  course_id: string,
  version: number,
  sectionId: string,
  title: string,
  preview: boolean,
  duration: number
): Promise<Lecture> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE +
      course_id +
      '/' +
      version +
      '/sections/' +
      sectionId +
      '/lectures'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { title, preview, duration }

    axios
      .post(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default addCourseLecture
