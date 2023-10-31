import axios from 'axios'
import routes from '@configs/api'

/**
 * Create Course video content
 * @param course_id
 * @param version
 * @param parts
 * @param contentName
 * @param fileName
 * @param uploadId
 * @param duration
 */
const createCourseVideoContent = (
  course_id: string,
  version: number,
  parts: {
    etag: any
    partNum: number
  }[],
  contentName: string,
  fileName: string,
  uploadId: string,
  duration: number,
  abortController: AbortController
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/video'
    const data = { uploadId, parts, contentName, duration, fileName }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      signal: abortController.signal,
    }

    axios
      .post(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while creating Video content: ' + err)
      })
  })
}

export default createCourseVideoContent
