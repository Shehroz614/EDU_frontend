import axios from 'axios'
import routes from '@configs/api'

/**
 * Get Gift Details
 * @param giftId
 */
const redeemGift = (giftId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenId = localStorage.getItem('tokenId')
      const URL = routes.GIFTING + '/' + giftId + '/redeem'
      const config = {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
      const data = {}

      axios
        .post(URL, data, config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
export default redeemGift
