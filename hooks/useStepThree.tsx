// @ts-nocheck
import { difference } from 'helpers/difference'
import updateCourseHelper from 'helpers/updateCourseHelper'
import { useState, useEffect } from 'react'
import { Content, Course } from 'types/course'

const useStepThree = (
  passedCourse: Course,
  saveCourse: (newCourse: Course) => void
) => {
  const [course, setCourse] = useState<Course>(passedCourse)
  const [shortDescription, setShortDescription] = useState<string>()
  const [aboutAuthor, setAboutAuthor] = useState<string>()
  const [presentationalVideo, setPresentationalVideo] = useState<
    Content | undefined
  >(undefined)
  const [presentationalImage, setPresentationalImage] = useState<string>()
  const [isPresentationalVideoUploading, setIsPresentationalVideoUploading] =
    useState<boolean>(false)
  const [requirements, setRequirements] = useState<string[]>([])
  const [results, setResults] = useState<string[]>([])
  const [price, setPrice] = useState<number>(0)

  useEffect(() => {
    if (course) {
      if (course.presentationalVideo) {
        setPresentationalVideo(course.presentationalVideo)
      }
      if (course.presentationalImage) {
        setPresentationalImage(course.presentationalImage)
      }
      if (course.requirements.length > 0) {
        setRequirements(course.requirements)
      }
      if (course.whatYouWillLearn.length > 0) {
        setResults(course.whatYouWillLearn)
      }
      if (course.price && course.price > 0) {
        setPrice(course.price)
      }
      if (course.aboutAuthor !== undefined && course.aboutAuthor !== '') {
        setAboutAuthor(course.aboutAuthor)
      }
      if (
        course.shortCourseDescription !== undefined &&
        course.shortCourseDescription !== ''
      ) {
        setShortDescription(course.shortCourseDescription)
      }

      //set title
      //   course.title && setTitle(course.title)
      //   //set overview
      //   course.description && setDesctiption(course.description)
      //   //set category
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
      //       }
      //     }
      //   }
    }
  }, [course])

  //update title in Course obj
  //   useEffect(() => {
  //     if (title) {
  //       const newCourse = { ...course, title: title }
  //       setCourse(newCourse)
  //     }
  //   }, [title])

  //ANCHOR: Change handlers:

  // const handleDescriptionChange = (newDescription: string) => {
  //   if (newDescription !== description) {
  //     console.log('description before: ', description)
  //     console.log('updated Description: ', newDescription)
  //     setDesctiption(newDescription)
  //   }
  // }

  const saveChanges = (updatedCourse: Course) => {
    console.log('changes saved!')
    console.log('Updated course:', updatedCourse)
    const diff = difference(updatedCourse, passedCourse)
    console.log('Difference: ', diff)
    updateCourseHelper(passedCourse!._id, diff).then(() => {
      saveCourse(updatedCourse)
    })
  }

  const editPrice = (newPrice: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      console.log('Edited price: ', newPrice)

      if (newPrice !== undefined && newPrice >= 0 && newPrice < 1000000) {
        const updatedCourse: Course = {
          ...course,
          price: newPrice,
        }
        const diff = { price: newPrice }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('New Price has been saved!')
              setPrice(newPrice)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error('Error while saving the price has occured' + err)
              reject(false)
            })
        } else {
          reject(false)
        }
      } else {
        console.error('Error: price is invalid!')
        reject(false)
      }
    })
  }

  const addRequirementHandler = (
    newItem: string
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const newRequirements = [...requirements]
      if (newItem !== '' || newItem !== undefined) {
        //add new requirement to requirements[]
        newRequirements.push(newItem)
      } else {
        console.error('Error: requirement cannot be null!')
        reject(false)
      }
      if (newRequirements && newRequirements.length > 0) {
        const updatedCourse: Course = {
          ...course,
          requirements: newRequirements,
        }
        const diff = { requirements: newRequirements }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('New Requirement has been added!')
              setRequirements(newRequirements)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error(
                'Error while adding a new requirement has occured' + err
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

  const editRequirementHandler = (
    newItem: string,
    atIndex: number
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let newRequirements: string[] = []
      if (newItem !== '' || newItem !== undefined) {
        newRequirements = requirements.map((item, index) => {
          return index === atIndex ? newItem : item
        })
      } else {
        console.error('Error: requirement cannot be null!')
        reject(false)
      }
      if (newRequirements && newRequirements.length > 0) {
        const updatedCourse: Course = {
          ...course,
          requirements: newRequirements,
        }
        const diff = { requirements: newRequirements }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('New Requirement has been edited!')
              setRequirements(newRequirements)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error(
                'Error while adding a new requirement has occured' + err
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

  const deleteRequirementHandler = (
    atIndex: number
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let newRequirements: string[] = [...requirements]
      if (newRequirements.length > 0) {
        if (newRequirements[atIndex] !== undefined) {
          newRequirements.splice(atIndex, 1)
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
      if (newRequirements) {
        const updatedCourse: Course = {
          ...course,
          requirements: newRequirements,
        }
        const diff = { requirements: newRequirements }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('Requirement has been deleted!')
              setRequirements(newRequirements)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error(
                'Error while adding a new requirement has occured' + err
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

  const addResultHandler = (
    newItem: string
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const newResults = [...results]
      if (newItem !== '' || newItem !== undefined) {
        //add new requirement to requirements[]
        newResults.push(newItem)
      } else {
        console.error('Error: result cannot be null!')
        reject('Error: result cannot be null!')
      }
      if (newResults && newResults.length > 0) {
        const updatedCourse: Course = {
          ...course,
          whatYouWillLearn: newResults,
        }
        const diff = { whatYouWillLearn: newResults }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('New Result has been added!')
              setResults(newResults)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error('Error while adding a new result has occured' + err)
              reject('Error while adding a new result has occured: ' + err)
            })
        } else {
          reject('Error while adding a new result has occured.')
        }
      } else {
        reject('Error while adding a new result has occured.')
      }
    })
  }

  const editResultHandler = (
    newItem: string,
    atIndex: number
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let newResults: string[] = []
      if (newItem !== '' || newItem !== undefined) {
        newResults = results.map((item, index) => {
          return index === atIndex ? newItem : item
        })
      } else {
        console.error('Error: result cannot be null!')
        reject('Error: result cannot be null!')
      }
      if (newResults && newResults.length > 0) {
        const updatedCourse: Course = {
          ...course,
          whatYouWillLearn: newResults,
        }
        const diff = { whatYouWillLearn: newResults }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('New Result has been edited!')
              setResults(newResults)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error('Error while editing result has occured' + err)
              reject('Error while editing result has occured' + err)
            })
        } else {
          reject('Error while editing result has occured')
        }
      } else {
        reject('Error while editing result has occured')
      }
    })
  }

  const deleteResultHandler = (
    atIndex: number
  ): //use Promise - don't use - controll from here

  Promise<boolean> => {
    return new Promise((resolve, reject) => {
      let newResults: string[] = [...results]
      if (newResults.length > 0) {
        if (newResults[atIndex] !== undefined) {
          newResults.splice(atIndex, 1)
        } else {
          console.error(
            'Delete error: result at the specified index does not exist!'
          )
          reject('Delete error: result at the specified index does not exist!')
        }
      } else {
        console.error('Error: requirement cannot be null!')
        reject('Delete error: result at the specified index does not exist!')
      }
      if (newResults) {
        const updatedCourse: Course = {
          ...course,
          whatYouWillLearn: newResults,
        }
        const diff = { whatYouWillLearn: newResults }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('Result has been deleted!')
              setResults(newResults)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error('Error while deleting result has occured' + err)
              reject('Error while deleting result has occured' + err)
            })
        } else {
          reject('Error while deleting result has occured')
        }
      } else {
        reject('Error while deleting result has occured')
      }
    })
  }

  const editAboutAuthorHandler = (newAboutAuthor: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (
        newAboutAuthor !== '' ||
        (newAboutAuthor !== undefined && aboutAuthor !== newAboutAuthor)
      ) {
        const updatedCourse: Course = {
          ...course,
          aboutAuthor: newAboutAuthor,
        }
        const diff = { aboutAuthor: newAboutAuthor }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('New AboutAuthor has been edited!')
              setAboutAuthor(newAboutAuthor)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error('Error while editing AboutAuthor has occured' + err)
              reject('Error while editing AboutAuthor has occured' + err)
            })
        } else {
          reject('Error while editing AboutAuthor has occured')
        }
      } else {
        reject('Error while editing AboutAuthor has occured')
      }
    })
  }

  const editShortDescriptionHandler = (
    newShortDescription: string
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (
        newShortDescription !== '' ||
        (newShortDescription !== undefined &&
          aboutAuthor !== newShortDescription)
      ) {
        const updatedCourse: Course = {
          ...course,
          shortCourseDescription: newShortDescription,
        }
        const diff = { shortCourseDescription: newShortDescription }
        if (passedCourse) {
          updateCourseHelper(passedCourse!._id, diff)
            .then(() => {
              saveCourse(updatedCourse)
            })
            .then(() => {
              console.log('Short Description has been edited!')
              setShortDescription(newShortDescription)
              resolve(true)
              //Show bottom pop-up that new Requirements has been added
            })
            .catch((err) => {
              console.error(
                'Error while editing Short Description has occured' + err
              )
              reject('Error while editing Short Description has occured' + err)
            })
        } else {
          reject('Error while editing Short Description has occured')
        }
      } else {
        reject('Error while editing Short Description has occured')
      }
    })
  }

  return {
    course,
    shortDescription,
    aboutAuthor,
    price,
    requirements,
    results,
    saveChanges,
    editPrice,
    presentationalVideo,
    presentationalImage,
    setPresentationalVideo,
    setPresentationalImage,
    isPresentationalVideoUploading,
    setIsPresentationalVideoUploading,
    addRequirementHandler,
    editRequirementHandler,
    deleteRequirementHandler,
    addResultHandler,
    editResultHandler,
    deleteResultHandler,
    editAboutAuthorHandler,
    editShortDescriptionHandler,
  }
}

export default useStepThree
