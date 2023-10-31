// @ts-nocheck
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react'
import { useCreateCourse } from '@contexts/CreateCourse'
import {
  ContentType,
  Lecture,
  Resource,
  Section,
  SimpleSection,
  UpdateOutline,
} from '@ugu/types'
import _ from 'lodash'
import {
  addCourseSection,
  deleteCourseSection,
  updateCourseSection,
  addCourseLecture,
  createCourseTextContent,
  linkCourseLectureWithContent,
  deleteCourseLecture,
  deleteCourseLectureContent,
  updateCourseLecture,
  updateCourseTextContent,
  updateCourseSectionsOrder,
  updateCourseLecturesOrder,
} from '@services/api/course'
import addCourseLectureContentMedia from '@services/api/course/addCourseLectureContentMedia'

type ActionProps = {
  showSectionBlock: boolean
  showLectureBlock: boolean
  newSection: boolean
  newLecture: boolean
  section?: Section
  lecture?: Lecture
}
type TUseStepTwo = {
  action: ActionProps
  editorBlockRef: RefObject<HTMLDivElement>
  outlineState: UpdateOutline
  setOutlineState: Dispatch<SetStateAction<UpdateOutline>>
  saveNewOutline: () => void
  cancelNewOutline: () => void
  showAddSectionBlock: () => void
  showEditSectionBlock: (e: Section) => void
  addNewSection: (title: string, description: string) => void
  editSection: (newTitle: string, sectionId: string) => void
  deleteSection: (e: Section) => void
  showAddLectureBlock: (e: Section) => void
  showEditLectureBlock: (lecture: Lecture, section: Section) => void
  addNewLecture: (
    sectionId: string,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources: Resource[],
    duration: number
  ) => void
  editLecture: (
    section: Section,
    lecture: Lecture,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources?: Resource[]
  ) => void
  deleteLecture: (lecture: Lecture, section: Section) => void
  updateSections: (e: Section[]) => void
  cancelSectionHandler: () => void
  createButtonDisabled: any
  addLectureContentMedia?: (
    blob: Blob,
    onProgress: (e: any) => void
  ) => Promise<any>
}
const useStepTwo = (): TUseStepTwo => {
  const { course_id, course, saveChanges, setBottomNotification } =
    useCreateCourse()
  const editorBlockRef = useRef<HTMLDivElement>(null)
  const previousScrollPosition = useRef<number>(0)

  const [action, setAction] = useState<ActionProps>({
    showSectionBlock: false,
    showLectureBlock: false,
    newSection: true,
    newLecture: true,
  })
  const [outlineState, setOutlineState] = useState<UpdateOutline>({
    updated: false,
    sectionsUpdated: false,
    sections: [],
    sectionsBeforeUpdate: [],
  })

  const [createButtonDisabled, setCreateButtonDisabled] = useState(false)

  const saveNewOutline = async () => {
    if (course) {
      const sections = course.course_materials.sections as Section[]
      if (outlineState.sectionsUpdated && outlineState.sections.length <= 0) {
        try {
          const newSectionsOrder: string[] = sections.map(
            (section) => section._id
          )
          const response = await updateCourseSectionsOrder(
            course_id,
            course.version,
            newSectionsOrder
          )
          saveChanges({
            ...course,
            course_materials: {
              sections: response,
            },
          })
          setBottomNotification({
            message: 'New outline has been saved',
            actionType: 'success',
          })
        } catch (err) {
          setBottomNotification({
            message: ('Error updating outline has occurred: ' + err) as string,
            actionType: 'error',
          })
        }
      }

      if (outlineState.sections.length > 0) {
        try {
          const simplerSections: SimpleSection[] = [
            ...sections.map((section: Section) => {
              return {
                _id: section._id as string,
                lectures: section.lectures.map((lecture: Lecture) => {
                  return {
                    _id: lecture._id as string,
                  }
                }),
              }
            }),
          ]
          await updateCourseLecturesOrder(
            course_id,
            course.version,
            simplerSections
          )
          setBottomNotification({
            message: 'New outline has been saved',
            actionType: 'success',
          })
        } catch (err) {
          setBottomNotification({
            message: ('Error updating outline has occurred: ' + err) as string,
            actionType: 'error',
          })
        }
      }
      setOutlineState({
        updated: false,
        sectionsUpdated: false,
        sections: [],
        sectionsBeforeUpdate: [],
      })
    }
  }
  const cancelNewOutline = () => {
    if (course) {
      saveChanges({
        ...course,
        course_materials: {
          sections: outlineState.sectionsBeforeUpdate,
        },
      })
      setOutlineState({
        updated: false,
        sectionsUpdated: false,
        sections: [],
        sectionsBeforeUpdate: [],
      })
    }
  }

  const showAddSectionBlock = async () => {
    if (!action.showSectionBlock) {
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
    } else {
      setBottomNotification({
        message: 'Editing is in progress. Please finish it first.',
        actionType: 'notification',
      })
      previousScrollPosition.current = window.scrollY
      editorBlockRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }
  const showEditSectionBlock = async (section: Section) => {
    if (!action.showSectionBlock) {
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
    } else {
      setBottomNotification({
        message: 'Editing is in progress. Please finish it first.',
        actionType: 'notification',
      })
      previousScrollPosition.current = window.scrollY
      editorBlockRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }
  const addNewSection = (title: string, description: string) => {
    return new Promise(async (resolve, reject) => {
      if (course) {
        try {
          if (!title) {
            setBottomNotification({
              message: 'Section title is required',
              actionType: 'error',
            })
            return reject()
          }
          if (!description) {
            setBottomNotification({
              message: 'Section Description is required',
              actionType: 'error',
            })
            return reject()
          }
          const newSection = await addCourseSection(course_id, course.version, {
            title,
            description,
          })
          const updatedSections = course.course_materials?.sections
            ? [...course.course_materials.sections, newSection]
            : [newSection]

          saveChanges({
            ...course,
            course_materials: {
              sections: updatedSections,
            },
          })

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
          window.scroll({
            top: previousScrollPosition.current,
            behavior: 'smooth',
          })
          resolve(newSection)
        } catch (err) {
          setBottomNotification({
            message: err.message,
            actionType: 'error',
          })
          reject()
        }
      } else {
        reject()
      }
    })
  }
  const editSection = async (newTitle: string, sectionId: string) => {
    if (course) {
      try {
        const updatedSection = await updateCourseSection(
          course_id,
          course.version,
          sectionId,
          { title: newTitle }
        )
        const updatedSections = course.course_materials?.sections.map(
          (section: Section) => {
            return section._id === updatedSection._id ? updatedSection : section
          }
        )
        saveChanges({
          ...course,
          course_materials: {
            sections: updatedSections,
          },
        })
        setBottomNotification({
          message: 'Section has been updated successfully!',
          actionType: 'success',
        })
        cancelSectionHandler()
      } catch (err) {
        setBottomNotification({
          message: ('Error while editing Section has occured: ' +
            err) as string,
          actionType: 'error',
        })
      }
    }
  }
  const deleteSection = async (section: Section) => {
    if (course) {
      try {
        const sections = course.course_materials.sections as Section[]
        await deleteCourseSection(course_id, course.version, section._id)
        const updatedSections = [
          ...sections.filter(
            (sectionOrigin) => sectionOrigin._id !== section._id
          ),
        ]
        saveChanges({
          ...course,
          course_materials: {
            sections: updatedSections,
          },
        })
        setBottomNotification({
          message: 'Section has been deleted successfully!',
          actionType: 'success',
        })
        resetAction()
      } catch (err) {
        console.log(err)
        setBottomNotification({
          message: err.response.data.message,
          actionType: 'error',
        })
      }
    }
  }

  const showAddLectureBlock = async (section: Section) => {
    if (!action.showLectureBlock) {
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
    } else {
      setBottomNotification({
        message: 'Editing is in progress. Please finish it first.',
        actionType: 'notification',
      })
      previousScrollPosition.current = window.scrollY
      editorBlockRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }
  const showEditLectureBlock = async (lecture: Lecture, section: Section) => {
    console.log('Editing lecture: ', lecture, 'from section: ', section)
    if (!action.showLectureBlock) {
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
    } else {
      setBottomNotification({
        message: 'Editing is in progress. Please finish it first.',
        actionType: 'notification',
      })
      previousScrollPosition.current = window.scrollY
      editorBlockRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }
  const addNewLecture = async (
    sectionId: string,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources: Resource[],
    duration: number
  ) => {
    if (course) {
      const sections = course.course_materials.sections as Section[]
      if (contentType === 'video') {
        try {
          setCreateButtonDisabled(true)
          const lecture: Lecture = await addCourseLecture(
            course_id,
            course.version,
            sectionId,
            title,
            preview,
            duration
          )
          const linkLecturePromises = resources.map((resource) => {
            linkCourseLectureWithContent(
              course_id,
              course.version,
              sectionId,
              lecture._id,
              resource._id
            )
          })
          Promise.all(linkLecturePromises)
            .then(async () => {
              await linkCourseLectureWithContent(
                course_id,
                course.version,
                sectionId,
                lecture._id,
                content._id as string
              )
              const lectureWithContent = {
                ...lecture,
                content: content,
                resources: resources,
              }
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

              saveChanges({
                ...course,
                course_materials: {
                  sections: updatedSections,
                },
              })
              resetAction()
              setCreateButtonDisabled(false)
              setBottomNotification({
                message: 'A new Lecture has been added successfully!',
                actionType: 'success',
              })
              scrollToPreviousLocation()
            })
            .catch((err) => {
              setCreateButtonDisabled(false)
              console.log('Error linking video with resources: ', err)
              setBottomNotification({
                message:
                  ('Error occurred while linking Lecture with Resources: ' +
                    err) as string,
                actionType: 'error',
              })
            })
        } catch (err) {
          setCreateButtonDisabled(false)
          console.log('Error creating new lecture occurred: ', err)
          setBottomNotification({
            message: ('Error creating a new Lecture has occurred: ' +
              err) as string,
            actionType: 'error',
          })
        }
      } else if (contentType === 'text') {
        try {
          setCreateButtonDisabled(true)
          const lectureLength = estimateTextReadingTime(content)
          const textContent = await createCourseTextContent(
            course_id,
            course.version,
            {
              contentName: 'Test content',
              content: content,
              duration: lectureLength,
            }
          )
          const lecture = await addCourseLecture(
            course_id,
            course.version,
            sectionId,
            title,
            preview,
            lectureLength
          )
          const linkLecturePromises = resources.map((resource) => {
            linkCourseLectureWithContent(
              course_id,
              course.version,
              sectionId,
              lecture._id,
              resource._id
            )
          })
          Promise.all(linkLecturePromises)
            .then(async () => {
              await linkCourseLectureWithContent(
                course_id,
                course.version,
                sectionId,
                lecture._id,
                textContent._id
              )
              const lectureWithContent = {
                ...lecture,
                content: textContent,
                resources: resources,
              }
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

              saveChanges({
                ...course,
                course_materials: {
                  sections: updatedSections,
                },
              })
              resetAction()
              setCreateButtonDisabled(false)
              setBottomNotification({
                message: 'A new Lecture has been added successfully!',
                actionType: 'success',
              })
              scrollToPreviousLocation()
            })
            .catch((err) => {
              setCreateButtonDisabled(false)
              setBottomNotification({
                message:
                  ('Error occurred while linking Lecture with Resources: ' +
                    err) as string,
                actionType: 'error',
              })
            })
        } catch (err) {
          console.log('Error creating text content occurred: ', err)
          setBottomNotification({
            message: ('Error creating a new Lecture has occurred: ' +
              err) as string,
            actionType: 'error',
          })
          setCreateButtonDisabled(false)
        }
      }
    }
  }
  const editLecture = async (
    section: Section,
    lecture: Lecture,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources?: Resource[]
  ) => {
    if (course) {
      const sections = course.course_materials.sections as Section[]
      if (contentType === 'video') {
        if (lecture.title !== title || lecture.preview !== preview) {
          try {
            setCreateButtonDisabled(true)
            const updatedLecture: Lecture = await updateCourseLecture(
              course_id,
              course.version,
              section._id,
              lecture._id,
              title,
              preview
            )
            if (updatedLecture.content._id !== content._id) {
              await linkCourseLectureWithContent(
                course_id,
                course.version,
                section._id,
                updatedLecture._id,
                content._id as string
              )
              const lectureWithContent = {
                ...updatedLecture,
                content: content,
              }
              const updatedLectures = section.lectures.map((lecture) => {
                return lecture._id === lectureWithContent._id
                  ? lectureWithContent
                  : lecture
              })
              if (resources) {
                updatedLecture.resources = resources
              }
              const updatedSection = {
                ...section,
                lectures: updatedLectures,
              }
              const updatedSections = sections.map((section) => {
                return section._id === updatedSection._id
                  ? updatedSection
                  : section
              })
              if (lecture.content.type === 'text') {
                await deleteLectureTextContent(
                  section._id,
                  lecture._id,
                  lecture.content._id
                )
              }
              saveChanges({
                ...course,
                course_materials: {
                  sections: updatedSections,
                },
              })
              resetAction()
              setCreateButtonDisabled(false)
              setBottomNotification({
                message: 'Lecture has been updated succesfully!',
                actionType: 'success',
              })
              scrollToPreviousLocation()
            } else {
              const updatedLectures = section.lectures.map((lecture) => {
                return lecture._id === updatedLecture._id
                  ? updatedLecture
                  : lecture
              })
              if (resources) {
                updatedLecture.resources = resources
              }
              const updatedSection = { ...section, lectures: updatedLectures }
              const updatedSections = sections.map((section) => {
                return section._id === updatedSection._id
                  ? updatedSection
                  : section
              })
              saveChanges({
                ...course,
                course_materials: {
                  sections: updatedSections,
                },
              })
              resetAction()
              setCreateButtonDisabled(false)
              setBottomNotification({
                message: 'Lecture has been updated successfully!',
                actionType: 'success',
              })
              scrollToPreviousLocation()
            }
          } catch (err) {
            console.log('Error while updating a lecture has occurred: ', err)
            setBottomNotification({
              message: 'Error has occurred while updating a Lecture!',
              actionType: 'error',
            })
          }
        } else if (lecture.content._id !== content._id) {
          try {
            setCreateButtonDisabled(true)
            await linkCourseLectureWithContent(
              course_id,
              course.version,
              section._id,
              lecture._id,
              content._id as string
            )
            const lectureWithContent = { ...lecture, content: content }
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
              await deleteLectureTextContent(
                section._id,
                lecture._id,
                lecture.content._id
              )
            }
            saveChanges({
              ...course,
              course_materials: {
                sections: updatedSections,
              },
            })
            resetAction()
            setCreateButtonDisabled(false)
            setBottomNotification({
              message: 'Lecture has been updated succesfully!',
              actionType: 'success',
            })
            scrollToPreviousLocation()
          } catch (err) {
            console.log('Error updating Video Content has occurred: ', err)
            setBottomNotification({
              message: 'Error has occurred while updating a Lecture!',
              actionType: 'error',
            })
          }
        } else if (lecture && !_.isEqual(resources, lecture.resources)) {
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
          saveChanges({
            ...course,
            course_materials: {
              sections: updatedSections,
            },
          })
          setBottomNotification({
            message: 'Lecture has been updated successfully!',
            actionType: 'success',
          })
          resetAction()
          scrollToPreviousLocation()
        } else {
          resetAction()
          scrollToPreviousLocation()
        }
      } else if (contentType === 'text') {
        if (lecture.title !== title || lecture.preview !== preview) {
          try {
            setCreateButtonDisabled(true)
            const updatedLecture = await updateCourseLecture(
              course_id,
              course.version,
              section._id,
              lecture._id,
              title,
              preview
            )
            if (resources) {
              updatedLecture.resources = resources
            }
            if (updatedLecture.content._id !== content._id) {
              //content has changed - so link with another
              try {
                const lectureLength = estimateTextReadingTime(content)
                const textContent = await createCourseTextContent(
                  course_id,
                  course.version,
                  {
                    contentName: 'Test content',
                    content: content,
                    duration: lectureLength,
                  }
                )
                await linkCourseLectureWithContent(
                  course_id,
                  course.version,
                  section._id,
                  updatedLecture._id,
                  textContent._id as string
                )
                const lectureWithContent = {
                  ...updatedLecture,
                  content: textContent,
                }
                const updatedLectures = section.lectures.map((lecture) => {
                  return lecture._id === lectureWithContent._id
                    ? lectureWithContent
                    : lecture
                })
                const updatedSection = {
                  ...section,
                  lectures: updatedLectures,
                }
                const updatedSections = sections.map((section) => {
                  return section._id === updatedSection._id
                    ? updatedSection
                    : section
                })
                saveChanges({
                  ...course,
                  course_materials: {
                    sections: updatedSections,
                  },
                })
                resetAction()
                setCreateButtonDisabled(false)
                setBottomNotification({
                  message: 'Lecture has been updated successfully!',
                  actionType: 'success',
                })
              } catch (err) {
                setBottomNotification({
                  message: ('Error while updating a Lecture has occurred: ' +
                    err) as string,
                  actionType: 'error',
                })
              }
            } else {
              //content id hasn't changed - it's the same object
              //check if textContent(actual content) has changed
              if (updatedLecture.content.content !== content.content) {
                try {
                  const lectureLength = estimateTextReadingTime(content)
                  await updateCourseTextContent(
                    course_id,
                    course.version,
                    updatedLecture.content._id,
                    {
                      content: content,
                      contentName: 'Test content',
                      duration: lectureLength, //later change to be dynamic
                    }
                  )
                  const updatedLectures = section.lectures.map((lecture) => {
                    return lecture._id === updatedLecture._id
                      ? updatedLecture
                      : lecture
                  })
                  const updatedSection = {
                    ...section,
                    lectures: updatedLectures,
                  }
                  const updatedSections = sections.map((section) => {
                    return section._id === updatedSection._id
                      ? updatedSection
                      : section
                  })
                  saveChanges({
                    ...course,
                    course_materials: {
                      sections: updatedSections,
                    },
                  })
                  setCreateButtonDisabled(false)
                  setBottomNotification({
                    message: 'Lecture has been updated successfully!',
                    actionType: 'success',
                  })
                } catch (err) {
                  console.log('Error updating Text Content has occurred: ', err)
                  setBottomNotification({
                    message: 'Error has occurred while updating a Lecture!',
                    actionType: 'error',
                  })
                }
              }
            }
            scrollToPreviousLocation()
          } catch (err) {
            console.log('Error while updating a lecture has occurred: ', err)
            setBottomNotification({
              message: 'Error has occurred while updating a Lecture!',
              actionType: 'error',
            })
          }
        } else if (lecture.content._id !== content._id) {
          try {
            setCreateButtonDisabled(true)
            const lectureLength = estimateTextReadingTime(content)
            const textContent = await createCourseTextContent(
              course_id,
              course.version,
              {
                contentName: 'Test content',
                content: content,
                duration: lectureLength,
              }
            )
            await linkCourseLectureWithContent(
              course_id,
              course.version,
              section._id,
              lecture._id,
              textContent._id as string
            )
            const lectureWithContent = { ...lecture, content: textContent }
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
            saveChanges({
              ...course,
              course_materials: {
                sections: updatedSections,
              },
            })
            resetAction()
            setCreateButtonDisabled(false)
            setBottomNotification({
              message: 'Lecture has been updated successfully!',
              actionType: 'success',
            })
            scrollToPreviousLocation()
          } catch (err) {
            console.log('Error creating text content occured: ', err)
            setBottomNotification({
              message: ('Error while updating a Lecture has occurred: ' +
                err) as string,
              actionType: 'error',
            })
          }
        } else if (lecture && !_.isEqual(resources, lecture.resources)) {
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
          saveChanges({
            ...course,
            course_materials: {
              sections: updatedSections,
            },
          })
          setBottomNotification({
            message: 'Lecture has been updated successfully!',
            actionType: 'success',
          })
          resetAction()
          scrollToPreviousLocation()
        } else {
          resetAction()
          scrollToPreviousLocation()
        }
      }
    }
  }
  const deleteLecture = async (lecture: Lecture, section: Section) => {
    if (course) {
      try {
        const sections = course.course_materials.sections as Section[]
        await deleteCourseLecture(
          course_id,
          course.version,
          section._id,
          lecture._id
        )
        const sectionToUpdate = {
          ...sections.filter(
            (sectionOrigin) => sectionOrigin._id === section._id
          )[0],
        }
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
        saveChanges({
          ...course,
          course_materials: {
            sections: sectionsUpdated,
          },
        })
        setBottomNotification({
          message: 'Lecture has been deleted successfully!',
          actionType: 'success',
        })
        resetAction()
      } catch (err) {
        setBottomNotification({
          message: err.response?.data?.message || 'Failed to delete lecture',
          actionType: 'error',
        })
      }
    }
  }
  const addLectureContentMedia = (blob: Blob, onProgress: (e) => void) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await addCourseLectureContentMedia(
          course_id,
          course?.version,
          blob,
          onProgress
        )
        resolve(response.mediaURL)
      } catch (err) {
        reject(err)
      }
    })
  }
  const deleteLectureTextContent = (
    sectionId: string,
    lectureId: string,
    contentId: string
  ) => {
    return deleteCourseLectureContent(
      course_id,
      course?.version as number,
      sectionId,
      lectureId,
      contentId
    )
      .then(() => {
        setBottomNotification({
          message: 'Text content has been deleted.',
          actionType: 'success',
          duration: 7,
        })
      })
      .catch((err) => {
        setBottomNotification({
          message: 'Error occurred while deleting Text content: ' + err,
          actionType: 'error',
          duration: 7,
        })
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
  const resetAction = () => {
    setAction({
      showSectionBlock: false,
      showLectureBlock: false,
      newSection: true,
      newLecture: true,
      section: undefined,
    })
  }
  const scrollToPreviousLocation = () => {
    window.scroll({
      top: previousScrollPosition.current,
      behavior: 'smooth',
    })
  }
  const updateSections = (sections: Section[]) => {
    if (course) {
      saveChanges({
        ...course,
        course_materials: {
          sections: sections,
        },
      })
    }
  }

  const estimateTextReadingTime = (text, wordsPerMinute = 200): Number => {
    const wordCount = text.split(/\s+/).length
    const readingTimeMinutes = wordCount / wordsPerMinute
    const readingTimeSeconds = Math.ceil(readingTimeMinutes * 60)

    return readingTimeSeconds
  }

  return {
    action,
    editorBlockRef,
    outlineState,
    setOutlineState,
    saveNewOutline,
    cancelNewOutline,
    showAddSectionBlock,
    showEditSectionBlock,
    addNewSection,
    editSection,
    deleteSection,
    showAddLectureBlock,
    showEditLectureBlock,
    addNewLecture,
    editLecture,
    deleteLecture,
    addLectureContentMedia,
    updateSections,
    cancelSectionHandler,
    createButtonDisabled,
  }
}
export default useStepTwo
