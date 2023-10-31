// @ts-nocheck
import React from 'react'
import { colors, fontFamilies } from 'configs/styles/config'
import Button from 'components/atoms/Button'
import { Lecture, Section } from '@ugu/types'
import SectionBlock from '@components/pages/create-course/SectionBlock'
import LectureBlock from '@components/pages/create-course/LectureBlock'
import CourseMaterials from '@components/pages/create-course/CourseMaterials'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useCreateCourse } from '@contexts/CreateCourse'
import useStepTwo from '@hooks/CreateCourses/useStepTwo'
import {
  StepContainer,
  ButtonWrapper,
  AddButtonWrapper,
  CreateCourseOutline,
  CreateCourseContainer,
} from '@styled_components/StepTwo/styled.components'

const StepTwo: React.FC = () => {
  const {
    course_id,
    course,
    setActiveStep,
    setBottomNotification,
    abortControllers,
    addAbortController,
    removeAbortController,
  } = useCreateCourse()
  const {
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
  } = useStepTwo()

  const { t } = useTranslation('common')

  return (
    <StepContainer>
      {course && (
        <CreateCourseContainer>
          <CreateCourseOutline>
            <CourseMaterials
              course={course}
              courseId={course_id}
              sections={course.course_materials.sections}
              showAddSectionBlock={showAddSectionBlock}
              showEditSectionBlock={showEditSectionBlock}
              deleteSection={deleteSection}
              showAddLectureBlock={showAddLectureBlock}
              showEditLectureBlock={showEditLectureBlock}
              addNewLecture={addNewLecture}
              deleteLecture={deleteLecture}
              setSections={updateSections}
              outlineState={outlineState}
              setOutlineState={setOutlineState}
              setBottomNotification={setBottomNotification}
              disabled={course?.status !== 'draft'}
            />
          </CreateCourseOutline>
          {outlineState.updated && (
            <AddButtonWrapper>
              <Button
                width="13rem"
                height="3rem"
                text={'Cancel'}
                fontFamily={fontFamilies.bold}
                backgroundColor={colors.uguPurple}
                color={colors.uguWhite}
                marginLeft="auto"
                marginRight="1.5rem"
                fontSize="0.9rem"
                fontWeight="bold"
                marginBottom="2rem"
                onClick={cancelNewOutline}
              />
              <Button
                width="13rem"
                height="3rem"
                text={'Save'}
                fontFamily={fontFamilies.bold}
                backgroundColor={colors.uguYellow}
                color={colors.uguPurple}
                fontSize="0.9rem"
                fontWeight="bold"
                marginBottom="2rem"
                onClick={saveNewOutline}
              />
            </AddButtonWrapper>
          )}
          <AnimatePresence mode="wait">
            {action.showSectionBlock && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5, type: 'tween' }}
              >
                <SectionBlock
                  ref={editorBlockRef}
                  newSection={action.newSection}
                  courseId={course_id}
                  section={action.section}
                  addNewSection={addNewSection}
                  editSection={editSection}
                  cancel={cancelSectionHandler}
                />
              </motion.div>
            )}
            {
              //show add Section
              action.showLectureBlock && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.5, type: 'tween' }}
                >
                  <LectureBlock
                    ref={editorBlockRef}
                    newLecture={action.newLecture}
                    courseId={course_id}
                    courseVersion={course.version}
                    section={action.section as Section}
                    lecture={action.lecture as Lecture}
                    addNewLecture={addNewLecture}
                    editLecture={editLecture}
                    cancel={cancelSectionHandler}
                    createBtnDisabled={createButtonDisabled}
                    setBottomNotification={setBottomNotification}
                    abortControllers={abortControllers}
                    addAbortController={addAbortController}
                    removeAbortController={removeAbortController}
                    onImageUpload={addLectureContentMedia}
                  />
                </motion.div>
              )
            }
          </AnimatePresence>
        </CreateCourseContainer>
      )}
      <ButtonWrapper>
        <Button
          text={t('buttons.Continue')}
          backgroundColor={colors.uguYellow}
          color="#1A1E3D"
          width="15rem"
          height="2.9rem"
          fontFamily={fontFamilies.bold}
          marginTop="8.8rem"
          onClick={() => setActiveStep(3)}
        />
      </ButtonWrapper>
    </StepContainer>
  )
}
export default StepTwo
