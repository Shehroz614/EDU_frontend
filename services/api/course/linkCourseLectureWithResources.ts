import axios, { CancelTokenSource } from 'axios'
import routes from '@configs/api'

/**
 * Link Resource with course lecture
 * @param course_id
 * @param version
 * @param sectionId
 * @param lectureId
 * @param resourceId
 * @param cancelToken
 */
const linkCourseLectureWithResources = (
  course_id: string,
  version: number,
  sectionId: string,
  lectureId: string,
  resourceId: string,
  cancelToken?: CancelTokenSource
): Promise<any> => {
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
      '/resources/' +
      resourceId +
      '/link'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      cancelToken: cancelToken && cancelToken.token,
    }

    axios
      .post(URL, {}, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('axios request cancelled', err.message, URL)
          reject(err)
        } else {
          console.log('Error creating section: ', err)
          reject(err)
        }
      })
  })
}

export default linkCourseLectureWithResources
