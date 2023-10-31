import React, { useState } from 'react'
import Modal from 'components/molecules/Modal'
import VideoPlayer from '../VideoPlayer'
import styled from '@emotion/styled'

type VideoPlayerModalProps = {
  videoName: string
  videoLink: string
  onClose: () => void
  autoplay: boolean
}

const VideoPlayerWrapper = styled.div`
  display: flex;
  padding: 1rem;
  padding-top: 0;
`

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = (props) => {
  const { onClose, videoLink, videoName, autoplay } = props
  const [wide, setWide] = useState(false)
  //states for video
  // useEffect(() => {
  //   getVideoContent(courseId, sectionId, lectureId, contentId, true).then(
  //     (videoContent: VideoContent) => {
  //       setVideoLink(videoContent.url)
  //     }
  //   )
  // }, [])

  return (videoLink !== '' || videoLink !== undefined) && videoLink ? (
    <Modal onClose={onClose} width="42rem">
      <VideoPlayerWrapper>
        <VideoPlayer
          autoplay={autoplay}
          videoURL={videoLink}
          videoName={videoName}
          isMultipleVideos={false}
          nextLectureTitle={undefined}
          previousLectureTitle={undefined}
          onWideScreenPressed={() => {
            setWide(!wide)
          }}
          isWideScreen={wide}
          showWideScreen={false}
          isModal={true}
        />
      </VideoPlayerWrapper>
    </Modal>
  ) : (
    <>Loading...</>
  )
}

export default VideoPlayerModal
