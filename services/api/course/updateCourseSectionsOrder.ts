import axios from 'axios'
import routes from '@configs/api'

/**
 * Update Course sections order
 * @param course_id
 * @param version
 * @param sections
 */
const updateCourseSectionsOrder = (
  course_id: string,
  version: number,
  sections: string[]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/sections/'
    const data = { sections }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .put(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error updating Section Items: ' + err)
      })
  })
}

export default updateCourseSectionsOrder
