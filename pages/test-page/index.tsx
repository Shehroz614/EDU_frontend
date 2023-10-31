import React from 'react'
import styled from '@emotion/styled'
import NextVideoLoader from 'components/organisms/VideoPlayer/NextVideoLoader'

const Body = styled.div`
  display: flex;
  flex-direction: column;
`

const TestPage = () => {
  return (
    <Body>
      <NextVideoLoader
        nextLabel="Up next"
        lectureTitle="Next Lecture Title"
        value={10}
      />
    </Body>
  )
}

export default TestPage
