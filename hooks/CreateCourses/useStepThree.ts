// @ts-nocheck
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useCreateCourse } from '@contexts/CreateCourse'
import { difference } from '@helpers/difference'
import { Content, Course } from '@ugu/types'

type TUseStepThree = {
  course: Course
  saveChanges: () => void
  setPresentationalImage: (e: string) => void
  setPresentationalVideo: (e: Content) => void
  isPresentationalVideoUploading: boolean
  setIsPresentationalVideoUploading: Dispatch<SetStateAction<boolean>>
  editShortDescriptionHandler: (desc: string) => Promise<boolean>
  editDescriptionHandler: (desc: string) => Promise<boolean>
  editAboutAuthorHandler: (aboutAuthor: string) => Promise<boolean>
  addRequirementHandler: (item: string) => Promise<boolean>
  editRequirementHandler: (item: string, index: number) => Promise<boolean>
  deleteRequirementHandler: (index: number) => Promise<boolean>
  addResultHandler: (item: string) => Promise<boolean>
  editResultHandler: (item: string, index: number) => Promise<boolean>
  deleteResultHandler: (index: number) => Promise<boolean>
  addKeywordHandler: (e: string) => Promise<boolean>
  deleteKeywordHandler: (e: number) => Promise<boolean>
}
const useStepThree = (): TUseStepThree => {
  const {
    course: fetchedCourse,
    saveChanges: saveChangesHandler,
    updateChanges,
    setBottomNotification,
  } = useCreateCourse()
  const [course, setCourse] = useState<Course>(fetchedCourse as Course)
  const [isPresentationalVideoUploading, setIsPresentationalVideoUploading] =
    useState<boolean>(false)

  useEffect(() => {
    if (fetchedCourse?.version !== course.version) {
      setCourse(fetchedCourse as Course)
    }
  }, [fetchedCourse])

  const setPresentationalImage = (image: string) => {
    console.log('debug: updating image', image)
    const updatedCourse = {
      ...course,
      presentationalImage: image,
    }
    setCourse(updatedCourse)
    saveChangesHandler(updatedCourse)
  }
  const setPresentationalVideo = (content: Content) => {
    const updatedCourse = {
      ...course,
      presentationalVideo: content,
    }
    setCourse(updatedCourse)
    saveChangesHandler(updatedCourse)
  }
  const editShortDescriptionHandler = (desc: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      if (
        desc !== '' ||
        (desc !== undefined && course.shortCourseDescription !== desc)
      ) {
        const updatedCourse: Course = {
          ...course,
          shortCourseDescription: desc,
        }
        await setCourse(updatedCourse)
        await saveChanges(updatedCourse)
        resolve(true)
      } else {
        reject('Error while editing Short Description has occurred')
      }
    })
  }
  const editDescriptionHandler = (desc: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      if (desc !== '' || (desc !== undefined && course.description !== desc)) {
        const updatedCourse: Course = {
          ...course,
          description: desc,
        }
        await setCourse(updatedCourse)
        await saveChanges(updatedCourse)
        resolve(true)
      } else {
        reject('Error while editing Short Description has occurred')
      }
    })
  }

  const editAboutAuthorHandler = (aboutAuthor: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      if (
        aboutAuthor !== '' ||
        (aboutAuthor !== undefined && course.aboutAuthor !== aboutAuthor)
      ) {
        const updatedCourse: Course = {
          ...course,
          aboutAuthor: aboutAuthor,
        }
        await setCourse(updatedCourse)
        await saveChanges(updatedCourse)
        resolve(true)
      } else {
        reject('Error while editing AboutAuthor has occurred')
      }
    })
  }

  const addRequirementHandler = (item: string): Promise<boolean> => {
    console.log(course)
    return new Promise(async (resolve, reject) => {
      const requirements = course.requirements ? [...course.requirements] : []
      if (item !== '' || item !== undefined) {
        requirements.push(item)
        if (requirements && requirements.length > 0) {
          const updatedCourse: Course = {
            ...course,
            requirements: requirements,
          }
          await saveChanges(updatedCourse)
          await setCourse(updatedCourse)
          resolve(true)
        } else {
          reject(false)
        }
      } else {
        console.error('Error: requirement cannot be null!')
        reject(false)
      }
    })
  }
  const editRequirementHandler = (
    item: string,
    index: number
  ): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      let newRequirements: string[] = []
      if (item !== '' || item !== undefined) {
        if (item !== course.requirements[index]) {
          newRequirements = course.requirements.map((oldItem, i) => {
            return i === index ? item : oldItem
          })
          if (newRequirements && newRequirements.length > 0) {
            const updatedCourse: Course = {
              ...course,
              requirements: newRequirements,
            }
            await saveChanges(updatedCourse)
            await setCourse(updatedCourse)
            resolve(true)
          } else {
            reject(false)
          }
        } else {
          await saveChangesHandler(course)
          resolve(true)
        }
      } else {
        console.error('Error: requirement cannot be null!')
        reject(false)
      }
    })
  }
  const deleteRequirementHandler = (index: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const newRequirements: string[] = course.requirements
        ? [...course.requirements]
        : []
      if (newRequirements.length > 0) {
        if (newRequirements[index] !== undefined) {
          newRequirements.splice(index, 1)
          if (newRequirements) {
            const updatedCourse: Course = {
              ...course,
              requirements: newRequirements,
            }
            await saveChanges(updatedCourse)
            await setCourse(updatedCourse)
            resolve(true)
          } else {
            reject(false)
          }
        } else {
          console.error(
            'Delete error: requirement at the specified index does not exist!'
          )
          reject(false)
        }
      } else {
        console.error('Error: requirement cannot be null!')
        reject(false)
      }
    })
  }

  const addResultHandler = (item: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const whatYouWillLearn = course.whatYouWillLearn
        ? [...course.whatYouWillLearn]
        : []
      if (item !== '' || item !== undefined) {
        whatYouWillLearn.push(item)
        if (whatYouWillLearn && whatYouWillLearn.length > 0) {
          const updatedCourse: Course = {
            ...course,
            whatYouWillLearn: whatYouWillLearn,
          }
          await setCourse(updatedCourse)
          await saveChanges(updatedCourse)
          resolve(true)
        } else {
          reject(false)
        }
      } else {
        console.error('Error: Result cannot be null!')
        reject(false)
      }
    })
  }
  const editResultHandler = (item: string, index: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      let newWhatYouWillLearn: string[] = []
      if (item !== '' || item !== undefined) {
        if (item !== course.whatYouWillLearn[index]) {
          newWhatYouWillLearn = course.whatYouWillLearn.map((oldItem, i) => {
            return i === index ? item : oldItem
          })
          if (newWhatYouWillLearn && newWhatYouWillLearn.length > 0) {
            const updatedCourse: Course = {
              ...course,
              whatYouWillLearn: newWhatYouWillLearn,
            }
            await setCourse(updatedCourse)
            await saveChanges(updatedCourse)
            resolve(true)
          } else {
            reject(false)
          }
        } else {
          await saveChangesHandler(course)
          resolve(true)
        }
      } else {
        console.error('Error: requirement cannot be null!')
        reject(false)
      }
    })
  }
  const deleteResultHandler = (index: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const newWhatYouWillLearn: string[] = course.whatYouWillLearn
        ? [...course.whatYouWillLearn]
        : []
      if (newWhatYouWillLearn.length > 0) {
        if (newWhatYouWillLearn[index] !== undefined) {
          newWhatYouWillLearn.splice(index, 1)
          if (newWhatYouWillLearn) {
            const updatedCourse: Course = {
              ...course,
              whatYouWillLearn: newWhatYouWillLearn,
            }
            await setCourse(updatedCourse)
            await saveChanges(updatedCourse)
            resolve(true)
          } else {
            reject(false)
          }
        } else {
          console.error(
            'Delete error: requirement at the specified index does not exist!'
          )
          reject(false)
        }
      } else {
        console.error('Error: requirement cannot be null!')
        reject(false)
      }
    })
  }

  const addKeywordHandler = (keyword: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const keywords: string[] = course?.keywords ? [...course.keywords] : []
      if (keyword !== '' || keyword !== undefined) {
        keywords.push(keyword)
        if (keywords && keywords.length > 0) {
          if (keywords.length <= 10) {
            if (course) {
              try {
                const updatedCourse: Course = {
                  ...course,
                  keywords,
                }
                await setCourse(updatedCourse)
                await saveChanges(updatedCourse)
                resolve(true)
              } catch (err) {
                reject(err)
              }
            } else {
              reject(false)
            }
          } else {
            setBottomNotification({
              message: 'Maximum of 10 Keywords are allowed',
              actionType: 'error',
            })
          }
        } else {
          reject(false)
        }
      } else {
        console.error('Error: keyword cannot be null!')
        reject(false)
      }
    })
  }
  const deleteKeywordHandler = (index: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const keywords: string[] = course?.keywords ? [...course.keywords] : []
      if (keywords.length > 0) {
        if (keywords[index] !== undefined) {
          keywords.splice(index, 1)
          if (keywords) {
            if (course) {
              try {
                const updatedCourse: Course = {
                  ...course,
                  keywords,
                }
                await setCourse(updatedCourse)
                await saveChanges(updatedCourse)
                resolve(true)
              } catch (err) {
                console.error(err)
                reject(err)
              }
            } else {
              reject(false)
            }
          } else {
            reject(false)
          }
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
    })
  }

  const saveChanges = async (updatedCourse?: Course) => {
    const newCourse = updatedCourse ? updatedCourse : course
    const updatedFields = difference(newCourse, fetchedCourse as Course)
    console.log('debug', updatedFields)
    await updateChanges(updatedFields)
    await saveChangesHandler(newCourse)
  }

  return {
    course,
    saveChanges,
    setPresentationalImage,
    setPresentationalVideo,
    isPresentationalVideoUploading,
    setIsPresentationalVideoUploading,
    editShortDescriptionHandler,
    editDescriptionHandler,
    editAboutAuthorHandler,
    addRequirementHandler,
    editRequirementHandler,
    deleteRequirementHandler,
    addResultHandler,
    editResultHandler,
    deleteResultHandler,
    addKeywordHandler,
    deleteKeywordHandler,
  }
}

export default useStepThree
