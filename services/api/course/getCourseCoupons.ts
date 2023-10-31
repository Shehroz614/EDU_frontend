import axios from 'axios'
import routes from '@configs/api'
import { CouponType } from '@ugu/types'

/**
 * Get Course coupons
 * @param course_id
 * @param version
 */
const getCourseCoupons = (
  course_id: string | string[],
  version: number
): Promise<CouponType[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/coupons'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(URL, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching coupons:', err)
        reject(err)
      })
  })
}

export default getCourseCoupons
