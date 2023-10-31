import axios from 'axios'
import routes from '@configs/api'
import { SimpleSection } from '@ugu/types'

/**
 * Update course lectures order
 * @param course_id
 * @param version
 * @param sections
 */
const updateCourseLecturesOrder = (
  course_id: string,
  version: number,
  sections: SimpleSection[]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/sections/all/lectures'
    const data = { sections }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .put(URL, data, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject('Error updating Section Items: ' + err)
      })
  })
}

export default updateCourseLecturesOrder
