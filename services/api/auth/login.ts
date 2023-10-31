import axios from 'axios'
import routes from '@configs/api'
import { User } from '@type/user'
import normalizeUser from '@utils/normalizeUser'

const Login = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const URL = routes.LOGIN
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    axios
      .post(URL, {}, config)
      .then((res) => {
        // TODO - Refactor user schema as per Backend
        const user: User = normalizeUser(res.data)

        resolve(user)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export default Login
