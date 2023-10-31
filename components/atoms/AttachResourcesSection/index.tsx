import React, { DragEvent, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from 'configs/styles/config'
import UploadIcon from 'public/static/icons/upload-icon'
import {
  allowedFormatsAndSizeLabel,
  clickToUploadLabel,
  orDragAndDropLabel,
} from 'configs/constants/labels/create-course-labels'

type AttachResourcesSectionProps = {
  courseId: string
  onFilesSelected: (files: FileList) => void
}

const MainWrapper = styled.div<{
  onHover: boolean
}>`
  display: flex;
  position: relative;
  border: 1px solid ${colors.uguLightBlue};
  border-radius: 16px;
  padding: 1rem 2rem;
  justify-content: center;
  background-color: ${(props) =>
    props.onHover ? colors.uguLightLightBlue : ''};
  :hover {
    cursor: pointer;
  }
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Text = styled.text`
  display: flex;
  flex-direction: row;
  font-size: 0.75rem;
  font-family: ${fontFamilies.light};
  color: ${colors.uguPurple};
  word-wrap: break-word;
  width: inherit;
`

const BoldText = styled.div`
  display: flex;
  font-family: ${fontFamilies.bold};
  margin-right: 0.25rem;
`

const UploadIconWrapper = styled.div`
  display: flex;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  border-radius: 20px;
  height: 1.5rem;
  margin-bottom: 0.5rem;
`
const UploadIconLayerOne = styled.div<{
  onHover: boolean
}>`
  display: flex;
  border-radius: 50%;
  background-color: ${(props) => (props.onHover ? '#e0f1fc' : '')};
  width: ${(props) =>
    props.onHover
      ? '2.75rem'
      : '2.25rem'}; //2.25 normal, 2.75 when dropping file
  height: ${(props) =>
    props.onHover
      ? '2.75rem'
      : '2.25rem'}; //2.25 normal, 2.75 when dropping file
  align-items: center;
  justify-content: center;
`
const UploadIconLayerTwo = styled.div<{
  onHover: boolean
}>`
  display: flex;
  border-radius: 50%;
  background-color: #d4ebf2;
  width: ${(props) =>
    props.onHover ? '2rem' : '1.75rem'}; //1.5 normal, 2 when dropping file
  height: ${(props) =>
    props.onHover ? '2rem' : '1.75rem'}; //1.5 normal, 2 when dropping file
  align-items: center;
  justify-content: center;
`

const InvisibleDragHelper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const UploadButton = styled.input`
  display: none;
  color: #1a1e3d;
  cursor: pointer;
`

const AttachResourcesSection: React.FC<AttachResourcesSectionProps> = (
  props
) => {
  const { onFilesSelected } = props
  // drag state
  const [dragActive, setDragActive] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // handle drag events
  const handleDrag = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      if (dragActive !== true) {
        console.log('Hanle drag')
        setDragActive(true)
      }
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // triggers when file is dropped
  const handleDrop = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('Dropped Files: ', e.dataTransfer.files)
      //initiate upload
      onFilesSelected(e.dataTransfer.files)
    }
  }

  const onFileChange = () => {
    const inputElement = document.getElementById(
      'uploadFile'
    ) as HTMLInputElement
    if (inputElement.files) {
      onFilesSelected(inputElement.files)
    }
  }

  const selectFileHandler = () => {
    inputRef && inputRef.current && inputRef.current.click()
  }

  return (
    <MainWrapper
      onDragEnter={handleDrag}
      onHover={dragActive}
      onClick={() => selectFileHandler()}
    >
      <RowWrapper>
        <UploadIconWrapper>
          <UploadButton
            ref={inputRef}
            id="uploadFile"
            type="file"
            multiple
            onChange={onFileChange}
          />
          <UploadIconLayerOne onHover={dragActive}>
            <UploadIconLayerTwo onHover={dragActive}>
              <UploadIcon width="1rem" height="1rem" color={colors.uguBlue} />
            </UploadIconLayerTwo>
          </UploadIconLayerOne>
        </UploadIconWrapper>
        <Text>
          <BoldText>{clickToUploadLabel}</BoldText> {orDragAndDropLabel}
        </Text>
        <Text>{allowedFormatsAndSizeLabel}</Text>
      </RowWrapper>
      {dragActive && (
        //helps when dragging over other elements
        <InvisibleDragHelper
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </MainWrapper>
  )
}

export default AttachResourcesSection
