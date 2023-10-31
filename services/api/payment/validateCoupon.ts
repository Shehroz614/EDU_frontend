import axios from 'axios'
import routes from '@configs/api'
import { CouponType } from '@ugu/types'

/**
 * Checkout
 * @param coupon
 * @param items
 */
const validateCoupon = (coupon: string, items: any[]): Promise<CouponType> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.PAYMENTS + '/coupon'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    const data = { items, coupon }
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

export default validateCoupon
