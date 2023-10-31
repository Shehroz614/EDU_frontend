import axios, { AxiosResponse } from 'axios'
import { Resource } from '@type/course'
import routes from '@configs/api'

/**
 * Get Course resource
 * @param course_id
 * @param version
 * @param resource_id
 */
const getCourseResource = (
  course_id: string | string[],
  version: number,
  resource_id: string
): Promise<Resource> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/resources/' + resource_id
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(URL, config)
      .then((res: AxiosResponse<Resource>) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export default getCourseResource
