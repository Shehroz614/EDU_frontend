import axios from 'axios'
import routes from '@configs/api'

/**
 * Get public content uploader url - AWS
 * @param course_id
 * @param version
 * @param file
 */
const getResourceURL = (
  course_id: string,
  version: number,
  parts: number,
  file: string
): Promise<{ file: string; uploadId: string; urls: string[] }> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/resource-upload-url'
    const data = { parts, file }
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
        console.log('err getting uploader URL', err)
        reject(err)
      })
  })
}

export default getResourceURL
