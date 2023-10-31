import axios from 'axios'
import routes from '@configs/api'

/**
 * Link Content with course Lecture
 * @param course_id
 * @param version
 * @param sectionId
 * @param lectureId
 * @param contentId
 */
const linkCourseLectureWithContent = (
  course_id: string,
  version: number,
  sectionId: string,
  lectureId: string,
  contentId: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const URL =
      routes.COURSE +
      course_id +
      '/' +
      version +
      '/sections/' +
      sectionId +
      '/lectures/' +
      lectureId +
      '/contents/' +
      contentId +
      '/link'
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .post(URL, {}, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject('Error linking lecture with content occurred: ' + err)
      })
  })
}

export default linkCourseLectureWithContent
