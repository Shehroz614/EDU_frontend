import React, { useEffect, useState } from 'react'
import { Button, Progress } from '@nextui-org/react'
import styled from '@emotion/styled'
import useUploadAuthorIntroVideo from '@hooks/uploadFiles/useUploadAuthorIntroVideo'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@hooks/useAuth'
import VideoPlayer from '@components/organisms/VideoPlayer'

// Styled components

const Dropzone = styled.div<{ isDragging: boolean; isMobile: boolean }>`
  padding: 0.5rem 0.5rem 1rem 0.5rem;
  border: 2px dashed gray;
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-height: 250px;
  transition: background-color 0.3s;
  gap: 1rem;
  ${({ isDragging }) =>
    isDragging &&
    `
      background-color: #eaecff;
      border: 2px dashed blue;
    `}
  ${({ isMobile }) =>
    isMobile &&
    `
    padding: 0;
    border: none;

    `}
`

const StyledButton = styled(Button)`
  flex-basis: calc(50% - 3rem);
  @media (max-width: 500px) {
    flex-basis: 100%;
  }
`
const VideoPlayerWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  width: 100%;
  aspect-ratio: 16 / 9;
`
const ContentContainer = styled.div``
const ButtonsContainer = styled.div`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 3rem);
  @media (max-width: 500px) {
    flex-basis: 100%;
  }
`
const VideoLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`

const VideoThumbnail = styled.img`
  width: 10rem;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  border-radius: 0.5rem;
  background-color: #a8a8a8;
`

const VideoName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`

const Notification = styled.div<{ actionType?: 'success' | 'error' }>`
  position: absolute;
  text-align: center;
  bottom: ${({ actionType }) =>
    actionType === 'success'
      ? '1rem'
      : actionType === 'error'
      ? '40%'
      : '1rem'};

  padding: 0.5rem;
  border-radius: 0.25rem;
  z-index: 100;

  background-color: ${({ actionType }) =>
    actionType === 'success'
      ? '#d4edda'
      : actionType === 'error'
      ? '#ff9fa7'
      : 'white'};

  color: ${({ actionType }) =>
    actionType === 'success'
      ? '#155724'
      : actionType === 'error'
      ? '#721c24'
      : 'black'};
`
interface UploadAuthorIntroVideoProps {
  onClose?: () => void
}

const UploadAuthorIntroVideo: React.FC<UploadAuthorIntroVideoProps> = ({
  onClose,
}) => {
  const {
    triggerFileInput,
    handleFileSelect,
    notification,
    inputFileRef,
    uploadProgress,
    uploadStage,
    videoThumbnail,
    fileSelected,
    uploadHandler,
    handleCancel,
    abortUpload,
  } = useUploadAuthorIntroVideo()

  const {
    authState: { user },
  } = useAuth()

  const { t } = useTranslation(['authorProfileSettings'])

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  const videoLink = user?.introductoryVideo
  const [wide, setWide] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  // Close the modal automatically after successful upload

  useEffect(() => {
    if (onClose && notification?.actionType === 'success') {
      const timer = setTimeout(() => onClose(), 1500)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Event handlers for drag & drop
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect({
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDraggingOver(false)
  }
  return (
    <Dropzone
      isDragging={isDraggingOver}
      isMobile={isMobile}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {videoLink && uploadStage === 'idle' && !fileSelected && (
        <VideoPlayerWrapper>
          <VideoPlayer
            videoURL={videoLink}
            videoName={'Introduction video'}
            isMultipleVideos={false}
            nextLectureTitle={undefined}
            previousLectureTitle={undefined}
            onWideScreenPressed={() => {
              setWide(!wide)
            }}
            isWideScreen={wide}
            showWideScreen={false}
          />
        </VideoPlayerWrapper>
      )}
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        accept="video/*"
      />
      {fileSelected && (
        <ContentContainer>
          <VideoLabelContainer>
            <VideoThumbnail
              src={
                videoThumbnail ||
                'https://media.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif '
              }
              alt="Video thumbnail"
            />
            <VideoName>{fileSelected.name}</VideoName>
            {uploadStage === 'uploading' && (
              <>
                <Progress value={uploadProgress} size="sm" />
                <StyledButton onClick={abortUpload}>{t('Cancel')}</StyledButton>
              </>
            )}
          </VideoLabelContainer>
        </ContentContainer>
      )}
      {uploadStage !== 'uploading' && (
        <ButtonsContainer>
          {!fileSelected && (
            <StyledButton bordered onClick={triggerFileInput}>
              {videoLink ? t('Select a new video') : t('Select a video')}
            </StyledButton>
          )}

          {fileSelected && (
            <>
              <Button bordered onClick={uploadHandler}>
                {t('Upload')}
              </Button>
              <Button onClick={handleCancel}>{t('Cancel')}</Button>
            </>
          )}
        </ButtonsContainer>
      )}
      {!fileSelected && videoLink && (
        <StyledButton disabled>{t('Delete')}</StyledButton>
      )}
      {notification && (
        <Notification actionType={notification.actionType}>
          {notification.message}
        </Notification>
      )}
    </Dropzone>
  )
}

export default UploadAuthorIntroVideo
