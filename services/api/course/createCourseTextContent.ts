import axios from 'axios'
import routes from '@configs/api'
import { Content } from '@ugu/types'

/**
 * Create Course text content
 * @param course_id
 * @param version
 * @param content
 */
const createCourseTextContent = (
  course_id: string,
  version: number,
  content: {}
): Promise<Content> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/text'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { lecture_content: content }

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

export default createCourseTextContent
