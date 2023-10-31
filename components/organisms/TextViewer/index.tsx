import React from 'react'
import styled from '@emotion/styled'
import TinyEditor from 'components/molecules/TinyEditor'
//import { useFullScreenHandle } from 'react-full-screen'

type TextViewerProps = {
  value: any
}

//new changes from Oct 28
const CoursePlayerWrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  /* Extra large devices (large laptops and desktops, 1200px and up) */
`

const TextViewerWrapper = styled.div`
  /* align-items: center; */
  /* position: absolute;
  width: 100%;
  height: 100%; */
`

const TextViewer: React.FC<TextViewerProps> = (props) => {
  const { value } = props

  //const handle = useFullScreenHandle()

  return (
    <CoursePlayerWrapper>
      <TextViewerWrapper />
      <TinyEditor
        value={value ? value : ''}
        readOnly={true}
        // height={!handle.active ? '30rem' : '50rem'}
      />
      {/* </TextViewerWrapper> */}
    </CoursePlayerWrapper>
  )
}

export default TextViewer
