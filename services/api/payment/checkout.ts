import axios from 'axios'
import routes from '@configs/api'

/**
 * Checkout
 * @param items
 * @param discounts
 * @param itemType
 * @param orderId
 * @param guestCheckoutDetails
 */
const checkout = (
  items: string[],
  discounts: string[],
  itemType: string,
  orderId: string,
  guestCheckoutDetails?: {
    first_name: string
    last_name: string
    email: string
  }
): Promise<
  | {
      status: 201
      message: string
      stack: Object
    }
  | { client_secret: string }
> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.CHECKOUT
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    const data = {
      items,
      discounts,
      itemType,
      currency: 'usd',
      orderId,
      guestCheckoutDetails,
    }
    axios
      .post(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error adding coupon:', err)
        reject(err)
      })
  })
}

export default checkout
