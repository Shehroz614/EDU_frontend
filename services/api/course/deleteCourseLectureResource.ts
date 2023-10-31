import axios from 'axios'
import routes from '@configs/api'

/**
 * Delete Course lecture resources
 * @param course_id
 * @param version
 * @param resourceId
 */
const deleteCourseLectureResource = (
  course_id: string,
  version: number,
  resourceId: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/resources/' + resourceId
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .delete(URL, config)
      .then(() => {
        console.log('Resource has been deleted!')
        resolve()
      })
      .catch((err) => {
        reject('Error occured while deleting Lecture content: ' + err)
      })
  })
}
export default deleteCourseLectureResource
