// @ts-nocheck
import {
  addCouponHelper,
  deleteCouponHelper,
  getCouponsHelper,
} from '@helpers/createCourseHelpers'
import { difference } from 'helpers/difference'
import updateCourseHelper from 'helpers/updateCourseHelper'
import { useState, useEffect } from 'react'
import { CouponType, Course } from 'types/course'

const useStepFour = (
  passedCourse: Course,
  saveCourse: (newCourse: Course) => void
) => {
  const [course, setCourse] = useState<Course>(passedCourse)
  const [keywords, setKeywords] = useState<string[]>([])
  const [coupons, setCoupons] = useState<CouponType[]>([])

  useEffect(() => {
    if (course) {
      if (course.keywords.length > 0) {
        setKeywords(course.keywords)
      }
      //get coupons
      getCouponsHelper(course._id)
        .then((coupons) => {
          setCoupons(coupons)
        })
        .catch((err) => {
          console.log('Error fetching coupons occured: ', err)
        })
    }
  }, [])

  //ANCHOR: Change handlers:

  const saveChanges = (updatedCourse: Course) => {
    console.log('changes saved!')
    console.log('Updated course:', updatedCourse)
    const diff = difference(updatedCourse, passedCourse)
    console.log('Difference: ', diff)
    updateCourseHelper(passedCourse!._id, diff).then(() => {
      saveCourse(updatedCourse)
    })
  }

  const addKeywordHandler = (
    newItem: string
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const newKeywords = [...keywords]
      if (newItem !== '' || newItem !== undefined) {
        //add new requirement to requirements[]
        newKeywords.push(newItem)
      } else {
        console.error('Error: keyword cannot be null!')
        reject(false)
      }
      if (newKeywords && newKeywords.length > 0) {
        const updatedCourse: Course = {
          ...course,
          keywords: newKeywords,
        }
        const diff = { keywords: newKeywords }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('New keyword has been added!')
              setKeywords(newKeywords)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error(
                'Error while adding a new keyword has occured' + err
              )
              reject(false)
            })
        } else {
          reject(false)
        }
      } else {
        reject(false)
      }
    })
  }

  const deleteKeywordHandler = (
    atIndex: number
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let newKeywords: string[] = [...keywords]
      if (newKeywords.length > 0) {
        if (newKeywords[atIndex] !== undefined) {
          newKeywords.splice(atIndex, 1)
        } else {
          console.error(
            'Delete error: keywords at the specified index does not exist!'
          )
          reject(false)
        }
      } else {
        console.error('Error: keywords cannot be null!')
        reject(false)
      }
      if (newKeywords) {
        const updatedCourse: Course = {
          ...course,
          keywords: newKeywords,
        }
        const diff = { keywords: newKeywords }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('Requirement has been deleted!')
              setKeywords(newKeywords)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error(
                'Error while adding a new keywords has occured' + err
              )
              reject(false)
            })
        } else {
          reject(false)
        }
      } else {
        reject(false)
      }
    })
  }

  const checkIfCouponIsValid = (newCoupon: CouponType) => {
    if (coupons.map((coupon) => coupon.name).includes(newCoupon.name, 0)) {
      console.log('Coupon already exists!')
      return false
    } else {
      if (
        newCoupon.name !== '' ||
        (newCoupon.name !== undefined &&
          newCoupon.discount > 0 &&
          newCoupon.discount < 100)
      ) {
        console.log('Coupon is valid!')
        return true
      } else {
        console.log('Coupon is invalid!')
        return false
      }
    }
  }

  const addCouponHandler = (
    newCoupon: CouponType
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (checkIfCouponIsValid(newCoupon)) {
        //add new requirement to requirements[]
        // newCoupons.push(newCoupon)
        const newCoupons: CouponType[] = []
        newCoupons.push(newCoupon)

        addCouponHelper(course._id, newCoupons).then((coupons) => {
          setCoupons(coupons)
          resolve(true)
        })
      } else {
        console.error('Error: keyword cannot be null!')
        reject(false)
      }
      // if (newCoupons && newCoupons.length > 0) {
      //   const updatedCourse: Course = {
      //     ...course,
      //     coupons: newCoupons,
      //   }
      //   const diff = { coupons: newCoupons }
      //   if (passedCourse) {
      //     updateCourseHelper(passedCourse!._id, diff)
      //       .then(() => {
      //         saveCourse(updatedCourse)
      //       })
      //       .then(() => {
      //         console.log('New keyword has been added!')
      //         setCoupons(newCoupons)
      //         resolve(true)
      //         //Show bottom pop-up that new Requirements has been added
      //       })
      //       .catch((err) => {
      //         console.error(
      //           'Error while adding a new keyword has occured' + err
      //         )
      //         reject(false)
      //       })
      //   } else {
      //     reject(false)
      //   }
      // } else {
      //   reject(false)
      // }
    })
  }

  const deleteCouponHandler = (
    // atIndex: number
    _id: string
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      deleteCouponHelper(course._id, _id)
        .then((coupons) => {
          setCoupons(coupons)
          resolve(true)
        })
        .catch((err) => {
          console.log('Error occured while deleting coupon')
          reject(false)
        })
      // let newCoupons: CouponType[] = [...coupons]
      // console.log('New Coupons before splice: ', newCoupons)

      // if (newCoupons.length > 0) {
      //   if (newCoupons[atIndex] !== undefined) {
      //     newCoupons.splice(atIndex, 1)
      //     console.log('New Coupons after splice: ', newCoupons)
      //   } else {
      //     console.error(
      //       'Delete error: coupon at the specified index does not exist!'
      //     )
      //     reject(false)
      //   }
      // } else {
      //   console.error('Error: coupon cannot be null!')
      //   reject(false)
      // }
      // if (newCoupons) {
      //   const updatedCourse: Course = {
      //     ...course,
      //     coupons: newCoupons,
      //   }
      //   const diff = { coupons: newCoupons }
      //   if (passedCourse) {
      //     updateCourseHelper(passedCourse!._id, diff)
      //       .then(() => {
      //         saveCourse(updatedCourse)
      //       })
      //       .then(() => {
      //         console.log('Coupon has been deleted!')
      //         setCoupons(newCoupons)
      //         resolve(true)
      //         //Show bottom pop-up that new Requirements has been added
      //       })
      //       .catch((err) => {
      //         console.error(
      //           'Error while adding a new coupons has occured' + err
      //         )
      //         reject(false)
      //       })
      //   } else {
      //     reject(false)
      //   }
      // } else {
      //   reject(false)
      // }
    })
  }

  return {
    course,
    saveChanges,
    keywords,
    coupons,
    addKeywordHandler,
    deleteKeywordHandler,
    addCouponHandler,
    deleteCouponHandler,
  }
}

export default useStepFour
