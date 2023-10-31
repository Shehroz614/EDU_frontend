import axios from 'axios'
import routes from '@configs/api'

/**
 * Update Course presentational image
 * @param course_id
 * @param version
 * @param file
 */
const updateCoursePresentationalImage = (
  course_id: string,
  version: number,
  file: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/presentational-photo'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { file }

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

export default updateCoursePresentationalImage
