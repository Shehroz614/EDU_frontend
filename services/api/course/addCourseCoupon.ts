import axios from 'axios'
import routes from '@configs/api'
import { CouponType } from '@ugu/types'

/**
 * Add course's coupon
 * @param course_id
 * @param version
 * @param coupon
 */
const addCourseCoupon = (
  course_id: string | string[],
  version: number,
  coupon: CouponType
): Promise<CouponType[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/coupons'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { coupon }
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

export default addCourseCoupon
