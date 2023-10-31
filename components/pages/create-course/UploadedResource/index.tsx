import React from 'react'
import styled from '@emotion/styled'
import CloseIcon from 'public/static/icons/close-icon-dark'
import AttachResourcesIcon from 'public/static/icons/attach-resources-icon'

//TODO:
//1. Add Circular Progress Bar - make ButtonWrapper relative
//DeleteBtn absolute and place it in the middle of that Bar

type UploadedResourceProps = {
  title: string //name of the file
  uploaded: boolean
  uploadedPercent: number
  deleteBtnPressed: () => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #e4e4e4;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
`
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 0.75rem;
  height: 0.75rem;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`
const DeleteBtn = styled.div`
  display: flex;
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 0.5rem;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`

const ProgressBtn = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`

const UploadedResource: React.FC<UploadedResourceProps> = (props) => {
  const { title, uploaded, uploadedPercent, deleteBtnPressed } = props

  return (
    <Wrapper>
      <IconWrapper>
        <AttachResourcesIcon />
      </IconWrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <ButtonWrapper>
        {!uploaded && <ProgressBtn>{uploadedPercent + '/100'}</ProgressBtn>}
        <DeleteBtn onClick={() => deleteBtnPressed()}>
          <CloseIcon />
        </DeleteBtn>
      </ButtonWrapper>
    </Wrapper>
  )
}

export default UploadedResource
