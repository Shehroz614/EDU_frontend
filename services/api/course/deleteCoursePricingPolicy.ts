import axios from 'axios'
import routes from '@configs/api'

const deleteCoursePricingPolicy = (
  course_id: string,
  version: number,
  policyId: string
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

    axios
      .delete(URL, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
export default deleteCoursePricingPolicy
