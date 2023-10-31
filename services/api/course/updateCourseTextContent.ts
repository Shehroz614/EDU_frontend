import axios from 'axios'
import routes from '@configs/api'
import { Content } from '@ugu/types'

/**
 * Update Course Text content
 * @param course_id
 * @param version
 * @param contentId
 * @param content
 */
const updateCourseTextContent = (
  course_id: string,
  version: number,
  contentId: string,
  content: {}
): Promise<Content> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/text/' + contentId
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { lecture_content: content }

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

export default updateCourseTextContent
