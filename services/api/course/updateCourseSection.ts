import axios from 'axios'
import routes from '@configs/api'
import { Section } from '@ugu/types'

/**
 * Update Course section
 * @param course_id
 * @param version
 * @param section_id
 * @param section
 */
const updateCourseSection = (
  course_id: string,
  version: number,
  section_id: string,
  section: {}
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
      .patch(URL, section, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default updateCourseSection
