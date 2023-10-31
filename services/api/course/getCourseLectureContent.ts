import axios from 'axios'
import routes from '@configs/api'
import { Content } from '@ugu/types'

/**
 * Get Course lecture content
 * @param course_id
 * @param version
 * @param sectionId
 * @param lectureId
 * @param contentId
 * @param isAuthor
 * @param fetchMultiRes
 */
const getCourseLectureContent = (
  course_id: string | string[],
  version: number,
  sectionId: string,
  lectureId: string,
  contentId: string,
  isAuthor = false,
  fetchMultiRes = false
): Promise<Content> => {
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
      contentId +
      '?isAuthor=' +
      isAuthor +
      '&fetchMultiRes=' +
      fetchMultiRes
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
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default getCourseLectureContent
