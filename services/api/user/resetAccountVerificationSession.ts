import axios from 'axios'
import routes from '@configs/api'

/**
 * Reset author verification session
 */
const resetAccountVerificationSession = (): Promise<{
  object: string
  created: number
  expires_at: number
  url: string
}> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.AUTHOR + '/reset-verification-session'
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
  })
}

export default resetAccountVerificationSession
