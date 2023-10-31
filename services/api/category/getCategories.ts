import axios from 'axios'
import routes from '@configs/api'
import { Category } from '@type/main'

const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    const URL = routes.CATEGORIES
    const tokenId = localStorage.getItem('tokenId')
    console.log(URL)
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
        reject(err)
      })
  })
}

export default getCategories
