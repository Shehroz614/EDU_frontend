import axios from 'axios'
import routes from '@configs/api'
import { Course } from '@type/course'

/**
 * Update course
 * @param courseId
 * @param updatedFields
 * @param version
 */
const updateCourse = (
  courseId: string,
  updatedFields: {},
  version: number
): Promise<Course | string> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + courseId + '/' + version
    const data = {
      updatedFields: updatedFields,
    }
    console.log('Data: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .patch(URL, data, config)
      .then((res) => {
        console.log('Updated course res: ', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error updating the course:' + err)
      })
  })
}

export default updateCourse
