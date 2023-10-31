import React from 'react'
import styled from '@emotion/styled'
import { fontFamilies } from 'configs/styles/config'

type CreateCourseLabelProps = {
  required?: boolean
  title: string
  marginBottom?: string
}

const LabelWrapper = styled.div<{
  marginBottom?: string
}>`
  display: flex;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
`
// const StarWraper = styled.div`
//   display: flex;
//   color: ${colors.uguPurple};
//   margin-right: 0.25rem;
//   font-size: 0.8rem;
// `
const Title = styled.div`
  display: flex;
  font-family: ${fontFamilies.regular};
  font-size: 0.8rem;
  color: #989898;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
`

const CreateCourseLabel: React.FC<CreateCourseLabelProps> = (props) => {
  const { title, marginBottom } = props
  return (
    <LabelWrapper marginBottom={marginBottom}>
      <Title>
        {/* {required && <StarWraper>*</StarWraper>} */}
        {title}
      </Title>
    </LabelWrapper>
  )
}

export default CreateCourseLabel
