import axios from 'axios'
import routes from '@configs/api'

export const updateAuthorIntroVideo = (fileName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL = routes.AUTHOR_INTRODUCTION_VIDEO
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(URL, { file: fileName }, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error updating author introduction video:', err)
        reject(err)
      })
  })
}
