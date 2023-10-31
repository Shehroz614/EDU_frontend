import axios from 'axios'
import routes from '@configs/api'

/**
 * Update Course Text content
 * @param course_id
 * @param version
 * @param blob
 * @param progressEvent
 */
const addCourseLectureContentMedia = (
  course_id: string,
  version: number,
  blob: Blob,
  progressEvent: (progress: any) => void = () => {}
): Promise<{ mediaURL: string }> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/media'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progress) => progressEvent(progress),
    }

    const formData = new FormData()
    formData.append('media', blob)

    axios
      .post(URL, formData, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default addCourseLectureContentMedia
