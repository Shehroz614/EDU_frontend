import axios from 'axios'
import routes from '@configs/api'

/**
 * Update Course presentational video
 * @param course_id
 * @param version
 * @param contentName
 * @param file
 * @param duration
 */
const updateCoursePresentationalVideo = (
  course_id: string,
  version: number,
  contentName: string,
  file: string,
  duration: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/presentational-video'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { contentName, file, duration }

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

export default updateCoursePresentationalVideo
