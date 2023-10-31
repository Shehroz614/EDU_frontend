// @ts-nocheck
import { Category } from '@ugu/types'
import { useCategoriesState } from 'contexts/categoriesContext'
import { difference } from 'helpers/difference'
import updateCourseHelper from 'helpers/updateCourseHelper'
import { useState, useEffect } from 'react'
import { Course, CourseAgeLimit, CourseLevel, ShortCourse } from 'types/course'

const getCategory = (categories: Category[], categoryId: string) => {
  return categories.filter((category) => {
    return category._id === categoryId
  })[0]
}

//Expected Logic:
//0. We have Main Hook - useCreateCourse responsible for create Course, fetch Course, update Course,
//it also holds state whether course has been saved, current selected step.
//1. Then we have Local Hook for each step
// This hook responsible for: Receive orginal Course object from Main Hook
//2. Extract values required for this Step
//3. If values has been modified we update them in this Hook and compare them with values on the passedCourse.
//4. If they are different we set changesSaved to false which shows Save/Cancel btn to a User.
//5. If User clicks Save btn - we need to pass updated fields to the backend.

//As of now:
//1. We have a diff() function, that takes two objects and gives back whatever values have been modified.
//2. That's why we have to keep 2 Course objects -> one on the Main Hook and another on Local hook.
//3. Actually, if we have local Course Object we don't need to have separate values for title or category,
//as we can change them directly on that local Course object - that will remove many redundant states.
//Right now we set title and when title changes we update title state, then we update the title on the local Course,
//set new Course.

//Will be updated:
//1. We will remove many local states for title, category, subCategory and others and instead will be updating values on the local Course object,
//2. Once value is updated we will check if that value is different to the passedCourse and if yes will set changesSaved to false.
//3. When Save btn pressed it will use diff() function to get only the updated fields.

//Categories =
//-Fetch categories
//-Fetch Course
//-Set Category, Sub-category, sub-sub-category from the Course object if they exist
//-Show Select with categories
//-On Select set category & update course.category with category.id
//-If selected Category has children show them under: sub-category OR sub-sub-category
const useStepOne = (
  passedCourse: Course,
  saveChangesHandler: (newCourse: Course) => void,
  discardChangesHandler: () => void
) => {
  const { categories } = useCategoriesState()
  const [course, setCourse] = useState<Course>(passedCourse)
  const [title, setTitle] = useState<string>()
  const [category, setCategory] = useState<Category>()
  const [subCategory, setSubCategory] = useState<Category>()
  const [subSubCategory, setSubSubCategory] = useState<Category>()
  const [description, setDesctiption] = useState<string>()
  const [ageLimit, setAgeLimit] = useState<CourseAgeLimit>(
    course.ageLimit || 'noLimit'
  )
  const [level, setLevel] = useState<CourseLevel>(course.level || 'all')

  //this is done if Course has been changed
  useEffect(() => {
    if (course) {
      //set title
      // course.title && setTitle(course.title)
      //set overview
      // course.description && setDesctiption(course.description)
      // course.ageLimit && setAgeLimit(course.ageLimit)
      // course.level && setLevel(course.level)
      //set categories

      console.log('Course obj changed')
      if (course.category) {
        const category = getCategory(categories, course.category)
        setCategory(category)
        //set subCategory
        if (course.subCategory) {
          const subCategory = getCategory(category.children, course.subCategory)
          setSubCategory(subCategory)
          //set subSubCategory
          if (course.subSubCategory) {
            const subSubCategory = getCategory(
              subCategory.children,
              course.subSubCategory
            )
            setSubSubCategory(subSubCategory)
          }
        }
      }
    }
  }, [categories, course])

  //update title in Course obj
  // useEffect(() => {
  //   if (title) {
  //     const newCourse = { ...course, title: title }
  //     setCourse(newCourse)
  //   }
  // }, [title])

  //update category in Course obj
  // useEffect(() => {
  //   if (category) {
  //     const newCourse: Course = {
  //       ...course,
  //       category: category._id,
  //       subCategory: null,
  //       subSubCategory: null,
  //     }
  //     setCourse(newCourse)
  //   }
  // }, [category])

  //update subCategory in Course obj
  // useEffect(() => {
  //   if (subCategory) {
  //     const newCourse: Course = {
  //       ...course,
  //       subCategory: subCategory._id,
  //       subSubCategory: null,
  //     }
  //     setCourse(newCourse)
  //   }
  // }, [subCategory])

  //update subSubCategory in Course obj
  // useEffect(() => {
  //   if (subSubCategory) {
  //     const newCourse: Course = {
  //       ...course,
  //       subSubCategory: subSubCategory._id,
  //     }
  //     setCourse(newCourse)
  //   }
  // }, [subSubCategory])

  //update description in Course obj
  // useEffect(() => {
  //   if (description) {
  //     const newCourse: Course = {
  //       ...course,
  //       description: description,
  //     }
  //     setCourse(newCourse)
  //   }
  // }, [description])

  //ANCHOR: Change handlers:

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // setTitle(e.currentTarget.value)

    const newCourse = { ...course, title: e.currentTarget.value }
    setCourse(newCourse)
  }
  const handleAgeLimitChange = (newAgeLimit: CourseAgeLimit) => {
    setCourse({ ...course, ageLimit: newAgeLimit })
  }
  const handleLevelChange = (newLevel: CourseLevel) => {
    setCourse({ ...course, level: newLevel })
  }

  const handleCategoriesChange = (
    newCategory: Category,
    type: 'category' | 'sub-category' | 'sub-sub-category'
  ) => {
    switch (type) {
      case 'category':
        handleCategoryChange(newCategory)
        break
      case 'sub-category':
        handleSubCategoryChange(newCategory)
        break
      case 'sub-sub-category':
        handleSubSubCategoryChange(newCategory)
        break
    }
  }

  const handleCategoryChange = (newCategory: Category) => {
    if (!category || (category && newCategory._id !== category?._id)) {
      setCategory(newCategory)
      setSubCategory(undefined)
      setSubSubCategory(undefined)

      const newCourse: Course = {
        ...course,
        category: newCategory._id,
        subCategory: null,
        subSubCategory: null,
      }
      setCourse(newCourse)
    }
  }

  const handleSubCategoryChange = (newCategory: Category) => {
    if (newCategory._id !== subCategory?._id || !subCategory) {
      setSubCategory(newCategory)
      setSubSubCategory(undefined)

      const newCourse: Course = {
        ...course,
        subCategory: newCategory._id,
        subSubCategory: null,
      }
      setCourse(newCourse)
    }
  }

  const handleSubSubCategoryChange = (newCategory: Category) => {
    if (newCategory._id !== subSubCategory?._id || !subSubCategory) {
      setSubSubCategory(newCategory)

      const newCourse: Course = {
        ...course,
        subSubCategory: newCategory._id,
      }
      setCourse(newCourse)
    }
  }

  const handleDescriptionChange = (newDescription: string) => {
    if (newDescription !== description) {
      // console.log('description before: ', description)
      // console.log('updated Description: ', newDescription)
      // setDesctiption(newDescription)
      const newCourse: Course = {
        ...course,
        description: newDescription,
      }
      setCourse(newCourse)
    }
  }

  const saveChanges = (updatedCourse: Course) => {
    console.log('changes saved!')
    console.log('Updated course:', updatedCourse)
    const diff = difference(updatedCourse, passedCourse)
    console.log('Difference: ', diff)

    //update Course object on backend:
    updateCourseHelper(passedCourse!._id, diff).then(() => {
      saveChangesHandler(updatedCourse)
    })
  }

  const discardChanges = () => {
    //set Course to what it was
    //set title to what it was and other fields for Step 1
    //change state to
    // const course = { ...passedCourse }

    setCourse(passedCourse)

    // if (course) {
    //   course.title ? setTitle(course.title) : setTitle(undefined)

    //   course.description
    //     ? setDesctiption(course.description)
    //     : setDesctiption(undefined)

    //   if (course.category) {
    //     const category = getCategory(categories, course.category)
    //     setCategory(category)
    //     //set subCategory
    //     if (course.subCategory) {
    //       const subCategory = getCategory(category.children, course.subCategory)
    //       setSubCategory(subCategory)
    //       //set subSubCategory
    //       if (course.subSubCategory) {
    //         const subSubCategory = getCategory(
    //           subCategory.children,
    //           course.subSubCategory
    //         )
    //         setSubSubCategory(subSubCategory)
    //       } else {
    //         setSubSubCategory(undefined)
    //       }
    //     } else {
    //       setSubCategory(undefined)
    //     }
    //   } else {
    //     setCategory(undefined)
    //   }
    // }

    //discardChanges on parent component
    discardChangesHandler()
  }

  return {
    course,
    categories,
    title: course.title,
    category,
    subCategory,
    subSubCategory,
    description,
    saveChanges,
    discardChanges,
    handleTitleChange,
    handleAgeLimitChange,
    handleLevelChange,
    handleCategoryChange,
    handleSubCategoryChange,
    handleSubSubCategoryChange,
    handleDescriptionChange,
  }
}

export default useStepOne
