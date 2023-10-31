import axios from 'axios'
import routes from '@configs/api'

/**
 * Get stripe supported countries
 * @deprecated
 */
const getStripeSupportedCountries = (): Promise<{ id: string }[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.AUTHOR + '/get-stripe-countries'
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
        console.log('Error adding coupon:', err)
        reject(err)
      })
  })
}

export default getStripeSupportedCountries
