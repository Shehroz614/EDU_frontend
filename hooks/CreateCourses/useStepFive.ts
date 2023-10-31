// @ts-nocheck
import { FormEvent, useState } from 'react'
import { useCreateCourse } from '@contexts/CreateCourse'
import publishCourseApi from '@services/api/course/publishCourse'
import cancelCourseReviewApi from '@services/api/course/cancelCourseReview'

type useStepFive = {
  reviewNote: string
  editReviewNote: (e: FormEvent<HTMLTextAreaElement>) => void
  contactEmail: string
  editContactEmail: (e: FormEvent<HTMLInputElement>) => void
  validateFields: (note: string, email: string) => boolean
  isPublishEnabled: boolean
  publishCourse: () => Promise<void>
  cancelReview: () => Promise<void>
}
const useStepFive = (): useStepFive => {
  const { course_id, course, saveChanges, setBottomNotification } =
    useCreateCourse()
  const [reviewNote, setReviewNote] = useState<string>('')
  const [contactEmail, setContactEmail] = useState<string>('')
  const [isPublishEnabled, setIsPublishEnabled] = useState<boolean>(false)

  const editReviewNote = async (e: FormEvent<HTMLTextAreaElement>) => {
    validateFields(e.currentTarget.value, contactEmail)
    await setReviewNote(e.currentTarget.value)
  }
  const editContactEmail = async (e: FormEvent<HTMLInputElement>) => {
    validateFields(reviewNote, e.currentTarget.value)
    await setContactEmail(e.currentTarget.value)
  }

  const validateFields = (note: string, email: string): boolean => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (note?.length > 1 && emailRegex.test(email)) {
      setIsPublishEnabled(true)
      return true
    } else {
      setIsPublishEnabled(false)
      return false
    }
  }

  const publishCourse = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      if (course) {
        if (validateFields(reviewNote, contactEmail)) {
          try {
            await publishCourseApi(
              course_id,
              course.version,
              reviewNote,
              contactEmail
            )
            setBottomNotification({
              message: 'Course submitted for review',
              actionType: 'success',
            })
            saveChanges({
              ...course,
              status: 'inReview',
            })
            resolve()
          } catch (err: any) {
            setBottomNotification({
              message: err.response.data.message,
              actionType: 'error',
            })
            reject()
          }
        } else {
          setBottomNotification({
            message: 'Please provide valid details for all the fields',
            actionType: 'error',
          })
          reject()
        }
      }
      reject()
    })
  }

  const cancelReview = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      if (course) {
        try {
          await cancelCourseReviewApi(
            course_id,
            course.version,
            course.reviewRecord
          )
          setBottomNotification({
            message: 'Course review been cancelled',
            actionType: 'success',
          })
          saveChanges({
            ...course,
            status: 'draft',
          })
          resolve()
        } catch (err: any) {
          setBottomNotification({
            message: err?.response?.data?.message,
            actionType: 'error',
          })
          reject()
        }
      }
    })
  }

  return {
    reviewNote,
    editReviewNote,
    contactEmail,
    editContactEmail,
    validateFields,
    isPublishEnabled,
    publishCourse,
    cancelReview,
  }
}
export default useStepFive
