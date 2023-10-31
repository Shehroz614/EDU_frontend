import axios from 'axios'
import routes from '@configs/api'

const updateCoursePricingPolicy = (
  course_id: string,
  version: number,
  policyId: string,
  pricingPolicy: {
    type: 'smartPrice' | 'discount' | 'override'
    code: string
    valueType: 'fixed' | 'percentage'
    value: string
    isAutoApplicable: boolean
    isActive: boolean
    allowCourseDiscounts: boolean
    allowDiscountsForGifts: boolean
    showOriginalPrice: boolean
    maxUsage: string
    startDate: Date | null
    expiryDate: Date | null
  }
) => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE +
      course_id +
      '/' +
      version +
      '/pricing-policies/' +
      policyId
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { ...pricingPolicy }

    axios
      .patch(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
export default updateCoursePricingPolicy
