import axios from 'axios'
import routes from '@configs/api'
import { Lecture } from '@ugu/types'

/**
 * Delete Course lecture content
 * @param course_id
 * @param version
 * @param sectionId
 * @param lectureId
 * @param contentId
 */
const deleteCourseLectureContent = (
  course_id: string,
  version: number,
  sectionId: string,
  lectureId: string,
  contentId: string
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
      lectureId +
      '/contents/' +
      contentId
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .delete(URL, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default deleteCourseLectureContent
