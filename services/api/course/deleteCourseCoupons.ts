import axios from 'axios'
import routes from '@configs/api'
import { CouponType } from '@ugu/types'

/**
 * Delete Course coupon
 * @param course_id
 * @param version
 * @param coupon_id
 */
const deleteCourseCoupons = (
  course_id: string | string[],
  version: number,
  coupon_id: string
): Promise<CouponType[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/coupons/' + coupon_id
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

export default deleteCourseCoupons
