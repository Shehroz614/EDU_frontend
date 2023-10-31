import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'
import SectionRow from '../SectionRow'

import {
  Course,
  Lecture,
  UpdateOutline,
  Section,
  ContentType,
  Resource,
  CourseVersion,
} from '@ugu/types'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Button from 'components/atoms/Button'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { useCreateCourse } from '@contexts/CreateCourse'

type CourseMaterialsProps = {
  sections: Section[]
  course: Course
  courseId: string
  setSections: (sections: Section[]) => void
  addNewLecture: (
    sectionId: string,
    title: string,
    preview: boolean,
    contentType: ContentType,
    content: any,
    resources: Resource[],
    duration: number
  ) => void
  showAddSectionBlock: () => void
  showEditSectionBlock: (section: Section) => void
  showAddLectureBlock: (section: Section) => void
  showEditLectureBlock: (lecture: Lecture, section: Section) => void
  deleteSection: (section: Section) => void
  deleteLecture: (lecture: Lecture, section: Section) => void
  outlineState: UpdateOutline
  setOutlineState: (outlineState: UpdateOutline) => void
  setBottomNotification: Function
  disabled?: boolean
}

const MaterialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  overflow: hidden;
`

const SectionsWrapper = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 27px;
`

//ANCHOR: CourseMaterials
const CourseMaterials: React.FunctionComponent<CourseMaterialsProps> = (
  props
) => {
  const { sections, setSections, course, courseId } = props
  const { outlineState, setOutlineState } = props
  const {
    addNewLecture,
    showEditSectionBlock,
    deleteSection,
    showAddLectureBlock,
    showEditLectureBlock,
    showAddSectionBlock,
    deleteLecture,
    setBottomNotification,
    disabled,
  } = props

  const { liveVersion, versions } = useCreateCourse()

  function doesLectureExistInLive(
    course: CourseVersion,
    lectureId: string
  ): {
    isExist: boolean
    sectionId?: string | null
  } {
    for (const section of course.course_materials.sections) {
      for (const lecture of section.lectures) {
        if (lecture._id === lectureId) {
          return {
            isExist: true,
            sectionId: section._id,
          } // Lecture with the given ID exists in the course
        }
      }
    }
    return {
      isExist: false,
    } // Lecture with the given ID does not exist in the course
  }

  const reorder = (list: Lecture[], startIndex: number, endIndex: number) => {
    const result = Array.from(list) //create new Lecture list
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed) //move Lecture to endIndex
    return result // return updated Lecture array
  }

  function onDragEnd(result: any) {
    const { source, destination, type } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // to check if lecture is live and we are adding it into a draft lecture

    const { isExist, sectionId } = doesLectureExistInLive(
      versions[liveVersion ? liveVersion : 0],
      result.draggableId
    )
    if (isExist) {
      if (sectionId !== result?.destination?.droppableId) {
        return
      }
    }

    const newOutlineUpdated: UpdateOutline = {
      ...outlineState,
      updated: true,
    }

    if (newOutlineUpdated.sectionsBeforeUpdate.length <= 0) {
      newOutlineUpdated.sectionsBeforeUpdate = _.cloneDeep(sections)
      console.log(
        'Setting sectionsBeforeUpdate, sections: ',
        sections,
        'sectionsBefore: ',
        newOutlineUpdated.sectionsBeforeUpdate
      )
    }

    console.log('outline obj if smth changes: ', newOutlineUpdated)

    if (type === 'sections') {
      console.log('source: ', source, ' destination: ', destination)
      const updatedSections = [...sections]
      const [removed] = updatedSections.splice(source.index, 1)
      updatedSections.splice(destination.index, 0, removed)
      newOutlineUpdated.sectionsUpdated = true
      !outlineState?.sectionsUpdated && setOutlineState(newOutlineUpdated)
      setSections(updatedSections)
      return
    }

    const sInd = source.droppableId
    const dInd = destination.droppableId

    //within one section
    if (sInd === dInd) {
      const section = {
        ...sections.filter((section) => section._id == String(sInd))[0],
      }

      section.lectures = reorder(
        section.lectures,
        source.index,
        destination.index
      )
      //check if section_id is not in the list and if not add it
      const notExist = newOutlineUpdated.sections.indexOf(section._id) === -1
      notExist && newOutlineUpdated.sections.push(section._id)

      const updatedSections = [
        ...sections.map((sec) => {
          return sec._id === section._id ? section : sec
        }),
      ]
      notExist && setOutlineState(newOutlineUpdated)
      setSections(updatedSections)
    }
    //from one section to another
    else {
      const sourceSection: Section = {
        ...sections.filter((section) => {
          return section._id == sInd
        })[0],
      }

      const destinationSection: Section = {
        ...sections.filter((section) => {
          return section._id == dInd
        })[0],
      }

      const notExistSource =
        newOutlineUpdated.sections.indexOf(sourceSection._id) === -1

      notExistSource && newOutlineUpdated.sections.push(sourceSection._id)

      const notExistDestination =
        newOutlineUpdated.sections.indexOf(destinationSection._id) === -1

      notExistDestination &&
        newOutlineUpdated.sections.push(destinationSection._id)
      console.log(newOutlineUpdated)

      const [removedLecture] = sourceSection.lectures.splice(source.index, 1)

      destinationSection.lectures.splice(destination.index, 0, removedLecture)

      const updatedSections = [
        ...sections.map((section) => {
          return section._id === sourceSection._id
            ? sourceSection
            : section._id === destinationSection._id
            ? destinationSection
            : section
        }),
      ]

      if (notExistSource || notExistDestination) {
        setOutlineState(newOutlineUpdated)
      }
      setSections(updatedSections)
    }
  }

  const getSections = (sections: Section[]) => {
    if (sections) {
      return sections.map((section, index) => {
        return (
          <SectionRow
            index={index}
            section={section}
            course={course}
            courseId={courseId}
            key={section._id}
            showEditSection={showEditSectionBlock}
            deleteSection={deleteSection}
            addNewLecture={addNewLecture}
            addNewLectureBlock={showAddLectureBlock}
            showEditLecture={showEditLectureBlock}
            deleteLecture={deleteLecture}
            setBottomNotification={setBottomNotification}
            disabled={disabled}
          />
        )
      })
    }
  }
  const { t } = useTranslation('common')
  return (
    <MaterialsWrapper>
      {sections && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections" type="sections">
            {(provided, snapshot) => (
              <SectionsWrapper
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={disabled ? false : snapshot.isDraggingOver}
              >
                {getSections(sections)}
                {provided.placeholder}
              </SectionsWrapper>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Button
        minHeight="2.8rem"
        backgroundColor={colors.uguYellow}
        marginLeft="0.5rem"
        marginRight="0.5rem"
        width="37rem"
        text={t('buttons.addSection')}
        fontFamily="RobotoBold"
        onClick={() => showAddSectionBlock()}
        disabled={disabled}
      />
    </MaterialsWrapper>
  )
}

export default CourseMaterials
