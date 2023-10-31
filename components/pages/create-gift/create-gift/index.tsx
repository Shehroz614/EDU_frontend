import React, { useState } from 'react'

import Loader from '@components/organisms/Loader'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import {
  CourseWrapper,
  CourseHeader,
  CourseHeaderTitle,
  LoaderContainer,
} from '@styled_components/CreateGiftCard/styled.components'
import CreateGiftForm from '../createGiftForm'

const CreateCourse = (): JSX.Element => {
  const [loading] = useState(false)

  return (
    <Layout>
      <CourseWrapper>
        <CourseHeader>
          <CourseHeaderTitle></CourseHeaderTitle>
        </CourseHeader>
        {!loading ? (
          <div>
            <CreateGiftForm />
          </div>
        ) : (
          <LoaderContainer>
            <Loader size="large" />
          </LoaderContainer>
        )}
      </CourseWrapper>
    </Layout>
  )
}

export default CreateCourse
