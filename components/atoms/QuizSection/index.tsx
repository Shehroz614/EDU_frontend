import React, { useState } from 'react'
import styled from '@emotion/styled'
import TextInput from 'components/atoms/TextInput'
import RoundedButton from 'components/atoms/Button'
import { BlackCircul } from '@pages_components/create-course/UploadVideoBlock'
import InfoTextIcon from 'components/atoms/InfoTextIcon'
import TextBlockWithIcons from '../TextBlockWithIcons'
import CheckAswear from 'components/atoms/CheckAnswear'
import XIcon from 'public/static/icons/x-icon'
import RoundButton from '../RoundButton'
import VideoSectionIcon from 'public/static/icons/video-section-icon'
import TextSectionIcon from 'public/static/icons/text-section-icon'
import { colors } from '@configs/styles/config'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 53rem;
  border-radius: 16px;
  border: 2px solid #eeeeee;
  margin-left: 6rem;
  margin-bottom: 4.5rem;
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const VideoContainer = styled.div`
  display: flex;
  margin-left: 4.4rem;
  margin-bottom: 1rem;
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3.2rem;
  margin-bottom: 1rem;
`
const CheckWrapper = styled.div`
  display: flex;
  margin-left: 5.6rem;
  margin-top: 2.2rem;
  margin-bottom: 3.3rem;
`

const WhiteCircle = styled.div<{
  marginLeft?: string
  marginTop?: string
}>`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #ffffff;
  border-radius: 16px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0.5rem')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '20.5rem')};
  justify-content: center;
  align-items: center;
`

const InfoWrapper = styled.div<{
  marginTop?: string
  marginLeft?: string
}>`
  display: flex;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0.8rem')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0.5rem')};
`

const QuizSection = () => {
  const [videoSection, setVideoSection] = useState(true)
  const [textSection, setTextSection] = useState(false)
  const [addQa, setAddQa] = useState(true)
  const [addAns, setAddAns] = useState(false)
  return (
    <RowContainer>
      <Wrapper>
        <RowContainer>
          <TextInput
            width="49rem"
            placeholder="Название теста"
            height="3rem"
            backgroundColor="#ffffff"
            marginTop="1.4rem"
            marginLeft="1.4rem"
            padding="1rem 2rem"
            fontSize="0.9rem"
            value=""
          />
          <WhiteCircle marginLeft="0.5rem" marginTop="2.1rem">
            <BlackCircul>
              <XIcon />
            </BlackCircul>
          </WhiteCircle>
        </RowContainer>
        {addQa && (
          <>
            <RowContainer>
              <TextInput
                width="37rem"
                placeholder="Вопрос"
                height="3rem"
                backgroundColor="#ffffff"
                marginTop="1.4rem"
                marginLeft="4.4rem"
                padding="1rem 2rem"
                fontSize="0.9rem"
                marginBottom="0.3rem"
                value=""
              />
              <RoundButton
                width="3rem"
                height="3rem"
                marginTop="1.4rem"
                marginLeft="2.3rem"
                color="#EEEEEE"
                onClick={() => {
                  setVideoSection(!videoSection)
                }}
              >
                <VideoSectionIcon width="0.95rem" height="0.7rem" />
              </RoundButton>
              <RoundButton
                width="3rem"
                height="3rem"
                marginTop="1.4rem"
                marginLeft="0.5rem"
                color="#EEEEEE"
                onClick={() => {
                  setTextSection(!textSection)
                }}
              >
                <TextSectionIcon width="0.65rem" height="0.7rem" />
              </RoundButton>
            </RowContainer>
            {videoSection && (
              <VideoContainer>{/* <VideoSection /> */}</VideoContainer>
            )}
            {textSection && (
              <TextWrapper>
                <TextBlockWithIcons
                  width="45.3rem"
                  height="9.1rem"
                  paddingBottom="4rem"
                  opacity="0.51"
                  padding="0 2.2rem"
                  marginLeft="1.4rem"
                  placeholder="Вопрос"
                  fontSize="0.9rem"
                  marginBottom="0.5rem"
                />
                <TextBlockWithIcons
                  width="45.3rem"
                  height="9.1rem"
                  paddingBottom="4rem"
                  opacity="0.51"
                  padding="0 2.2rem"
                  marginLeft="1.4rem"
                  placeholder="Ответ"
                  fontSize="0.9rem"
                />
              </TextWrapper>
            )}
          </>
        )}
        {addAns && (
          <TextWrapper>
            <TextBlockWithIcons
              width="45.3rem"
              height="9.1rem"
              paddingBottom="4rem"
              opacity="0.51"
              padding="0 2.2rem"
              marginLeft="1.4rem"
              placeholder="Ответ"
              fontSize="0.9rem"
            />
          </TextWrapper>
        )}
        <RowContainer>
          <RoundedButton
            width="10.8rem"
            height="2.5rem"
            text="Add Answer"
            backgroundColor={colors.uguYellow}
            color="#1A1E3D"
            marginLeft="4.4rem"
            marginTop="0.5rem"
            fontSize="0.9rem"
            fontWeight="bold"
            marginBottom="1rem"
            onClick={() => {
              setAddAns(!addAns)
            }}
          />
          <RoundedButton
            width="10.8rem"
            height="2.5rem"
            text="Add Question"
            backgroundColor={colors.uguBlue}
            color="#1A1E3D"
            marginLeft="11.9rem"
            marginTop="0.5rem"
            fontSize="0.9rem"
            fontWeight="bold"
            marginBottom="1rem"
            onClick={() => {
              setAddQa(!addQa)
            }}
          />
          <RoundedButton
            width="10.8rem"
            height="2.5rem"
            text="Save"
            backgroundColor={colors.uguYellow}
            color="#1A1E3D"
            marginLeft="1.6rem"
            marginTop="0.5rem"
            fontSize="0.9rem"
            fontWeight="bold"
            marginBottom="1rem"
          />
        </RowContainer>
        <CheckWrapper>
          <CheckAswear />
        </CheckWrapper>
      </Wrapper>
      <InfoWrapper marginTop="2.3rem">
        <InfoTextIcon />
      </InfoWrapper>
    </RowContainer>
  )
}

export default QuizSection
