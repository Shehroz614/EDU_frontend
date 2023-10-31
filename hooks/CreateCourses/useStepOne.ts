// @ts-nocheck
import { useEffect, useState } from 'react'
import { useCategoriesState } from '@contexts/categoriesContext'
import { useCreateCourse } from '@contexts/CreateCourse'
import { Course } from '@type/course'
import { isEmpty } from 'lodash'
import { difference } from '@helpers/difference'
import { Category } from '@type/main'
import getCategory from '@utils/getCategory'

type useStepOne = {
  course: Course
  categories: Category[]
  category: Category | undefined
  subCategory: Category | undefined
  subSubCategory: Category | undefined
  handleInputChange: (n: string, v: string) => void
  saveChanges: () => void
  discardChanges: () => void
  addLanguage: (item: string) => Promise<boolean>
  deleteLanguage: (e: number) => Promise<boolean>
}

const useStepOne = (): useStepOne => {
  const { categories } = useCategoriesState()
  const {
    course: fetchedCourse,
    saveChanges: saveChangesHandler,
    updateChanges,
    discardChanges: discardChangesHandler,
    setChangesSaved,
    setBottomNotification,
  } = useCreateCourse()
  const [course, setCourse] = useState<Course>(fetchedCourse as Course)
  const [currentCategory, setCurrentCategory] = useState<Category>()
  const [currentSubCategory, setCurrentSubCategory] = useState<Category>()
  const [currentSubSubCategory, setCurrentSubSubCategory] = useState<Category>()

  //changes save btn state
  useEffect(() => {
    const diff = difference(course, fetchedCourse!)
    console.log('diff: ', diff)
    if (isEmpty(diff)) {
      setChangesSaved(true)
    } else {
      setChangesSaved(false)
    }
  }, [course])

  useEffect(() => {
    if (fetchedCourse?.version !== course.version) {
      setCourse(fetchedCourse as Course)
    }
  }, [fetchedCourse])

  // Categories side-effect
  useEffect(() => {
    if (course.category) {
      const category = getCategory(categories, course.category)
      if (category) {
        console.log('setting category')
        setCurrentCategory(category)
        if (course.subCategory) {
          const subCategory = getCategory(category.children, course.subCategory)
          if (subCategory?.parent === course.category) {
            setCurrentSubCategory(subCategory)
            if (course.subSubCategory) {
              if (subCategory?.children) {
                const subSubCategory = getCategory(
                  subCategory.children,
                  course.subSubCategory
                )
                if (subSubCategory?.parent === course.subCategory) {
                  setCurrentSubSubCategory(subSubCategory)
                } else {
                  setCurrentSubSubCategory(undefined)
                  handleInputChange('subSubCategory', null)
                }
              }
            } else {
              setCurrentSubSubCategory(undefined)
            }
          } else {
            setCurrentSubCategory(undefined)
            handleInputChange('subCategory', null)
          }
        } else {
          setCurrentSubCategory(undefined)
          setCurrentSubSubCategory(undefined)
        }
      }
    } else {
      setCurrentCategory(undefined)
      setCurrentSubCategory(undefined)
      setCurrentSubSubCategory(undefined)
    }
  }, [course])

  const handleInputChange = async (
    name: string,
    value: string | undefined | null
  ) => {
    await setCourse((course) => ({
      ...course,
      [name]: value,
    }))
  }

  const saveChanges = async () => {
    const updatedFields = difference(course, fetchedCourse as Course)
    await updateChanges(updatedFields)
    saveChangesHandler(course)
    setBottomNotification({
      message: 'Changes have been saved successfully',
      actionType: 'success',
    })
  }

  const discardChanges = () => {
    fetchedCourse && setCourse(fetchedCourse)
    discardChangesHandler()
  }

  const addLanguage = (item: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const languages: string[] = course?.languages ? [...course.languages] : []
      if (item !== '' || item !== undefined) {
        languages.push(item)
        if (languages && languages.length > 0) {
          if (languages.length <= 1) {
            if (course) {
              try {
                const updatedCourse: Course = {
                  ...course,
                  languages: languages,
                }
                //console.log(updatedCourse)
                await setCourse(updatedCourse)
                resolve(true)
              } catch (err) {
                reject(err)
              }
            } else {
              reject(false)
            }
          } else {
            setBottomNotification({
              message: 'Only 1 language is allowed',
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
  const deleteLanguage = (index: number): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      const languages: string[] = course?.languages ? [...course.languages] : []
      if (languages.length > 0) {
        if (languages[index] !== undefined) {
          languages.splice(index, 1)
          if (languages) {
            if (course) {
              try {
                const updatedCourse: Course = {
                  ...course,
                  languages: languages,
                }
                await setCourse(updatedCourse)
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

  return {
    course,
    categories,
    category: currentCategory,
    subCategory: currentSubCategory,
    subSubCategory: currentSubSubCategory,
    handleInputChange,
    saveChanges,
    discardChanges,
    addLanguage,
    deleteLanguage,
  }
}
export default useStepOne
