import axios from 'axios'
import routes from '@configs/api'

/**
 * Get Order
 * @param orderId
 */
const getOrder = (orderId: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenId = localStorage.getItem('tokenId')
      const URL = routes.ORDERS + '/' + orderId
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
          console.log(err)
          reject(err)
        })
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}
export default getOrder
