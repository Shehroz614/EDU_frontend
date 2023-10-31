import axios from 'axios'
import routes from '@configs/api'

export const getReviews = async (courseId?: string) => {
  const url = `${routes.BASE}/api/education/courses/${courseId}/reviews`
  const tokenId = localStorage.getItem('tokenId')
  const config = {
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  }
  return await axios.get(url, config)
}
