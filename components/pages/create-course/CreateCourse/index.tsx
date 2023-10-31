import React from 'react'
import { useCreateCourse } from '@contexts/CreateCourse'
import CreateCourseSteps from '../CreateCourseSteps'
import Loader from '@components/organisms/Loader'
import { useTranslation } from 'next-i18next'
import XIcon from '@public/static/icons/x-icon'
import Layout from '@components/organisms/Layouts/WithSidebar'
import {
  CourseWrapper,
  CourseHeader,
  CourseHeaderTitle,
  LoaderContainer,
  ErrorContainer,
  ErrorIconWrapper,
  ErrorText,
} from '@styled_components/CreateCourse/styled.components'
import CourseStatus from '../CourseStatus'
import SidebarContent from '../SidebarContent'
import PopUpBottom from '@components/organisms/PopUpBottom'
import { BottomNotification, CenterNotification } from '@type/main'
import PopUpCenter from '@components/organisms/PopUpCenter'

const CreateCourse = (): JSX.Element => {
  const { t } = useTranslation(['common', 'createCourse'])
  const {
    course,
    courseLoaded,
    activeStep,
    bottomNotification,
    setBottomNotification,
    centerNotification,
  } = useCreateCourse()

  const getTitle = () => {
    const arrayOfTitles = [
      t('nameOfSection.addIntroInformation', { ns: 'createCourse' }),
      t('nameOfSection.addCourseMaterials', { ns: 'createCourse' }),
      t('nameOfSection.addMarketingDetails', { ns: 'createCourse' }),
      t('nameOfSection.setPriceForTheCourse', { ns: 'createCourse' }),
      t('nameOfSection.reviewTheCourseBeforePublish', { ns: 'createCourse' }),
    ]
    return arrayOfTitles[activeStep - 1]
  }
  // t('Hours', { ns: 'stickyCoursePageBlock' })
  return (
    <Layout
      sidebarHeader={() => <CourseStatus />}
      sidebarContent={({ isSidebarClosed, isSidebarExpanded }) => (
        <SidebarContent
          isSidebarClosed={isSidebarClosed}
          isSidebarExpanded={isSidebarExpanded}
        />
      )}
    >
      <CourseWrapper>
        <CourseHeader>
          <CourseHeaderTitle>
            {/* {t('common.Create Course', { ns: 'createCourse' })} */}
            {getTitle()}
          </CourseHeaderTitle>
          {/* <StepItems activeStep={activeStep} setStep={handleSetStep} /> */}
        </CourseHeader>
        {courseLoaded ? (
          course ? (
            <CreateCourseSteps />
          ) : (
            <ErrorContainer>
              <ErrorIconWrapper>
                <XIcon />
              </ErrorIconWrapper>
              <ErrorText>{t('messages.Something went wrong')}</ErrorText>
            </ErrorContainer>
          )
        ) : (
          <LoaderContainer>
            <Loader size="large" />
          </LoaderContainer>
        )}
        {bottomNotification && (
          <PopUpBottom
            setShowPopUp={setBottomNotification}
            bottomNotification={bottomNotification as BottomNotification}
          />
        )}
        {centerNotification && (
          <PopUpCenter
            showPopUp={centerNotification as boolean}
            centerNotification={centerNotification as CenterNotification}
          />
        )}
      </CourseWrapper>
    </Layout>
  )
}

export default CreateCourse
