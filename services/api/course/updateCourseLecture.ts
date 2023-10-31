import axios from 'axios'
import routes from '@configs/api'
import { Lecture } from '@ugu/types'

/**
 * Update course lecture
 * @param course_id
 * @param version
 * @param sectionId
 * @param lectureId
 * @param title
 * @param preview
 */
const updateCourseLecture = (
  course_id: string,
  version: number,
  sectionId: string,
  lectureId: string,
  title: string,
  preview: boolean
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
      '/lectures/' +
      lectureId
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { title, preview }

    axios
      .patch(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default updateCourseLecture
