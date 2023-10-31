//TODO
//Promise type should not be any
//also updatedFields shouldn't be any - there should be way to know which properties will be there

import axios, { CancelTokenSource } from 'axios'
import {
  Lecture,
  Section,
  SimpleSection,
  Content,
  CouponType,
  Resource,
} from 'types/course'
import routes from '@configs/api'

export const updateCourseHelper = (
  courseId: string,
  updatedFields: {}
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/courses`
    const data = {
      updatedFields: updatedFields,
      courseId: courseId,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .patch(url, data, config)
      .then((res) => {
        console.log('Updated course res: ', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error updating the course:' + err)
      })
  })
}

//change the list of sections and lectures
//This should be called if at least one lecture were moved to another section
export const changeListOfItemsHelper = (
  courseId: string,
  sections: SimpleSection[]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/items`
    const data = {
      sections: sections,
      courseId: courseId,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .put(url, data, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject('Error updating Items: ' + err)
      })
  })
}

//change the list of sections
//This should be called if only sections were moved around
export const changeListOfSectionsHelper = (
  courseId: string,
  newSectionsOrder: string[]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/section-items`
    const data = {
      sections: newSectionsOrder,
      courseId: courseId,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .put(url, data, config)
      .then((res) => {
        console.log('Changed Section Order from BE: ')
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error updating Section Items: ' + err)
      })
  })
}

//sends delete request to server
export const deleteSectionHelper = (
  courseId: string,
  sectionId: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/sections`

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      data: {
        courseId: courseId,
        sectionId: sectionId,
      },
    }

    axios
      .delete(url, config)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject('Error deleting Section ' + err)
      })
  })
}

export const deleteLectureHelper = (
  courseId: string,
  sectionId: string,
  lectureId: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/lectures`

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      data: {
        courseId: courseId,
        sectionId: sectionId,
        lectureId: lectureId,
      },
    }

    axios
      .delete(url, config)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject('Error deleting Lecture ' + err)
      })
  })
}

export const addNewSectionHelper = (
  courseId: string,
  title: string
): Promise<Section> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/sections`
    const data = {
      title: title,
      courseId: courseId,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(url, data, config)
      .then((res) => {
        const section = res.data
        console.log('Created section: ', section)
        //callback function
        resolve(res.data as Section)
      })
      .catch((err) => {
        reject('Error creating section: ' + err)
      })
  })
}

export const editSectionHelper = (
  courseId: string,
  sectionId: string,
  newTitle: string
): Promise<Section> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/sections`
    const data = {
      updatedFields: {
        title: newTitle,
      },
      sectionId: sectionId,
      courseId: courseId,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .patch(url, data, config)
      .then((res) => {
        const section = res.data
        console.log('Updated section: ', section)
        //callback function
        resolve(section)
      })
      .catch((err) => {
        reject('Error editing section: ' + err)
      })
  })
}

export const addNewLectureHelper = (
  courseId: string,
  sectionId: string,
  title: string,
  preview: boolean
): Promise<Lecture> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/lectures`
    const data = {
      title: title,
      courseId: courseId,
      sectionId: sectionId,
      preview: preview,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(url, data, config)
      .then((res) => {
        const lecture: Lecture = res.data
        resolve(lecture)
      })
      .catch((err) => {
        reject('Error creating lecture: ' + err)
      })
  })
}

export const editLectureHelper = (
  courseId: string,
  sectionId: string,
  lectureId: string,
  title: string,
  preview: boolean
): Promise<Lecture> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/lectures`
    const data = {
      updatedFields: {
        title: title,
        preview: preview,
      },
      lectureId: lectureId,
      sectionId: sectionId,
      courseId: courseId,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .patch(url, data, config)
      .then((res) => {
        const lecture: Lecture = res.data
        resolve(lecture)
      })
      .catch((err) => {
        reject('Error editing lecture: ' + err)
      })
  })
}

//Promise type should be VideoContent
export const createVideoContentHelper = (
  courseId: string,
  parts: {
    ETag: any
    PartNumber: number
  }[],
  contentName: string, //name created by user
  filename: string, //name of the file created by AWS
  uploadId: string,
  duration: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/video`

    const data = {
      uploadId: uploadId,
      courseId: courseId,
      parts: parts,
      contentName: contentName,
      duration: duration,
      fileName: filename,
    }

    console.log('Data to create: ', data.uploadId.length)
    // ({ duration, key } = req.body || {});
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .post(url, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while creating Video content: ' + err)
      })
  })
}

export const createPresentationalVideoHelper = (
  courseId: string,
  contentName: string, //name created by user
  filename: string, //name of the file created by AWS
  duration: number,
  key: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/presentational-video`

    const data = {
      courseId: courseId,
      contentName: contentName,
      duration: duration,
      fileName: filename,
      key: key,
    }

    console.log('Data to create presentational video: ', data)
    // ({ duration, key } = req.body || {});
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .post(url, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while creating Video content: ' + err)
      })
  })
}

export const createPresentationalImageHelper = (
  courseId: string,
  key: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/presentational-photo`

    const data = {
      courseId: courseId,
      key: key,
    }

    console.log('Data to create presentational image: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .post(url, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while creating Presentational Image: ' + err)
      })
  })
}

export const linkContentWithLectureHelper = (
  courseId: string,
  sectionId: string,
  lectureId: string,
  contentId: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/lecture/link`

    const data = {
      courseId: courseId,
      sectionId: sectionId,
      lectureId: lectureId,
      contentId: contentId,
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(url, data, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) =>
        reject('Error linking lecture with content occured: ' + err)
      )
  })
}

// VIDEO UPLOAD HELPERS:

//PUBLIC UPLOAD:

type SignedURLServerDataPublic = {
  data: any
  key: string
}
//get url to upload public files(photo/video) to AWS
export const getPublicContentLinksHelper = (
  courseId: string,
  format: string
): Promise<SignedURLServerDataPublic> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/public-file-link`
    const data = {
      courseId: courseId,
      format: format,
    }
    console.log('Data to send: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .post(url, data, config)
      .then((res) => {
        console.log('Get link response: ', res)
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error creating section: ', err)
        reject(err)
      })
  })
}

type SignedURLServerData = {
  fileName: string
  uploadId: string
  urls: string[]
}

export const getContentLinksHelper = (
  courseId: string,
  parts: number,
  format: string
): Promise<SignedURLServerData> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/video-link`
    const data = {
      courseId: courseId,
      parts: parts,
      format: format,
    }
    console.log('Data to send: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .post(url, data, config)
      .then((res) => {
        console.log('Get link response: ', res)
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error creating section: ', err)
        reject(err)
      })
  })
}

export const getVideoContent = (
  courseId: string,
  sectionId: string,
  lectureId: string,
  contentId: string,
  isAuthor: boolean
): Promise<Content> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url =
      `${routes.BASE}/api/education/video-content` +
      '?' +
      'courseId=' +
      courseId +
      '&' +
      'sectionId=' +
      sectionId +
      '&' +
      'lectureId=' +
      lectureId +
      '&' +
      'contentId=' +
      contentId +
      '&' +
      'isAuthor=' +
      isAuthor

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(url, config)
      .then((res) => {
        // const course = res.data
        console.log('Video Content received:', res)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while generating link: ' + err)
      })
  })
}

//ANCHOR RESOURCE:

//get links for lecture resources
export const getResourcesLinksByLectureIdHelper = (
  courseId: string,
  lectureId: string
): Promise<{ _id: string; url: string }[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/generate-resource-links`
    const data = {
      courseId: courseId,
      lectureId: lectureId,
    }
    console.log('Data to send: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    axios
      .post(url, data, config)
      .then((res) => {
        console.log('Get link response: ', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        console.log('Error fetching resources: ', err)
        reject(err)
      })
  })
}

export const linkLectureWithResourceHelper = (
  courseId: string,
  sectionId: string,
  lectureId: string,
  resourceId: string,
  cancelToken?: CancelTokenSource
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/resource/link`
    const data = {
      courseId,
      sectionId,
      lectureId,
      resourceId,
    }
    console.log('Data to send: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      cancelToken: cancelToken && cancelToken.token,
    }

    axios
      .post(url, data, config)
      .then((res) => {
        console.log('Get link response: ', res)
        resolve()
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('axios request cancelled', err.message, url)
          reject(err)
        } else {
          console.log('Error linking LectureWithResourceHelper: ', err)
          reject(err)
        }
      })
  })
}

//to complete file upload
export const createResourceHelper = (
  courseId: string,
  fileName: string,
  resourceName: string,
  cancelToken?: CancelTokenSource
): Promise<Resource> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/resource`
    const data = {
      courseId: courseId,
      fileName: fileName,
      resourceName: resourceName,
    }
    console.log('Data to send: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      cancelToken: cancelToken && cancelToken.token,
    }

    axios
      .post(url, data, config)
      .then((res) => {
        console.log('Get link response: ', res)
        resolve(res.data)
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('axios request cancelled', err.message, url)
          reject(err)
        } else {
          console.log('Error creating section: ', err)
          reject(err)
        }
      })
  })
}

export const deleteResourceHelper = (resourceId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/resource`
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      data: {
        resourceId: resourceId,
      },
    }
    axios
      .delete(url, config)
      .then(() => {
        console.log('Resource has been deleted!')
        resolve()
      })
      .catch((err) => {
        reject('Error occured while deleting Lecture content: ' + err)
      })
  })
}

export const createTextContent = (
  //add content name
  courseId: string,
  content: string
): Promise<Content> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/text-lecture-content`
    const data = {
      lecture_content: {
        content: content,
        contentName: 'Test content',
        courseId: courseId,
        duration: 120, //later change to be dynamic
      },
    }
    console.log('text-lecture-content data obj: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(url, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while generating link: ' + err)
      })
  })
}

export const updateTextContent = (
  //add content name
  courseId: string,
  content: string
): Promise<Content> => {
  console.log('updating')
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/text-lecture-content`
    const data = {
      lecture_content: {
        content: content,
        contentName: 'Test content',
        courseId: courseId,
        duration: 120, //later change to be dynamic
      },
    }
    console.log('text-lecture-content data obj: ', data)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .patch(url, data, config)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occurred while updating textContent: ' + err)
      })
  })
}

export const deleteLectureContentHelper = (
  contentId: string
): Promise<Content> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/lecture-content`
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      data: {
        contentId: contentId,
      },
    }
    axios
      .delete(url, config)
      .then((res) => {
        console.log('Lecture content has been deleted!')
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while deleting Lecture content: ' + err)
      })
  })
}

export const getTextContentHelper = (
  courseId: string,
  sectionId: string,
  lectureId: string,
  contentId: string
): Promise<Content> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    // name=me&ID=123
    const url =
      `${routes.BASE}/api/education/lecture-content/` +
      '?' +
      'courseId=' +
      courseId +
      '&' +
      'sectionId=' +
      sectionId +
      '&' +
      'lectureId=' +
      lectureId +
      '&' +
      'contentId=' +
      contentId +
      '&'

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(url, config)
      .then((res) => {
        // const course = res.data
        console.log('Text Content that was fetched: ', res.data)

        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while fetching text content: ' + err)
      })
  })
}

//ANCHOR Step 3 helpers:

//ANCHOR Coupons Helpers:
export const getCouponsHelper = (courseId: string): Promise<CouponType[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url =
      `${routes.BASE}/api/education/coupons` + '?' + 'courseId=' + courseId

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(url, config)
      .then((res) => {
        console.log('Course coupons: ', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while getting Course Coupons: ' + err)
      })
  })
}

export const addCouponHelper = (
  courseId: string,
  coupons: CouponType[]
): Promise<CouponType[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/coupons`

    const data = {
      courseId: courseId,
      coupons: coupons,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .post(url, data, config)
      .then((res) => {
        console.log('Add Course coupons response: ', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while adding a new Course Coupon: ' + err)
      })
  })
}

//not ready
export const deleteCouponHelper = (
  courseId: string,
  couponId: string
): Promise<CouponType[]> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/coupons/` + couponId

    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
      data: {
        courseId: courseId,
      },
    }
    axios
      .delete(url, config)
      .then((res) => {
        console.log('Delete coupon response: ', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while deleting Coupon: ' + err)
      })
  })
}

export const PatchPriceHelper = (
  courseId: string,
  courseVersion: number,
  price: number
): Promise<typeof price> => {
  return new Promise((resolve, reject) => {
    const tokenId = localStorage.getItem('tokenId')
    const url = `${routes.BASE}/api/education/courses/${courseId}/${courseVersion}/`

    const data = {
      updatedFields: {
        price: price,
      },
    }
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .patch(url, data, config)
      .then((res) => {
        //console.log('Add price response: ', res.data)
        resolve(res.data)
      })
      .catch((err) => {
        reject('Error occured while adding a new price: ' + err)
      })
  })
}
