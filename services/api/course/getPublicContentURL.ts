import axios from 'axios'
import routes from '@configs/api'

/**
 * Get public content uploader url - AWS
 * @param course_id
 * @param version
 * @param file
 */
const getPublicContentURL = (
  course_id: string,
  version: number,
  file: string
): Promise<{
  data: any
  url: string
  file: string
}> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/public-file-url'
    const data = { file }
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

export default getPublicContentURL
