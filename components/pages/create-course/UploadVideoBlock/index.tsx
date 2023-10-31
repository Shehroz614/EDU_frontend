import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'
import { Button } from '@nextui-org/react'
import ProgressBar from 'components/molecules/ProgressBar'
import { Content } from 'types/course'
import PopUpCenter from 'components/organisms/PopUpCenter'
import RoundButton from 'components/atoms/RoundButton'
import VideoPlayerModal from 'components/organisms/VideoPlayerModal'
import useUploadVideo from 'hooks/uploadFiles/useUploadPrivateVideo'
import PlayIcon from '@public/static/icons/videoPlayerIcons/playIcon'
import UploadFilledIcon from '@public/static/icons/upload-filled-icon'
import { useTranslation } from 'react-i18next'

type UploadVideoBlockProps = {
  courseId: string
  courseVersion: number
  videoContent: Content | undefined
  setVideoContent: Function
  isVideoUploading: Boolean
  setIsVideoUploading: Function
  isPublic?: boolean // determine if upload file is publicly available
  isPresentationalVideo?: boolean // determine if upload file is presentationalVideo
  setBottomNotification: Function
  disabled?: boolean
  abortControllers: {
    [key: string]: AbortController
  }
  addAbortController: (name: string, controller: AbortController) => void
  removeAbortController: (name: string) => void
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const BlackCircul = styled.div<{
  marginLeft?: string
  marginTop?: string
  width?: string
  height?: string
  fontSize?: string
  fontWeight?: string
  marginRight?: string
}>`
  display: flex;
  width: ${(props) => (props.width ? props.width : '0.75rem')};
  height: ${(props) => (props.height ? props.height : '0.75rem')};
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '0.6rem')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 'bold')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
`

export const VideoPlayerWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
`

export const VideoPlayer = styled.div`
  display: flex;
  flex-direction: column;
  width: 9rem;
  height: 5rem;
  background-color: #ffffff;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`

const VideoPlay = styled.div`
  display: flex;
  border-radius: 100%;
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid #1a1e3d;
  justify-content: center;
  align-items: center;
`

const PlayIconWrapper = styled.div`
  display: flex;
  width: 1rem;
  height: 1rem;
  margin-left: 0.15rem;
  :hover {
    cursor: pointer;
  }
`
const UploadButtonWrapper = styled.div`
  display: flex;
  color: #ffffff;
  /* align-items: center; */
  font-size: 0.5rem;
`
const UploadFileInput = styled.input`
  color: #1a1e3d;
  cursor: pointer;
  display: none;
`

const UploadBlockWrapper = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-top: 0.2rem;
`
const UploadedContent = styled.div`
  display: flex;
  color: green;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  height: 1.5rem;
  align-items: center;
`

export const NextTitle = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: #1a1e3d;
  margin-left: 0.8rem;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`

const ProgressBarWrapper = styled.div`
  display: flex;
  margin-top: 0.3rem;
  width: 9rem;
`

//This component is used in LectureBlock to upload video
//while creating a Course Outline
const UploadVideoBlock: React.FC<UploadVideoBlockProps> = (props) => {
  const {
    courseId,
    courseVersion,
    videoContent,
    setVideoContent,
    isVideoUploading,
    setIsVideoUploading,
    isPublic = false,
    isPresentationalVideo = false,
    setBottomNotification,
    disabled,
    abortControllers,
    addAbortController,
    removeAbortController,
  } = props

  const { t } = useTranslation(['common', 'createCourse'])

  const [currentFile, setCurrentFile] = useState<File>()
  const [showVideo, setShowVideo] = useState<boolean>(false)
  const [videoLink, setVideoLink] = useState<string>('')

  const {
    inputFileRef,
    onPrivateFileChange,
    onPublicFileChange,
    uploadBtnHandler,
    showProgress,
    progress,
    centerNotification,
    showPopUp,
    cancelMultiPartUpload,
  } = useUploadVideo({
    courseId,
    courseVersion,
    videoContent,
    setVideoContent,
    isVideoUploading,
    setIsVideoUploading,
    isPresentationalVideo,
    setBottomNotification,
    abortControllers,
    addAbortController,
    removeAbortController,
  })

  const openVideoModal = () => {
    if (isPresentationalVideo) {
      if (
        videoContent &&
        videoContent.public.url !== undefined &&
        videoContent.public.url !== ''
      ) {
        console.log('Video Content to Play: ', videoContent)
        setVideoLink(videoContent.public.url)
        setShowVideo(true)
      }
    }
    //not presentational video
    else {
      if (videoContent) {
        console.log('Not presentational video content: ', videoContent)
        if (
          videoContent &&
          videoContent.public.url !== undefined &&
          videoContent.public.url !== ''
        ) {
          setVideoLink(videoContent.public.url)
          setShowVideo(true)
        }
      }
    }
  }
  const closeVideoHandler = () => {
    if (showVideo) {
      setShowVideo(false)
    }
  }

  const handleFileInput = (event) => {
    try {
      setCurrentFile(event?.target?.files?.[0])
      isPublic ? onPublicFileChange() : onPrivateFileChange()
    } catch (err) {}
  }

  return (
    <MainWrapper>
      <ButtonsWrapper>
        {!disabled && (
          <Button ghost rounded size="sm" onClick={uploadBtnHandler}>
            {t('buttons.Upload Video', { ns: 'createCourse' })}
          </Button>
        )}
        {/* <Button
          backgroundColor={colors.uguLightLightGrey}
          padding="0.5rem 1rem"
          marginLeft="0.5rem"
          color={colors.uguDarkGrey}
        >
          {t('buttons.From Library', { ns: 'createCourse' })}
        </Button>
        <Button
          backgroundColor={colors.uguLightLightGrey}
          padding="0.5rem 1rem"
          marginLeft="0.5rem"
          color={colors.uguDarkGrey}
        >
 {t('buttons.Add Link', { ns: 'createCourse' })}
        </Button> */}
      </ButtonsWrapper>
      <RowWrapper>
        <VideoPlayerWrapper>
          <VideoPlayer>
            {/* <BlackCircul marginLeft="7.75rem" marginTop="0.5rem">
              <XIcon />
            </BlackCircul> */}
            <VideoPlay>
              <PlayIconWrapper
                onClick={() => {
                  openVideoModal()
                }}
              >
                <PlayIcon color={colors.uguPurple} />
              </PlayIconWrapper>
            </VideoPlay>
          </VideoPlayer>
        </VideoPlayerWrapper>
        <UploadBlockWrapper>
          <UploadButtonWrapper>
            <UploadFileInput
              id="uploadVideo"
              ref={inputFileRef}
              type="file"
              onChange={handleFileInput}
              accept="video/*"
            />
            {!disabled && (
              <RoundButton
                width="1.5rem"
                height="1.5rem"
                marginLeft="0.rem"
                color="transparent"
                onClick={uploadBtnHandler}
                justifyContent="center"
              >
                <UploadFilledIcon height="1.2rem" />
              </RoundButton>
            )}
          </UploadButtonWrapper>
          {videoContent && videoContent.type === 'video' && (
            <UploadedContent>
              {t('Uploaded', { ns: 'createCourse' })} {videoContent.name}
            </UploadedContent>
          )}
        </UploadBlockWrapper>
      </RowWrapper>
      <RowWrapper>
        {showProgress && (
          <ProgressBarWrapper>
            <ProgressBar value={progress} percentOnLeft={false} />
          </ProgressBarWrapper>
        )}
      </RowWrapper>
      {showProgress && progress < 100 && (
        <RowWrapper>
          <Button
            rounded
            size="sm"
            color="error"
            style={{ marginTop: '1rem' }}
            onClick={() => cancelMultiPartUpload(currentFile?.name)}
          >
            {t('buttons.Cancel')}
          </Button>
        </RowWrapper>
      )}
      {centerNotification && (
        <PopUpCenter
          centerNotification={centerNotification}
          showPopUp={showPopUp}
        />
      )}
      {showVideo && (
        //which modal should be determined by content type - implement later
        <VideoPlayerModal
          autoplay={true}
          videoLink={videoLink}
          onClose={closeVideoHandler}
          videoName={
            isPresentationalVideo
              ? 'Presentational Video'
              : videoContent && videoContent.name
              ? videoContent.name
              : 'Test'
          }
        />
      )}
    </MainWrapper>
  )
}

export default UploadVideoBlock
