import axios from 'axios'
import routes from '@configs/api'

/**
 * Request for Author Verification
 */
const requestAuthorVerification = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.AUTHOR + '/request-author-verification'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(URL, {}, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export default requestAuthorVerification
