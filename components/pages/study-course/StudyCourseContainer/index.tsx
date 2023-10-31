import React from 'react'
import { useStudyCourse } from '@contexts/CourseStudy'
import { useTranslation } from 'next-i18next'
import XIcon from '@public/static/icons/x-icon'
import Loader from '@components/organisms/Loader'
import PopUpBottom from '@components/organisms/PopUpBottom'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import StudyCourse from '../StudyCourse'
import { BottomNotification } from '@type/main'
import {
  CourseWrapper,
  ErrorContainer,
  ErrorIconWrapper,
  ErrorText,
  LoaderContainer,
} from '@styled_components/StudyCourseContainer/styled.components'

const StudyCourseContainer = (): JSX.Element => {
  const { t } = useTranslation(['common', 'createCourse'])
  const { course, courseLoaded, bottomNotification, setBottomNotification } =
    useStudyCourse()

  return (
    <Layout fullWidth={true}>
      <CourseWrapper>
        {courseLoaded ? (
          course ? (
            <StudyCourse />
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
            bottomNotification={bottomNotification as BottomNotification}
            setShowPopUp={setBottomNotification}
          />
        )}
      </CourseWrapper>
    </Layout>
  )
}

export default StudyCourseContainer
