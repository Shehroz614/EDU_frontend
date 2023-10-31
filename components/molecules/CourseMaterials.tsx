import React, { useState } from 'react'
import styled from '@emotion/styled'
import IconText from '../atoms/IconText'
import CourseMaterialSectionRow from '../atoms/CourseMaterialSectionRow'
import LecturesQtyIcon from '../../public/static/icons/lectures-qty-icon'
import { TimeAmountIconNew } from '../../public/static/icons/time-amount-icon'
// import CourseMaterialOpenSection from 'components/atoms/CourseMaterialOpenSection'
import { Course, Section } from '@ugu/types'
import { secondsToHms } from 'helpers/secondsToHms'
import { AnimatePresence } from 'framer-motion'
import { colors } from '@configs/styles/config'
import { useTranslation } from 'react-i18next'

type CourseMaterialsProps = {
  course: Course
  sections: Section[]
  totalTime: number
  totalLectures: number
  course_id?: string
}

const CourseMaterialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #1a1e3d;
  margin-top: 2rem;
`
const Title = styled.div`
  font-size: 1.25rem;
`
const MaterialNumbersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
`

const MaterialNumberBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 21.5rem;
  border: 1px solid rgba(151, 151, 151, 0.16);
  border-radius: 10px;
  padding: 1rem 2rem 1rem 1.5rem;
  justify-content: space-between;
  margin: 0 10px;
  align-items: center;
`

const MaterialNumber = styled.div`
  font-size: 14px;
  opacity: 0.96;
`

const MaterialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

const ShowMoreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const ShowMoreButton = styled.button`
  height: 2rem;
  width: 8rem;
  border-radius: 21px;
  border: 1px solid #898b9b;
  color: rgba(26, 30, 61, 0.5);
  margin-top: 0.5rem;
  font-size: 1rem;
`

const NoSectionsContainer = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  background: ${colors.uguLightLightGrey};
  color: ${colors.uguDarkGrey};
  font-size: 1rem;
`

const AMOUNT_OF_SECTIONS_TO_SHOW = 4

const CourseMaterials: React.FC<CourseMaterialsProps> = (props) => {
  const {
    course,
    sections,
    totalTime = 0,
    totalLectures = 0,
    course_id,
  } = props

  const [showAll, setShowAll] = useState(false)

  const getSections = () => {
    return sections.map((section, index) => {
      if (showAll) {
        return (
          <CourseMaterialSectionRow
            section={section}
            course={course}
            key={section._id}
            course_id={course_id}
          />
        )
      } else {
        if (index < AMOUNT_OF_SECTIONS_TO_SHOW) {
          return (
            <CourseMaterialSectionRow
              section={section}
              course={course}
              key={section._id}
              course_id={course_id}
            />
          )
        }
      }
    })
  }

  const { t } = useTranslation(['common'])
  return (
    <CourseMaterialsWrapper>
      <Title>{t('Course Materials')}</Title>
      <MaterialNumbersWrapper>
        <MaterialNumberBlock>
          <IconText
            icon={<LecturesQtyIcon />}
            text={t('Icon Text.Total Lectures')}
            opacity="0.96"
            fontSize="14px"
            marginBetween="1rem"
          />
          <MaterialNumber>{totalLectures}</MaterialNumber>
        </MaterialNumberBlock>
        <MaterialNumberBlock>
          <IconText
            icon={<TimeAmountIconNew />}
            text={t('Icon Text.Total Time')}
            opacity="0.96"
            fontSize="14px"
            marginBetween="1rem"
          />
          <MaterialNumber>{secondsToHms(totalTime)}</MaterialNumber>
        </MaterialNumberBlock>
      </MaterialNumbersWrapper>
      <AnimatePresence>
        <MaterialsWrapper>
          {course && sections.length > 0 ? (
            getSections()
          ) : (
            <NoSectionsContainer>
              {t('There Is No Course Materials')}
            </NoSectionsContainer>
          )}

          {course && sections.length > 4 && (
            <ShowMoreWrapper>
              <ShowMoreButton onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Show less' : 'Show more'}
              </ShowMoreButton>
            </ShowMoreWrapper>
          )}
        </MaterialsWrapper>
      </AnimatePresence>
    </CourseMaterialsWrapper>
  )
}

export default CourseMaterials
