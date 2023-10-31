import axios from 'axios'
import routes from '@configs/api'
import { ShortCourse } from '@ugu/types'

/**
 * Add to users wishlist
 * @param courseId
 */
const addUserWishlist = (courseId: string): Promise<ShortCourse[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.USER_WISHLIST
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { courseId }
    axios
      .put(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error adding coupon:', err)
        reject(err)
      })
  })
}

export default addUserWishlist
