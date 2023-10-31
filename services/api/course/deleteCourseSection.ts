import axios from 'axios'
import routes from '@configs/api'
import { Section } from '@ugu/types'

/**
 * Delete course section
 * @param course_id
 * @param version
 * @param section_id
 */
const deleteCourseSection = (
  course_id: string,
  version: number,
  section_id: string
): Promise<Section> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/sections/' + section_id
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .delete(URL, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default deleteCourseSection
