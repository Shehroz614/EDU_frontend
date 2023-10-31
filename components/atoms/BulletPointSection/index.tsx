import React from 'react'
import styled from '@emotion/styled'
import IconText from 'components/atoms/IconText'

type Props = {
  title?: string
  numOfIcons?: number
  marginTop?: string
  list: string[] //text array of requirements or other sentances
}

const BulletPointSectionContainer = styled.div<{
  marginTop?: string
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '2rem')};
`

const CheckmarkSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1rem;
`

const Title = styled.div`
  font-size: 1.25rem;
`

export const Icon = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  padding-top: 5px;
`
export const Text = styled.text`
  font-size: 14px;
  width: 90%;
  opacity: 0.5;
  color: #1a1e3d;
  word-wrap: break-word;
  width: inherit;
`

const CourseInfo: React.FunctionComponent<Props> = (props) => {
  const { title, marginTop, list = [] } = props

  const getIcon = () => {
    return list.map((element, index) => {
      return (
        <>
          <IconText
            key={index + 'checkMark'}
            icon={
              <div style={{ fontSize: '50px', lineHeight: '100px' }}>·</div>
            }
            width="22rem"
            text={element}
            fontSize="0.9rem"
            lineHeight="1.1rem"
            opacity="1"
            marginBottom="1rem"
            marginBetween="0.5rem"
            checkmark={true}
          />
        </>
      )
    })
  }
  return (
    <BulletPointSectionContainer marginTop={marginTop}>
      <Title>{title}</Title>
      <CheckmarkSectionWrapper>{getIcon()}</CheckmarkSectionWrapper>
    </BulletPointSectionContainer>
  )
}

export default CourseInfo
