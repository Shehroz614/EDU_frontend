import routes from '@configs/api'
import { RawUser } from '@type/user'
import axios from 'axios'
import imageCompression from 'browser-image-compression'

const updateAvatar = (avatarFile: File) => {
  return new Promise<RawUser>(async (resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')

    // Ensure the file is not empty
    if (!avatarFile) {
      return reject(new Error('Avatar file is required'))
    }

    let fileToUpload = avatarFile

    // Compress the image to 512x512 and less than 500KB
    try {
      const options = {
        maxSizeMB: 0.5, // 500KB
        maxWidthOrHeight: 512, // 512 pixels
        useWebWorker: true,
      }
      fileToUpload = await imageCompression(avatarFile, options)
    } catch (error) {
      console.error('Error compressing image:', error)
      return reject(new Error('Failed to compress image'))
    }

    const url = `${routes.BASE}/api/user/avatar`

    const formData = new FormData()
    formData.append('avatar', fileToUpload)

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
        'Content-Type': 'multipart/form-data',
      },
    }

    axios
      .put(url, formData, config)
      .then((res) => {
        const updatedAvatar: RawUser = res.data
        resolve(updatedAvatar)
      })
      .catch((err) => {
        reject('Error updating avatar: ' + err)
      })
  })
}

export default updateAvatar
