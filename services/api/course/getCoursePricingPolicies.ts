import axios from 'axios'
import routes from '@configs/api'

/**
 * Get Course Pricing Policies
 * @param course_id
 * @param version
 */
const getCoursePricingPolicies = (
  course_id: string | string[],
  version: number
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.COURSE + course_id + '/' + version + '/pricing-policies'
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

export default getCoursePricingPolicies
