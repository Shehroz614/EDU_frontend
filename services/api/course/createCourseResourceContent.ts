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
  duration: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/resources'
    const data = { uploadId, parts, contentName, duration, fileName }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .post(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while creating Resource content: ' + err)
      })
  })
}

export default createCourseVideoContent
