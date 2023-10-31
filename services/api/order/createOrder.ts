import axios from 'axios'
import routes from '@configs/api'

/**
 * Create Order
 * @param items
 * @param itemType
 * @param giftDetails
 * @param isGuest
 * @param guestCheckoutDetails
 */
const createOrder = (
  items: string[],
  itemType: string,
  giftDetails: {
    isAnonymous: boolean
    senderDetails: {
      name: string
      email: string
    }
    recipientDetails: {
      name: string
      email: string
    }
    scheduled: boolean
    scheduledAt: Date
  } | null = null,
  isGuest = false,
  guestCheckoutDetails?: {
    first_name: string
    last_name: string
    email: string
  }
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.ORDERS
    let config = {}
    const data: any = {
      items,
      itemType,
      giftDetails,
      isGuest,
      guestCheckoutDetails,
    }
    if (!isGuest) {
      config = {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      }
    } else {
      data.guestCheckoutDetails = guestCheckoutDetails
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

export default createOrder
