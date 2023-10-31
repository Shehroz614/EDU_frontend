import axios from 'axios'
import routes from '@configs/api'
import { ShortCourse } from '@ugu/types'

/**
 * Update users wishlist with new items
 * @param courses
 */
const updateUserWishlist = (courses: string[]): Promise<ShortCourse[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.USER_WISHLIST
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { courses }
    axios
      .post(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error adding coupon:', err)
        reject(err)
      })
  })
}

export default updateUserWishlist
