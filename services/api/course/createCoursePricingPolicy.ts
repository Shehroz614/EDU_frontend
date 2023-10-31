import axios from 'axios'
import routes from '@configs/api'

const createCoursePricingPolicy = (
  course_id: string,
  version: number,
  pricingPolicy: {
    type: 'smartPrice' | 'discount' | 'override'
    code: string
    valueType: 'fixed' | 'percentage'
    value: string
    initialValue: string
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
    const URL = routes.COURSE + course_id + '/' + version + '/pricing-policies'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { ...pricingPolicy }

    axios
      .post(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject('Error linking lecture with content occurred: ' + err)
      })
  })
}
export default createCoursePricingPolicy
