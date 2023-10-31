// @ts-nocheck
import { BottomNotification, CenterNotification } from '@ugu/types'
import {
  addNewLectureHelper,
  addNewSectionHelper,
  changeListOfItemsHelper,
  changeListOfSectionsHelper,
  createTextContent,
  deleteLectureContentHelper,
  deleteLectureHelper,
  deleteSectionHelper,
  editLectureHelper,
  editSectionHelper,
  linkContentWithLectureHelper,
  linkLectureWithResourceHelper,
  updateTextContent,
} from '@helpers/createCourseHelpers'
import _ from 'lodash'
import { useState, useRef } from 'react'
import {
  ContentType,
  Course,
  Lecture,
  Resource,
  Section,
  SimpleSection,
  UpdateOutline,
} from 'types/course'

//NOTE
//We use this type to controll what will be shown
//to the user
type ActionProps = {
  showSectionBlock: boolean
  showLectureBlock: boolean
  newSection: boolean
  newLecture: boolean
  section?: Section
  lecture?: Lecture
}

const useStepTwo = (
  passedCourse: Course,
  saveChanges: (newCourse: Course) => void
) => {
  // For dynamic smooth scrolling
  const editorBlockRef = useRef<HTMLDivElement>(null)
  const previousScrollPosition = useRef<number>(0)

  const [course] = useState<Course>(passedCourse)
  const [sections, setSections] = useState<Section[]>(
    passedCourse.course_materials.sections
  )

  const [createBtnDisabled, setCreateBtnDisabled] = useState(false)
  const [outlineState, setOutlineState] = useState<UpdateOutline>({
    updated: false,
    sectionsUpdated: false,
    sections: [],
    sectionsBeforeUpdate: [],
  })

  const [action, setAction] = useState<ActionProps>({
    showSectionBlock: false,
    showLectureBlock: false,
    newSection: true,
    newLecture: true,
  })

  //pop-up states
  const [bottomNotification, setBottomNotification] =
    useState<BottomNotification>()
  const [centerNotification, setCenterNotification] =
    useState<CenterNotification>()

  //show PopUpCenter
  const [showPopUp, setShowPopUp] = useState(true)
  const [showBottomPopUp, setShowBottomPopUp] = useState(false)

  const cancelNewOutline = () => {
    console.log('Sections Before: ', outlineState.sectionsBeforeUpdate)
    setSections(outlineState.sectionsBeforeUpdate)
    setOutlineState({
      updated: false,
      sectionsUpdated: false,
      sections: [],
      sectionsBeforeUpdate: [],
    })
  }

  const saveNewOutline = () => {
    //this one works!
    if (outlineState.sectionsUpdated && outlineState.sections.length <= 0) {
      //get sections order
      const newSectionsOrder: string[] = sections.map((section) => section._id)

      console.log('Sections Ids array: ', newSectionsOrder)

      changeListOfSectionsHelper(course._id, newSectionsOrder)
        .then((res) => {
          console.log('res from change list helper: ', res)
          const updatedCourse: Course = {
            ...course,
            course_materials: {
              sections: res,
            },
          }
          console.log('Updated course object: ', updatedCourse)
          setBottomNotification({
            message: 'New outline has been saved',
            actionType: 'success',
          })
          setShowBottomPopUp(true)
          saveChanges(updatedCourse)
        })
        .catch((err) => {
          setBottomNotification({
            message: ('Error updating outline has occured: ' + err) as string,
            actionType: 'error',
          })
          setShowBottomPopUp(true)
        })
    }

    if (outlineState.sections.length > 0) {
      //update each section's lectures order

      const simplerSections: SimpleSection[] = [
        ...sections.map((section: Section) => {
          const simplerSection = {
            _id: section._id as string,
            lectures: section.lectures.map((lecture: Lecture) => {
              const simplerLecture = {
                _id: lecture._id as string,
              }
              return simplerLecture
            }),
          }
          return simplerSection
        }),
      ]

      console.log('Simpler sections: ', simplerSections)
      changeListOfItemsHelper(course._id, simplerSections)
        .then(() => {
          setBottomNotification({
            message: 'New outline has been saved',
            actionType: 'success',
          })
          setShowBottomPopUp(true)
        })
        .catch((err) => {
          setBottomNotification({
            message: ('Error updating outline has occured: ' + err) as string,
            actionType: 'error',
          })
          setShowBottomPopUp(true)
        })
    }
    setOutlineState({
      updated: false,
      sectionsUpdated: false,
      sections: [],
      sectionsBeforeUpdate: [],
    })
  }
  //show AddSectionBlock
  const showAddSectionBlock = async () => {
    await setAction({
      showSectionBlock: true,
      showLectureBlock: false,
      newSection: true,
      newLecture: true,
    })
    // Persist current location for scroll-back
    previousScrollPosition.current = window.scrollY
    editorBlockRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  const showEditSectionBlock = async (section: Section) => {
    await setAction({
      showSectionBlock: true,
      showLectureBlock: false,
      newSection: false,
      newLecture: true,
      section: section,
    })
    // Persist current location for scroll-back
    previousScrollPosition.current = window.scrollY
    editorBlockRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  const addNewSection = (title: string) => {
    return new Promise((resolve, reject) => {
      addNewSectionHelper(course._id, title)
        .then((newSection) => {
          const updatedSections = [...sections, newSection]
          setSections(updatedSections)

          const updatedCourse: Course = {
            ...course,
            course_materials: {
              sections: updatedSections,
            },
          }

          saveChanges(updatedCourse)

          setAction({
            showSectionBlock: false,
            showLectureBlock: false,
            newSection: true,
            newLecture: true,
          })
          setBottomNotification({
            message: 'New Section has been added!',
            actionType: 'success',
          })
          setShowBottomPopUp(true)
          // Scroll back to last know position
          window.scroll({
            top: previousScrollPosition.current,
            behavior: 'smooth',
          })
          resolve(newSection)
        })
        .catch((err) => {
          setBottomNotification({
            message: ('Error adding a new Section has occured: ' +
              err) as string,
            actionType: 'error',
          })
          setShowBottomPopUp(true)
          reject()
        })
    })
  }

  const editSection = (newTitle: string, sectionId: string) => {
    //editSectionHelper(updatedSection).then(() => {
    //find old section and replace with updatedSection
    //})
    editSectionHelper(course._id, sectionId, newTitle)
      .then((updatedSection) => {
        const updatedSections = sections.map((section) => {
          return section._id === updatedSection._id ? updatedSection : section
        })
        console.log('Updated sections: ', updatedSections)
        setSections(updatedSections)

        const updatedCourse: Course = {
          ...course,
          course_materials: {
            sections: updatedSections,
          },
        }

        saveChanges(updatedCourse)

        setBottomNotification({
          message: 'Section has been updated succesfully!',
          actionType: 'success',
        })
        setShowBottomPopUp(true)
        cancelSectionHandler()
      })
      .catch((err) => {
        setBottomNotification({
          message: ('Error while editing Section has occured: ' +
            err) as string,
          actionType: 'error',
        })
        setShowBottomPopUp(true)
      })
  }

  //should be separated to Handler and actual Delete Function
  //Handler should ask the User if he really wants to delete it
  const deleteSection = (section: Section) => {
    deleteSectionHelper(course._id, section._id)
      .then(() => {
        const updatedSections = [
          ...sections.filter(
            (sectionOrigin) => sectionOrigin._id !== section._id
          ),
        ]

        setOutlineState({
          updated: false,
          sectionsUpdated: false,
          sections: [],
          sectionsBeforeUpdate: [],
        })
        setSections(updatedSections)

        const updatedCourse: Course = {
          ...course,
          course_materials: {
            sections: updatedSections,
          },
        }

        saveChanges(updatedCourse)

        setBottomNotification({
          message: 'Section has been deleted succesfully!',
          actionType: 'success',
        })
        setShowBottomPopUp(true)

        //to prevent editing deleted Lecture
        setAction({
          showSectionBlock: false,
          showLectureBlock: false,
          newSection: true,
          newLecture: true,
        })
      })
      .catch((err) => {
        console.log('Error while deleting Section has occured: ' + err)
        setBottomNotification({
          message: ('Error while deleting Section has occured: ' +
            err) as string,
          actionType: 'error',
        })
        setShowBottomPopUp(true)
      })
  }

  //this will show AddLectureBlock
  const showAddLectureBlock = async (section: Section) => {
    await setAction({
      showSectionBlock: false,
      showLectureBlock: true,
      newSection: true,
      newLecture: true,
      section: section,
    })
    // Persist current location for scroll-back
    previousScrollPosition.current = window.scrollY
    editorBlockRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
  //this will show EditLectureBlock
  const showEditLectureBlock = async (lecture: Lecture, section: Section) => {
    console.log('Editing lecture: ', lecture, 'from section: ', section)
    await setAction({
      showSectionBlock: false,
      showLectureBlock: true,
      newSection: true,
      newLecture: false,
      lecture: lecture,
      section: section,
    })
    // Persist current location for scroll-back
    previousScrollPosition.current = window.scrollY
    editorBlockRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  //should be separated to Handler and actual Delete Function
  //Handler should ask the User if he really wants to delete it
  const deleteLecture = (lecture: Lecture, section: Section) => {
    deleteLectureHelper(course._id, section._id, lecture._id)
      .then(() => {
        console.log('Lecture: ', lecture._id, ' has been deleted')
        //create a copy of the desired section
        const sectionToUpdate = {
          ...sections.filter(
            (sectionOrigin) => sectionOrigin._id === section._id
          )[0],
        }
        //update lectures[]
        sectionToUpdate.lectures = sectionToUpdate.lectures.filter(
          (lectureOrigin) => lectureOrigin._id !== lecture._id
        )
        const sectionsUpdated = [
          ...sections.map((section) => {
            return section._id === sectionToUpdate._id
              ? sectionToUpdate
              : section
          }),
        ]
        setOutlineState({
          updated: false,
          sectionsUpdated: false,
          sections: [],
          sectionsBeforeUpdate: [],
        })

        setSections(sectionsUpdated)
        const updatedCourse: Course = {
          ...course,
          course_materials: {
            sections: sectionsUpdated,
          },
        }

        saveChanges(updatedCourse)
        //to prevent editing deleted Lecture
        setAction({
          showSectionBlock: false,
          showLectureBlock: false,
          newSection: true,
          newLecture: true,
        })

        setBottomNotification({
          message: 'Lecture has been deleted succesfully!',
          actionType: 'success',
        })
        setShowBottomPopUp(true)
      })
      .catch((err) => {
        console.log(err)
        setBottomNotification({
          message: 'Error while deleting a Lecture has occured: ,' + err,
          actionType: 'error',
        })
        setShowBottomPopUp(true)
      })
  }

  const cancelSectionHandler = async () => {
    await setAction({
      showSectionBlock: false,
      showLectureBlock: false,
      newSection: true,
      newLecture: true,
    })
    window.scroll({
      top: previousScrollPosition.current,
      behavior: 'smooth',
    })
  }

  // const getNewLecture = (newLecture: Lecture) => {
  //   const updatedSection = { ...action.section }
  //   if (updatedSection) {
  //     updatedSection.lectures.push(newLecture)
  //   }
  //   const updatedSections = sections.map((section) => {
  //     return section._id === updatedSection._id ? updatedSection : section
  //   })

  //   setSections(updatedSections as Section[])

  //   setAction({
  //     showSectionBlock: false,
  //     showLectureBlock: false,
  //     newSection: true,
  //     newLecture: true,
  //     section: undefined,
  //   })
  // }

  const getEditedLecture = (editedLecture: Lecture) => {
    //create updated section
    let updatedSection: Section = {
      ...action.section!,
      lectures: action.section!.lectures.map((lecture: Lecture) => {
        console.log(lecture._id === editedLecture._id)
        return lecture._id === editedLecture._id ? editedLecture : lecture
      }),
    }

    //update sections
    const updatedSections = sections.map((section) => {
      return section._id === updatedSection._id ? updatedSection : section
    })

    setSections(updatedSections)
    setAction({
      showSectionBlock: false,
      showLectureBlock: false,
      newSection: true,
      newLecture: true,
      lecture: undefined,
      section: undefined,
    })
  }

  const addNewLecture = (
    sectionId: string,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources: Resource[]
  ) => {
    if (contentType === 'video') {
      setCreateBtnDisabled(true)
      addNewLectureHelper(course._id, sectionId, title, preview)
        .then((lecture: Lecture) => {
          console.log(lecture)
          const linkLecturePromises = resources.map((resource) => {
            linkLectureWithResourceHelper(
              course._id,
              sectionId,
              lecture._id,
              resource._id
            ).then(() => {})
          })
          Promise.all(linkLecturePromises)
            .then(() => {
              console.log('All resources have been linked')
              linkContentWithLectureHelper(
                course._id,
                sectionId,
                lecture._id,
                content._id as string
              )
                .then(() => {
                  const lectureWithContent = {
                    ...lecture,
                    content: content,
                    resources: resources,
                  }
                  console.log('lectureWithContent: ', lectureWithContent)

                  //update courseMaterials
                  const updatedSection = {
                    ...sections.filter((section) => {
                      return section._id === sectionId
                    })[0],
                  }
                  if (updatedSection) {
                    updatedSection.lectures.push(lectureWithContent)
                  }
                  const updatedSections = sections.map((section) => {
                    return section._id === updatedSection._id
                      ? updatedSection
                      : section
                  })

                  setSections(updatedSections as Section[])

                  setAction({
                    showSectionBlock: false,
                    showLectureBlock: false,
                    newSection: true,
                    newLecture: true,
                    section: undefined,
                  })
                  setCreateBtnDisabled(false)
                  setBottomNotification({
                    message: 'A new Lecture has been added succesfully!',
                    actionType: 'success',
                  })
                  setShowBottomPopUp(true)
                })
                .catch((err) => {
                  setCreateBtnDisabled(false)
                  console.log('Error linking video with lecture occured: ', err)
                  setBottomNotification({
                    message: ('Error creating a new Lecture has occured: ' +
                      err) as string,
                    actionType: 'error',
                  })
                  setShowBottomPopUp(true)
                })
            })
            .catch((err) => {
              setCreateBtnDisabled(false)
              console.log('Error linking video with resources: ', err)
              setBottomNotification({
                message:
                  ('Error occured while linking Lecture with Resources: ' +
                    err) as string,
                actionType: 'error',
              })
              setShowBottomPopUp(true)
            })
        })
        .catch((err) => {
          setCreateBtnDisabled(false)
          console.log('Error creating new lecture occured: ', err)
          setBottomNotification({
            message: ('Error creating a new Lecture has occured: ' +
              err) as string,
            actionType: 'error',
          })
          setShowBottomPopUp(true)
        })
    } else if (contentType === 'text') {
      //create text content
      setCreateBtnDisabled(true)
      createTextContent(course._id, content as string)
        .then((textContent) => {
          //create lecture
          console.log('Title for text content: ', title)
          addNewLectureHelper(course._id, sectionId, title, preview)
            .then((lecture: Lecture) => {
              const linkLecturePromises = resources.map((resource) => {
                linkLectureWithResourceHelper(
                  course._id,
                  sectionId,
                  lecture._id,
                  resource._id
                ).then(() => {})
              })
              Promise.all(linkLecturePromises)
                .then(() => {
                  console.log('All resources have been linked')
                  linkContentWithLectureHelper(
                    course._id,
                    sectionId,
                    lecture._id,
                    textContent._id
                  ).then(() => {
                    const lectureWithContent = {
                      ...lecture,
                      content: textContent,
                      resources: resources,
                    }
                    console.log('lectureWithContent: ', lectureWithContent)

                    //update courseMaterials
                    const updatedSection = {
                      ...sections.filter((section) => {
                        return section._id === sectionId
                      })[0],
                    }
                    if (updatedSection) {
                      updatedSection.lectures.push(lectureWithContent)
                    }
                    const updatedSections = sections.map((section) => {
                      return section._id === updatedSection._id
                        ? updatedSection
                        : section
                    })

                    setSections(updatedSections as Section[])

                    setAction({
                      showSectionBlock: false,
                      showLectureBlock: false,
                      newSection: true,
                      newLecture: true,
                      section: undefined,
                    })
                    setCreateBtnDisabled(false)

                    setBottomNotification({
                      message: 'A new Lecture has been added successfully!',
                      actionType: 'success',
                    })
                    setShowBottomPopUp(true)
                  })
                })
                .catch((err) => {
                  setCreateBtnDisabled(false)
                  console.log('Error linking video with resources: ', err)
                  setBottomNotification({
                    message:
                      ('Error occured while linking Lecture with Resources: ' +
                        err) as string,
                    actionType: 'error',
                  })
                  setShowBottomPopUp(true)
                })
            })
            .catch((err) => {
              setCreateBtnDisabled(false)
              console.log('Error creating new lecture occured: ', err)

              setBottomNotification({
                message: ('Error creating a new Lecture has occured: ' +
                  err) as string,
                actionType: 'error',
              })
              setShowBottomPopUp(true)
            })
        })
        .catch((err) => {
          //ANCHOR should be pop-up
          console.log('Error creating text content occured: ', err)
          setBottomNotification({
            message: ('Error creating a new Lecture has occured: ' +
              err) as string,
            actionType: 'error',
          })
          setShowBottomPopUp(true)
          setCreateBtnDisabled(false)
        })

      //connect lecture + content

      //call appropriate function to create lecture with content
    } else if (contentType === 'test') {
      //call appropriate function to create lecture with test
    }
  }

  // sectionId: string,
  //   title: string,
  //   preview: boolean,
  //   contentType: ContentType,
  //   content: any
  const editLecture = async (
    section: Section,
    lecture: Lecture,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources?: Resource[]
  ) => {
    if (contentType === 'video') {
      //if lecture title or preview has changed
      if (lecture.title !== title || lecture.preview !== preview) {
        setCreateBtnDisabled(true)
        await editLectureHelper(
          course._id,
          section._id,
          lecture._id,
          title,
          preview
        )
          .then((updatedLecture: Lecture) => {
            //update course-materials with updated lecture
            //check if content has changed
            console.log(
              'Content before: ',
              JSON.stringify(updatedLecture) +
                'New content: ' +
                JSON.stringify(content)
            )
            if (updatedLecture.content._id !== content._id) {
              //content has changed - so link with another

              //if previous contentType was text - delete it
              linkContentWithLectureHelper(
                course._id,
                section._id,
                updatedLecture._id,
                content._id as string
              )
                .then(() => {
                  const lectureWithContent = {
                    ...updatedLecture,
                    content: content,
                  }

                  //make a copy of the section with replaced lecture
                  const updatedLectures = section.lectures.map((lecture) => {
                    return lecture._id === lectureWithContent._id
                      ? lectureWithContent
                      : lecture
                  })
                  //update resources
                  if (resources) {
                    updatedLecture.resources = resources
                  }

                  const updatedSection = {
                    ...section,
                    lectures: updatedLectures,
                  }

                  //replace the section in sections
                  const updatedSections = sections.map((section) => {
                    return section._id === updatedSection._id
                      ? updatedSection
                      : section
                  })

                  if (lecture.content.type === 'text') {
                    //delete textContent
                    deleteLectureContentHelper(lecture.content._id)
                      .then(() => {
                        setBottomNotification({
                          message: 'Text content has been deleted.',
                          actionType: 'success',
                          duration: 7,
                        })
                        setShowBottomPopUp(true)
                      })
                      .catch((err) => {
                        setBottomNotification({
                          message:
                            'Error occured while deleting Text content: ' + err,
                          actionType: 'error',
                          duration: 7,
                        })
                        setShowBottomPopUp(true)
                      })
                  }

                  //set new sections
                  setSections(updatedSections as Section[])

                  //make UI changes(update page)
                  setAction({
                    showSectionBlock: false,
                    showLectureBlock: false,
                    newSection: true,
                    newLecture: true,
                    section: undefined,
                  })
                  setCreateBtnDisabled(false)

                  //show bottom pop-up with success message
                  setBottomNotification({
                    message: 'Lecture has been updated succesfully!',
                    actionType: 'success',
                  })
                  setShowBottomPopUp(true)
                })
                .catch((err) => {
                  console.log('Error updating Video Content has occured: ', err)
                  setBottomNotification({
                    message: 'Error has occured while updating a Lecture!',
                    actionType: 'error',
                  })
                  setShowBottomPopUp(true)
                })
            } else {
              //content hasn't changed
              //select and replace updated lecture
              console.log('Updated lecture: ', updatedLecture)
              const updatedLectures = section.lectures.map((lecture) => {
                return lecture._id === updatedLecture._id
                  ? updatedLecture
                  : lecture
              })
              //update resources
              if (resources) {
                updatedLecture.resources = resources
              }

              //update section with updated sections
              const updatedSection = { ...section, lectures: updatedLectures }

              //select and replace updated section
              const updatedSections = sections.map((section) => {
                return section._id === updatedSection._id
                  ? updatedSection
                  : section
              })

              //set new sections
              setSections(updatedSections as Section[])

              //make UI changes
              setAction({
                showSectionBlock: false,
                showLectureBlock: false,
                newSection: true,
                newLecture: true,
                section: undefined,
              })
              setCreateBtnDisabled(false)

              //show bottom pop-up with success message
              setBottomNotification({
                message: 'Lecture has been updated succesfully!',
                actionType: 'success',
              })
              setShowBottomPopUp(true)
            }
          })
          .catch((err) => {
            console.log('Error while updating a lecture has occured: ', err)
            setBottomNotification({
              message: 'Error has occured while updating a Lecture!',
              actionType: 'error',
            })
            setShowBottomPopUp(true)
          })
      }
      //just content has changed
      //without title or preview
      else if (lecture.content._id !== content._id) {
        setCreateBtnDisabled(true)
        await linkContentWithLectureHelper(
          course._id,
          section._id,
          lecture._id,
          content._id as string
        )
          .then(() => {
            const lectureWithContent = { ...lecture, content: content }
            //update resources
            if (resources) {
              lectureWithContent.resources = resources
            }

            const updatedLectures = section.lectures.map((lecture) => {
              return lecture._id === lectureWithContent._id
                ? lectureWithContent
                : lecture
            })
            const updatedSection = { ...section, lectures: updatedLectures }

            const updatedSections = sections.map((section) => {
              return section._id === updatedSection._id
                ? updatedSection
                : section
            })

            if (lecture.content.type === 'text') {
              //delete textContent
              deleteLectureContentHelper(lecture.content._id)
                .then(() => {
                  setBottomNotification({
                    message: 'Text content has been deleted.',
                    actionType: 'success',
                    duration: 7,
                  })
                  setShowBottomPopUp(true)
                })
                .catch((err) => {
                  setBottomNotification({
                    message:
                      'Error occured while deleting Text content: ' + err,
                    actionType: 'error',
                    duration: 7,
                  })
                  setShowBottomPopUp(true)
                })
            }

            setSections(updatedSections as Section[])

            setAction({
              showSectionBlock: false,
              showLectureBlock: false,
              newSection: true,
              newLecture: true,
              section: undefined,
            })
            setCreateBtnDisabled(false)

            //show bottom pop-up with success message
            setBottomNotification({
              message: 'Lecture has been updated succesfully!',
              actionType: 'success',
            })
            setShowBottomPopUp(true)
          })
          .catch((err) => {
            console.log('Error updating Video Content has occured: ', err)
            setBottomNotification({
              message: 'Error has occured while updating a Lecture!',
              actionType: 'error',
            })
            setShowBottomPopUp(true)
          })
      } else if (lecture && !_.isEqual(resources, lecture.resources)) {
        //if resources were deleted
        const lectureWithUpdatedResources = {
          ...lecture,
          resources: resources,
        }

        const updatedLectures = section.lectures.map((lecture) => {
          return lecture._id === lectureWithUpdatedResources._id
            ? lectureWithUpdatedResources
            : lecture
        })
        const updatedSection = { ...section, lectures: updatedLectures }

        const updatedSections = sections.map((section) => {
          return section._id === updatedSection._id ? updatedSection : section
        })

        setSections(updatedSections as Section[])

        //show bottom pop-up with success message
        setBottomNotification({
          message: 'Lecture has been updated succesfully!',
          actionType: 'success',
        })
        setShowBottomPopUp(true)

        setAction({
          showSectionBlock: false,
          showLectureBlock: false,
          newSection: true,
          newLecture: true,
          section: undefined,
        })
        window.scroll({
          top: previousScrollPosition.current,
          behavior: 'smooth',
        })
      } else {
        //nothing has changed
        setAction({
          showSectionBlock: false,
          showLectureBlock: false,
          newSection: true,
          newLecture: true,
          section: undefined,
        })
        window.scroll({
          top: previousScrollPosition.current,
          behavior: 'smooth',
        })
      }
    } else if (contentType === 'text') {
      // logic to update textContent
      // lecture or title has changed
      if (lecture.title !== title || lecture.preview !== preview) {
        setCreateBtnDisabled(true)
        //edit Lecture
        await editLectureHelper(
          course._id,
          section._id,
          lecture._id,
          title,
          preview
        )
          .then((updatedLecture: Lecture) => {
            //update resources
            if (resources) {
              updatedLecture.resources = resources
            }
            //check if content has changed
            if (updatedLecture.content._id !== content._id) {
              //content has changed - so link with another
              createTextContent(course._id, content as string)
                .then((textContent) => {
                  linkContentWithLectureHelper(
                    course._id,
                    section._id,
                    updatedLecture._id,
                    textContent._id as string
                  )
                    .then(() => {
                      const lectureWithContent = {
                        ...updatedLecture,
                        content: textContent,
                      }

                      //make a copy of the section with replaced lecture
                      const updatedLectures = section.lectures.map(
                        (lecture) => {
                          return lecture._id === lectureWithContent._id
                            ? lectureWithContent
                            : lecture
                        }
                      )
                      const updatedSection = {
                        ...section,
                        lectures: updatedLectures,
                      }

                      //replace the section in sections
                      const updatedSections = sections.map((section) => {
                        return section._id === updatedSection._id
                          ? updatedSection
                          : section
                      })

                      //set new sections
                      setSections(updatedSections as Section[])

                      //make UI changes(update page)
                      setAction({
                        showSectionBlock: false,
                        showLectureBlock: false,
                        newSection: true,
                        newLecture: true,
                        section: undefined,
                      })
                      setCreateBtnDisabled(false)

                      //show bottom pop-up with success message
                      setBottomNotification({
                        message: 'Lecture has been updated succesfully!',
                        actionType: 'success',
                      })
                      setShowBottomPopUp(true)
                    })
                    .catch((err) => {
                      console.log(
                        'Error linking Text Content with a Lecture has occured: ',
                        err
                      )
                      setBottomNotification({
                        message: 'Error has occured while updating a Lecture!',
                        actionType: 'error',
                      })
                      setShowBottomPopUp(true)
                    })
                })
                .catch((err) => {
                  //ANCHOR should be pop-up
                  console.log('Error creating text content occured: ', err)
                  setBottomNotification({
                    message: ('Error while updating a Lecture has occured: ' +
                      err) as string,
                    actionType: 'error',
                  })
                  setShowBottomPopUp(true)
                  setCreateBtnDisabled(false)
                })
            } else {
              //content id hasn't changed - it's the same object
              //check if textContent(actual content) has changed
              if (updatedLecture.content.content !== content.content) {
                //update textContent only
                updateTextContent(course._id, content as string)
                  .then((textContent) => {
                    console.log(
                      'Text content has been updated succesfully! Updated text content: ',
                      textContent
                    )
                    console.log('Updated lecture: ', updatedLecture)
                    //select and replace updated lecture
                    const updatedLectures = section.lectures.map((lecture) => {
                      return lecture._id === updatedLecture._id
                        ? updatedLecture
                        : lecture
                    })
                    //update section with updated sections
                    const updatedSection = {
                      ...section,
                      lectures: updatedLectures,
                    }

                    //select and replace updated section
                    const updatedSections = sections.map((section) => {
                      return section._id === updatedSection._id
                        ? updatedSection
                        : section
                    })

                    //set new sections
                    setSections(updatedSections as Section[])

                    //make UI changes
                    setAction({
                      showSectionBlock: false,
                      showLectureBlock: false,
                      newSection: true,
                      newLecture: true,
                      section: undefined,
                    })
                    setCreateBtnDisabled(false)

                    //show bottom pop-up with success message
                    setBottomNotification({
                      message: 'Lecture has been updated succesfully!',
                      actionType: 'success',
                    })
                    setShowBottomPopUp(true)
                  })
                  .catch((err) => {
                    console.log(
                      'Error updating Text Content has occured: ',
                      err
                    )
                    setBottomNotification({
                      message: 'Error has occured while updating a Lecture!',
                      actionType: 'error',
                    })
                    setShowBottomPopUp(true)
                  })
              }
            }
          })
          .catch((err) => {
            console.log('Error while updating a lecture has occured: ', err)
            setBottomNotification({
              message: 'Error has occured while updating a Lecture!',
              actionType: 'error',
            })
            setShowBottomPopUp(true)
          })
      }
      //just content has changed
      //without title or preview
      else if (lecture.content._id !== content._id) {
        setCreateBtnDisabled(true)
        await createTextContent(course._id, content as string)
          .then((textContent) => {
            linkContentWithLectureHelper(
              course._id,
              section._id,
              lecture._id,
              textContent._id as string
            )
              .then(() => {
                const lectureWithContent = { ...lecture, content: textContent }

                //update resources
                if (resources) {
                  lectureWithContent.resources = resources
                }

                const updatedLectures = section.lectures.map((lecture) => {
                  return lecture._id === lectureWithContent._id
                    ? lectureWithContent
                    : lecture
                })
                const updatedSection = { ...section, lectures: updatedLectures }

                const updatedSections = sections.map((section) => {
                  return section._id === updatedSection._id
                    ? updatedSection
                    : section
                })

                setSections(updatedSections as Section[])

                setAction({
                  showSectionBlock: false,
                  showLectureBlock: false,
                  newSection: true,
                  newLecture: true,
                  section: undefined,
                })
                setCreateBtnDisabled(false)

                //show bottom pop-up with success message
                setBottomNotification({
                  message: 'Lecture has been updated succesfully!',
                  actionType: 'success',
                })
                setShowBottomPopUp(true)
              })
              .catch((err) => {
                console.log('Error updating Video Content has occured: ', err)
                setBottomNotification({
                  message: 'Error has occured while updating a Lecture!',
                  actionType: 'error',
                })
                setShowBottomPopUp(true)
              })
          })
          .catch((err) => {
            //ANCHOR should be pop-up
            console.log('Error creating text content occured: ', err)
            setBottomNotification({
              message: ('Error while updating a Lecture has occured: ' +
                err) as string,
              actionType: 'error',
            })
            setShowBottomPopUp(true)
            setCreateBtnDisabled(false)
          })
      } else if (lecture && !_.isEqual(resources, lecture.resources)) {
        //if resources were deleted
        const lectureWithUpdatedResources = {
          ...lecture,
          resources: resources,
        }

        const updatedLectures = section.lectures.map((lecture) => {
          return lecture._id === lectureWithUpdatedResources._id
            ? lectureWithUpdatedResources
            : lecture
        })
        const updatedSection = { ...section, lectures: updatedLectures }

        const updatedSections = sections.map((section) => {
          return section._id === updatedSection._id ? updatedSection : section
        })

        setSections(updatedSections as Section[])

        //show bottom pop-up with success message
        setBottomNotification({
          message: 'Lecture has been updated succesfully!',
          actionType: 'success',
        })
        setShowBottomPopUp(true)

        setAction({
          showSectionBlock: false,
          showLectureBlock: false,
          newSection: true,
          newLecture: true,
          section: undefined,
        })
        window.scroll({
          top: previousScrollPosition.current,
          behavior: 'smooth',
        })
      } else {
        //nothing has changed

        setAction({
          showSectionBlock: false,
          showLectureBlock: false,
          newSection: true,
          newLecture: true,
          section: undefined,
        })
        window.scroll({
          top: previousScrollPosition.current,
          behavior: 'smooth',
        })
      }

      console.log('Fired here!')
    } else if (contentType === 'test') {
      //edit testContent lecture
    }
    window.scroll({
      top: previousScrollPosition.current,
      behavior: 'smooth',
    })
  }

  return {
    editorBlockRef,
    course,
    sections,
    action,
    outlineState,
    setOutlineState,
    setSections,
    showAddLectureBlock,
    showAddSectionBlock,
    showEditLectureBlock,
    showEditSectionBlock,
    deleteSection,
    deleteLecture,
    cancelNewOutline,
    saveNewOutline,
    // getNewLecture,
    getEditedLecture,
    cancelSectionHandler,
    addNewSection,
    editSection,
    addNewLecture,
    editLecture,
    createBtnDisabled,
    bottomNotification,
    setBottomNotification,
    centerNotification,
    setCenterNotification,
    showPopUp,
    setShowPopUp,
    showBottomPopUp,
    setShowBottomPopUp,
  }
}

export default useStepTwo
