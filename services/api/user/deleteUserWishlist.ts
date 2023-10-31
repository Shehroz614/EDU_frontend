import axios from 'axios'
import routes from '@configs/api'
import { ShortCourse } from '@ugu/types'

const deleteUserWishlist = (courseId: string): Promise<ShortCourse[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.USER_WISHLIST + '/' + courseId
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
        console.log('Error adding coupon:', err)
        reject(err)
      })
  })
}

export default deleteUserWishlist
