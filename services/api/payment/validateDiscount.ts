import axios from 'axios'
import routes from '@configs/api'

/**
 * Checkout
 * @param code
 * @param items
 * @param isGiftOrder
 */
const validateDiscount = (
  code: string,
  items: any[],
  isGiftOrder = false
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.PAYMENTS + '/discount?isGiftOrder=' + isGiftOrder
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    const data = { items, code }
    axios
      .post(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export default validateDiscount
