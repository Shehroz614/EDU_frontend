import React from 'react'

import styled from '@emotion/styled'

const NextVideoLoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const NextVideoLabel = styled.div`
  display: flex;
`
const LectureTitle = styled.div`
  display: flex;
`
const LoadingIndicatorWrapper = styled.div`
  display: flex;
`
const CancelBlock = styled.div`
  display: flex;
`

type NextVideoLoaderType = {
  nextLabel: string
  lectureTitle: string
  value: number
}

const NextVideoLoader: React.FC<NextVideoLoaderType> = (props) => {
  const { nextLabel, lectureTitle } = props

  //must have count-down
  //must have play button
  //must have cancel button

  return (
    <NextVideoLoaderWrapper>
      <NextVideoLabel>{nextLabel}</NextVideoLabel>
      <LectureTitle>{lectureTitle}</LectureTitle>
      <LoadingIndicatorWrapper>
        {/* <Box
          sx={{ position: 'relative', display: 'inline-flex', color: 'red' }}
        >

          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayIcon />
          </Box>
        </Box> */}
        {/* <CircularProgress /> */}
        {/* <LinearProgress /> */}
      </LoadingIndicatorWrapper>
      <CancelBlock>{}</CancelBlock>
    </NextVideoLoaderWrapper>
  )
}

export default NextVideoLoader
