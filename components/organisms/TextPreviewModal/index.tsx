import React from 'react'
import Modal from 'components/molecules/Modal'
import styled from '@emotion/styled'
import TextViewer from '@components/organisms/TextViewer'

type VideoPlayerModalProps = {
  value: string
  onClose: () => void
}

const TextViewerWrapper = styled.div`
  display: flex;
  padding: 1rem;
  padding-top: 0;
  /* width: 100%; */
  //cross browser commands to hide scrollbar, but allow scrolling
  overflow-y: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent Chrome */
  }
`

const TextPreviewModal: React.FC<VideoPlayerModalProps> = (props) => {
  const { onClose, value } = props
  //states for video
  // useEffect(() => {
  //   getVideoContent(courseId, sectionId, lectureId, contentId, true).then(
  //     (videoContent: VideoContent) => {
  //       setVideoLink(videoContent.url)
  //     }
  //   )
  // }, [])

  return (value !== '' || value !== undefined) && value ? (
    <Modal onClose={onClose}>
      <TextViewerWrapper>
        <TextViewer value={value} />
      </TextViewerWrapper>
    </Modal>
  ) : (
    <>Loading...</>
  )
}

export default TextPreviewModal
