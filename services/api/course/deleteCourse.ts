import axios from 'axios'
import routes from '@configs/api'

/**
 * Delete Course coupon
 * @param course_id
 */
const deleteCourse = (course_id: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .delete(URL, config)
      .then(() => {
        resolve(true)
      })
      .catch((err) => {
        console.log('Error adding coupon:', err)
        reject(err)
      })
  })
}

export default deleteCourse
