import axios from 'axios'
import routes from '@configs/api'

export const getAuthorIntroVideoUploadURL = (
  fileName: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.AUTHOR_PUBLIC_FILE_URL

    // Configuration for axios
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
        'Content-Type': 'application/json',
      },
    }

    // Request body
    const data = {
      file: fileName,
    }

    // Sending POST request
    axios
      .post(URL, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching author public file URL:', err)
        reject(err)
      })
  })
}
