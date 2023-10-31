import React, { useRef, useState, DragEvent, useEffect } from 'react'
import styled from '@emotion/styled'
import Modal from '../Modal'
import { Button } from '@nextui-org/react'
import AvatarEditor from 'react-avatar-editor'
import { fontFamilies } from '@configs/styles/config'
import { Title } from '@styled_components/account/accountStyledComponents'
import UserAvatar from '@components/atoms/UserAvatar/UserAvatar'
import EditIcon from 'public/static/icons/createCourseIcons/edit-icon'
import { updateAvatar } from '@services/api/user'
import { useAuth } from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'
import { BottomNotification } from '@type/main'
import PopUpBottom from '@components/organisms/PopUpBottom'
import Loader from '@components/organisms/Loader'

// Types
type UploadAvatarProps = {
  disabled?: boolean
}
type StageType = 'upload' | 'crop' | 'loading'

// Styled Components
const Container = styled.div<{ stage: StageType }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  max-width: 25rem;
  min-width: 15rem;
  background-color: #ffffff;
  padding: 0 1rem 1rem 1rem;
  transition: 0.1s ease-in-out;
  ${({ stage }) =>
    stage == 'upload' &&
    `
    max-width: max-content;

  `}
`

const SliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${fontFamilies.light};
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
`

const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 0.5rem;
  border-radius: 1rem;
  background: #d3d3d3;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #1a1e3d;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #1a1e3d;
    cursor: pointer;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`
const DropZone = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  width: 35rem;
  height: 15rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 1rem;
  border: 2px dashed #ababab;
  background: #f9f9f9;

  transition: 0.1s ease-in-out;
  ${({ isDraggingOver }) =>
    isDraggingOver &&
    `
    background: #d7daec;
    border: 2px dashed #1B1F3B;

  `}
`

const DropZoneText = styled.p`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-family: ${fontFamilies.medium};
  font-size: 1rem;
  color: rgba(151, 151, 151, 1);
  transition: 0.1s ease-in-out;
`
const ClickToUploadText = styled.p`
  font-family: ${fontFamilies.medium};
  font-size: 1rem;
  color: #adb6ff;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  cursor: pointer;

  :hover {
    color: #7181ff;
  }
`

const AvatarContainer = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  margin-left: 1rem;
  position: relative;
`
const EditIconContainer = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  right: 0.15rem;
  bottom: 0.15rem;
`

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const UploadAvatar: React.FC<UploadAvatarProps> = ({ disabled = false }) => {
  // States
  const [stage, setStage] = useState<StageType>('upload')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [slideValue, setSlideValue] = useState(100)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [bottomNotification, setBottomNotification] =
    useState<BottomNotification>()
  const [showBottomPopUp, setShowBottomPopUp] = useState(false)

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<AvatarEditor | null>(null)

  // Hooks
  const { t } = useTranslation(['account'])
  const { updateCurrentUserFromResponse } = useAuth()

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  // Handlers & Logic
  useEffect(() => {
    if (isOpen && isMobile && stage === 'upload') {
      handleUploadClick()
    }
  }, [])

  const onClose = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setIsOpen(false)
    setStage('upload')
    setSlideValue(100)
  }

  // Handlers
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const editButtonClickHandler = () => {
    if (isMobile) {
      handleUploadClick()
    } else setIsOpen(true)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const src = URL.createObjectURL(file)
      setImageSrc(src)
      setStage('crop')
      if (isMobile) setIsOpen(true)
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggingOver(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggingOver(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggingOver(false)
    const file = event.dataTransfer.files ? event.dataTransfer.files[0] : null

    // Check if file is an image by its MIME type
    if (file && file.type.startsWith('image/')) {
      const src = URL.createObjectURL(file)
      setImageSrc(src)
      setStage('crop')
    }
  }

  const handleSave = () => {
    setStage('loading')
    const editor = editorRef.current
    if (editor) {
      const canvas = editor.getImage()

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'avatar.png', { type: 'image/png' })

          updateAvatar(file)
            .then((response) => {
              console.log('Avatar updated:', response)
              updateCurrentUserFromResponse(response)
              onClose()
            })
            .catch((err) => {
              console.error('Error updating avatar:', err)

              setBottomNotification({
                message: err.message || err,
                actionType: 'error',
                duration: 7,
              })
              onClose()

              setShowBottomPopUp(true)
            })
        } else {
          console.error('Failed to create blob from canvas')
          onClose()
        }
      })
    }
  }

  // Stages
  const Upload = (
    <>
      <Title> {t('Upload photo')}</Title>

      <DropZone
        isDraggingOver={isDraggingOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <DropZoneText>
          <ClickToUploadText onClick={handleUploadClick}>
            {t('Click to upload')}
          </ClickToUploadText>
          {t('or drug an drop')}
        </DropZoneText>
      </DropZone>
    </>
  )

  const Crop = (
    <>
      {imageSrc && (
        <AvatarEditor
          style={{ width: '100%', height: '100%' }}
          border={10}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 100}
          rotate={0}
          image={imageSrc}
          ref={editorRef}
        />
      )}
      <SliderContainer>
        <p>{t('Scale')}</p>
        <p>X{(slideValue / 100).toFixed(2)}</p>
        <Slider
          type="range"
          min="100"
          max="500"
          onChange={(e) => setSlideValue(parseInt(e.target.value))}
        />
      </SliderContainer>
      <ButtonsContainer>
        <Button bordered onPress={onClose}>
          {t('Cancel')}
        </Button>
        <Button onPress={handleSave}> {t('Save Avatar')}</Button>
      </ButtonsContainer>
    </>
  )

  const stageDisplay = () => {
    switch (stage) {
      case 'upload':
        return Upload
      case 'crop':
        return Crop
      case 'loading':
        return null
      default:
        return null
    }
  }

  return (
    <>
      <AvatarContainer style={disabled ? { opacity: '50%' } : {}}>
        <UserAvatar size="100%" />
        <EditIconContainer>
          <EditIcon onClick={disabled ? undefined : editButtonClickHandler} />
        </EditIconContainer>
        {stage === 'loading' && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}
      </AvatarContainer>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {!(isMobile && stage === 'upload') && // do not show modal on upload stage if isMobile
        isOpen &&
        stage !== 'loading' && (
          <Modal onClose={onClose}>
            <Container stage={stage}>{stageDisplay()}</Container>
          </Modal>
        )}

      {showBottomPopUp && bottomNotification && (
        <PopUpBottom
          bottomNotification={bottomNotification}
          showPopUp={showBottomPopUp}
          setShowPopUp={setShowBottomPopUp}
        />
      )}
    </>
  )
}

export default UploadAvatar
