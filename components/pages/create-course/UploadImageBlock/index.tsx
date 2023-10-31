import React from 'react'
import styled from '@emotion/styled'
import { colors } from 'configs/styles/config'
import Button from 'components/atoms/Button'
import ProgressBar from 'components/molecules/ProgressBar'
import PopUpCenter from 'components/organisms/PopUpCenter'
import RoundButton from 'components/atoms/RoundButton'
import useUploadPublicImage from 'hooks/uploadFiles/useUploadPublicImage'
import UploadFilledIcon from '@public/static/icons/upload-filled-icon'
import { useTranslation } from 'react-i18next'

type UploadImageBlockProps = {
  courseId: string
  courseVersion: number
  image: string | undefined
  setImage: Function
  isVideoUploading: Boolean
  setIsVideoUploading: Function
  isPublic?: boolean // determine if upload file is publicly available
  isPresentationalImage?: boolean // determine if upload file is presentationalImage
  setBottomNotification: Function
  disabled?: boolean
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

export const ImageWrapper = styled.div`
  display: flex;
`

export const VideoPlayer = styled.div`
  display: flex;
  flex-direction: column;
  width: 9rem;
  height: 5rem;
  background-color: #ffffff;
  border-radius: 10px;
`

const PresentationalImage = styled.img`
  display: flex;
  border-radius: 1rem;
  width: 10rem;
  height: 7rem;
  border: 1px solid #1a1e3d;
  justify-content: center;
  align-items: center;
  object-fit: cover;
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
const UploadImageBlock: React.FC<UploadImageBlockProps> = (props) => {
  const {
    courseId,
    courseVersion,
    image,
    setImage,
    isVideoUploading,
    setIsVideoUploading,
    // isPublic = false, //commented for now, we don't need public pictures for now
    isPresentationalImage = false,
    setBottomNotification,
    disabled,
  } = props

  const {
    inputFileRef,
    onFileChange,
    uploadBtnHandler,
    showProgress,
    progress,
    centerNotification,
    showPopUp,
  } = useUploadPublicImage(
    courseId,
    courseVersion,
    image,
    setImage,
    isVideoUploading,
    setIsVideoUploading,
    isPresentationalImage,
    setBottomNotification
  )

  const { t } = useTranslation(['common', 'createCourse'])

  return (
    <MainWrapper>
      <ButtonsWrapper>
        {!disabled && (
          <Button
            backgroundColor={'transparent'}
            border={'1px solid ' + colors.uguPurple}
            padding="0.5rem 1rem"
            onClick={uploadBtnHandler}
          >
            {t('buttons.Upload Image', { ns: 'createCourse' })}
          </Button>
        )}
        {/* <Button
          backgroundColor={colors.uguLightLightGrey}
          padding="0.5rem 1rem"
          marginLeft="0.5rem"
          color={colors.uguDarkGrey}
        >
        {t('buttons.From Library', { ns: 'createCourse' })}
        </Button> */}
      </ButtonsWrapper>
      <RowWrapper>
        <ImageWrapper>
          <PresentationalImage src={image} />
        </ImageWrapper>
        <UploadBlockWrapper>
          <UploadButtonWrapper>
            <UploadFileInput
              id="uploadImage"
              ref={inputFileRef}
              type="file"
              onChange={onFileChange}
            />
            {!disabled && (
              <RoundButton
                width="1.5rem"
                height="1.5rem"
                marginLeft="0.rem"
                color={'transparent'}
                onClick={uploadBtnHandler}
                justifyContent="center"
              >
                <UploadFilledIcon height="1.2rem" />
              </RoundButton>
            )}
            {/* <DownloadIcon width="0.4rem" height="0.45rem" /> */}
          </UploadButtonWrapper>
          {/* {image && image.type === 'video' && ( */}
          {image && (
            <UploadedContent>
              {t('Uploaded', { ns: 'createCourse' })}
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
      {centerNotification && (
        <PopUpCenter
          centerNotification={centerNotification}
          showPopUp={showPopUp}
        />
      )}
    </MainWrapper>
  )
}

export default UploadImageBlock
