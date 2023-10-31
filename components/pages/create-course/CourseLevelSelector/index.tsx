import styled from '@emotion/styled'
import IconTextBlock from 'components/atoms/IconText'
import { BorderRadius, colors } from 'configs/styles/config'
import CourseDifficultyIcon from 'public/static/icons/course-dificulty-icon'
import React from 'react'
import { CourseLevel } from 'types/course'

type CourseLevelSelectorProps = {
  id: string
  type: CourseLevel
  selected?: boolean
  onClick: () => void
  disabled?: boolean
}

const levelLabels = {
  all: 'All Levels',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  expert: 'Expert',
}

const levelIcons = {
  all: <CourseDifficultyIcon dificultyLevel={0} />,
  beginner: <CourseDifficultyIcon dificultyLevel={1} />,
  intermediate: <CourseDifficultyIcon dificultyLevel={2} />,
  expert: <CourseDifficultyIcon dificultyLevel={3} />,
}

const CourseLevelSelectorWrapper = styled.div<{
  selected: boolean
  type: CourseLevel
  disabled: boolean
}>`
  display: flex;
  /* border: 1px solid ${colors.uguLightGrey}; */
  border: 1px solid
    ${(props) =>
      props.disabled
        ? colors.uguLightGrey
        : props.selected
        ? colors.uguBrightPurple
        : colors.uguLightGrey};
  height: 2.6rem;
  border-radius: 30px;
  width: 10rem;
  align-items: center;
  margin: 0 0.5rem 1rem;
  padding: 0 0.75rem;
  background: ${(props) =>
    props.disabled ? colors.uguLightLightGrey : '#FFFFFF'};
  color: ${(props) =>
    props.disabled ? colors.uguLightGrey : colors.uguPurple};
  :hover {
    cursor: pointer;
  }
`

const RadioBtnWrapper = styled.div<{ selected: boolean; disabled: boolean }>`
  display: flex;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: ${BorderRadius.round};
  border: 1px solid
    ${(props) =>
      props.disabled
        ? colors.uguLightGrey
        : props.selected
        ? colors.uguBrightPurple
        : colors.uguLightGrey};
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  :hover {
    cursor: pointer;
  }
`
const InnerCircle = styled.div`
  display: flex;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: ${BorderRadius.round};
  background-color: ${colors.uguBrightPurple};
`

const CourseLevelSelector: React.FC<CourseLevelSelectorProps> = (props) => {
  const { id, type, selected = false, onClick, disabled = false } = props
  return (
    <CourseLevelSelectorWrapper
      id={id}
      onClick={() => (disabled ? {} : onClick())}
      selected={selected}
      type={type}
      disabled={disabled}
    >
      <RadioBtnWrapper selected={selected} disabled={disabled}>
        {selected && <InnerCircle />}
      </RadioBtnWrapper>
      <IconTextBlock
        icon={levelIcons[type]}
        text={levelLabels[type]}
        marginBetween="0.5rem"
        iconWidth="0.8rem"
        iconHeight="0.9rem"
        fontSize="0.875rem"
        opacity="1"
        disabled={disabled}
        color={disabled ? colors.uguLightGrey : colors.uguPurple}
      />
    </CourseLevelSelectorWrapper>
  )
}

export default CourseLevelSelector
