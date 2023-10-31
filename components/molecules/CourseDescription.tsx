import React from 'react'
import styled from '@emotion/styled'
import TinyEditor from './TinyEditor'
import { useTranslation } from 'react-i18next'

type Props = {
  description: string
}

const CourseDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
`

const Title = styled.div`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`

const ShowMoreBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`

const ShowMoreLine = styled.div`
  width: 35%;
  height: 1px;
  background-color: #898b9b;
  margin: 0 1rem;
`

const ShowMoreButton = styled.button`
  height: 2rem;
  width: 8rem;
  border-radius: 21px;
  border: 1px solid #898b9b;
  color: rgba(26, 30, 61, 0.5);
  font-size: 1rem;
`

const CourseDescription: React.FunctionComponent<Props> = (props) => {
  const { description = '' } = props

  console.warn(description)

  const { t } = useTranslation(['courseDescription'])

  return (
    <CourseDescriptionContainer>
      <Title>{t('Description')}</Title>
      <TinyEditor readOnly={true} value={description} />
      <ShowMoreBlock>
        <ShowMoreLine />
        <ShowMoreButton>{t('ShowAll')}</ShowMoreButton>
        <ShowMoreLine />
      </ShowMoreBlock>
    </CourseDescriptionContainer>
  )
}

export default CourseDescription
