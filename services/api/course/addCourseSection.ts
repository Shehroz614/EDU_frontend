import axios from 'axios'
import routes from '@configs/api'
import { Section } from '@ugu/types'

/**
 * Add course section
 * @param course_id
 * @param version
 * @param section
 */
const addCourseSection = (
  course_id: string,
  version: number,
  section: {
    title: string
    description: string
  }
): Promise<Section> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/sections'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(URL, section, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default addCourseSection
