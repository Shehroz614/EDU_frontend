import axios from 'axios'
import routes from '@configs/api'
import { User } from '@type/user'
import normalizeUser from '@utils/normalizeUser'

const Register = (
  token: string,
  firstName: string,
  lastName: string,
  emailSubscription: boolean
): Promise<User> => {
  return new Promise((resolve, reject) => {
    const URL = routes.REGISTER
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const data = {
      userData: {
        first_name: firstName,
        last_name: lastName,
        email_subscription: emailSubscription,
      },
    }
    axios
      .post(URL, data, config)
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
export default Register
