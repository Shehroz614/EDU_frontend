import axios, { CancelTokenSource } from 'axios'
import routes from '@configs/api'
import { Resource } from '@ugu/types'

/**
 * Create Course lecture resource
 * @param course_id
 * @param version
 * @param fileName
 * @param resourceName
 * @param cancelToken
 */
const createCourseLectureResource = (
  course_id: string,
  version: number,
  fileName: string,
  resourceName: string,
  cancelToken?: CancelTokenSource
): Promise<Resource> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/resources'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      cancelToken: cancelToken && cancelToken.token,
    }
    const data = { fileName, resourceName }
    axios
      .post(URL, data, config)
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

export default createCourseLectureResource
