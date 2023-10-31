import axios from 'axios'
import routes from '@configs/api'

/**
 * Get Setting
 * @param name
 */
const getSetting = (name: string): Promise<{ name: string; value: number }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenId = localStorage.getItem('tokenId')
      const URL = routes.SETTINGS + '/' + name
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
export default getSetting
