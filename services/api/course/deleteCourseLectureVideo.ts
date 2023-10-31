import axios from 'axios'
import routes from '@configs/api'
import { Lecture } from '@ugu/types'

/**
 * Delete Course Lecture
 * @param course_id
 * @param version
 * @param videoName
 */
const deleteCourseLectureVideo = (
  course_id: string,
  version: number,
  videoName: string
): Promise<Lecture> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE + course_id + '/' + version + '/video/' + videoName
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .delete(URL, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching the Course:', err)
        reject(err)
      })
  })
}

export default deleteCourseLectureVideo
