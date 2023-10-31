import axios from 'axios'
import routes from '@configs/api'

/**
 * Create author verification session
 */
const createAccountVerificationSession = (
  country: string
): Promise<{
  object: string
  created: number
  expires_at: number
  url: string
}> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.AUTHOR + '/get-verification-session'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    const data = { country }
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

export default createAccountVerificationSession
