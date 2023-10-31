// @ts-nocheck
import React from 'react'
import InfoTextIcon from 'components/atoms/InfoTextIcon'
import SelectSection from '../../SelectSection'
import Button from 'components/atoms/Button'
import TextInput from 'components/atoms/TextInput'
import WriteIcon from 'public/static/icons/write-icon-for-input'
import { Category, CourseAgeLimitObject } from '@ugu/types'
import { colors, fontFamilies } from 'configs/styles/config'
import { courseTitleTextLimit } from 'configs/constants/textLimits'
import CreateCourseLabel from '../../CreateCourseLabel'
import CourseLevelSelector from '../../CourseLevelSelector'
import Select from 'components/atoms/Select'
import { useTranslation } from 'next-i18next'
import { useCreateCourse } from '@contexts/CreateCourse'
import useStepOne from '@hooks/CreateCourses/useStepOne'
import ageLimits from '@constants/ageLimits'
import {
  Container,
  ContentWrapper,
  ButtonsWrapper,
  SectionsWrapper,
  TitleWrapper,
  TitleInputWrapper,
  LabelWrapper,
  RightContainer,
  LevelSelectorsWrapper,
  SpaceWrapper,
  ElementWrapper,
} from '@styled_components/StepOne/styled.components'
import {
  PopoverContentWrapper,
  TooltipWrapper,
} from '@styled_components/CreateCourse/styled.components'
import LanguageSelector from '../../LanguageSelector'
import { Popover } from '@nextui-org/react'
import { getFragmentedText } from '@utils/getFragmentedText'

const StepOne: React.FC = () => {
  const { t } = useTranslation(['common', 'createCourse'])
  const { setActiveStep, changesSaved } = useCreateCourse()
  const {
    course,
    categories,
    category,
    subCategory,
    subSubCategory,
    handleInputChange,
    saveChanges,
    discardChanges,
    addLanguage,
    deleteLanguage,
  } = useStepOne()

  return (
    <Container>
      <TitleWrapper>
        <LabelWrapper>
          <CreateCourseLabel
            title={t('titles.courseTitle', { ns: 'createCourse' })}
            required
          />
          <Popover placement="top-left">
            <Popover.Trigger>
              <TooltipWrapper>
                <InfoTextIcon />
              </TooltipWrapper>
            </Popover.Trigger>
            <Popover.Content>
              <PopoverContentWrapper>
                {getFragmentedText(
                  t('tooltips.courseTitle', { ns: 'createCourse' })
                )}
              </PopoverContentWrapper>
            </Popover.Content>
          </Popover>
        </LabelWrapper>
        <TitleInputWrapper>
          <TextInput
            icon={<WriteIcon />}
            width="100%"
            height="3.5rem"
            border="1px solid #d8d8d8"
            // marginLeft="2rem"
            placeholder={
              t('inputs.Course Name', { ns: 'createCourse' }) as string
            }
            value={course?.title || ''}
            fontSize="1.1rem"
            padding="0 1rem 0 2rem"
            onChange={(event) =>
              handleInputChange('title', event.currentTarget.value)
            }
            disabled={course?.status !== 'draft'}
            maxLength={courseTitleTextLimit}
          />
        </TitleInputWrapper>
      </TitleWrapper>
      <ContentWrapper>
        <SectionsWrapper>
          <ElementWrapper>
            <LabelWrapper>
              <CreateCourseLabel
                title={t('titles.category', { ns: 'createCourse' })}
                required
              />
              <Popover placement="top-left">
                <Popover.Trigger>
                  <TooltipWrapper>
                    <InfoTextIcon />
                  </TooltipWrapper>
                </Popover.Trigger>
                <Popover.Content>
                  <PopoverContentWrapper>
                    {getFragmentedText(
                      t('tooltips.categorySubCategory', { ns: 'createCourse' })
                    )}
                  </PopoverContentWrapper>
                </Popover.Content>
              </Popover>
            </LabelWrapper>
            {categories && (
              <SpaceWrapper>
                <SelectSection
                  width="100%"
                  sections={categories}
                  placeholder={t('inputs.Select Category', {
                    ns: 'createCourse',
                  })}
                  value={category}
                  disabled={course?.status !== 'draft'}
                  onChange={(category: Category) =>
                    handleInputChange('category', category._id)
                  }
                />
              </SpaceWrapper>
            )}
            {category && category.children.length > 0 && (
              <SpaceWrapper>
                <SelectSection
                  width="100%"
                  sections={category.children}
                  placeholder={t('inputs.Select Subcategory', {
                    ns: 'createCourse',
                  })}
                  value={subCategory}
                  onChange={(category: Category) =>
                    handleInputChange('subCategory', category._id)
                  }
                  disabled={course?.status !== 'draft'}
                />
              </SpaceWrapper>
            )}
            {subCategory && subCategory.children.length > 0 && (
              <SpaceWrapper>
                <SelectSection
                  width="100%"
                  sections={subCategory.children}
                  placeholder={t('inputs.Select Subcategory', {
                    ns: 'createCourse',
                  })}
                  value={subSubCategory}
                  onChange={(category: Category) =>
                    handleInputChange('subSubCategory', category._id)
                  }
                  disabled={course?.status !== 'draft'}
                />
              </SpaceWrapper>
            )}
          </ElementWrapper>
        </SectionsWrapper>
        <RightContainer>
          <ElementWrapper>
            <LabelWrapper>
              <CreateCourseLabel
                title={t('titles.ageLimit', { ns: 'createCourse' })}
                required
              />
              <Popover placement="top-left">
                <Popover.Trigger>
                  <TooltipWrapper>
                    <InfoTextIcon />
                  </TooltipWrapper>
                </Popover.Trigger>
                <Popover.Content>
                  <PopoverContentWrapper>
                    {getFragmentedText(
                      t('tooltips.ageLimit', { ns: 'createCourse' })
                    )}
                  </PopoverContentWrapper>
                </Popover.Content>
              </Popover>
            </LabelWrapper>
            <Select
              options={ageLimits}
              placeholder={t('placeholders.selectAgeLimit', {
                ns: 'createCourse',
              })}
              onChange={(ageLimit: CourseAgeLimitObject) =>
                handleInputChange('ageLimit', ageLimit.value)
              }
              renderItem={(option: CourseAgeLimitObject) => option.label}
              renderKey={(option: CourseAgeLimitObject) => option.value + 'key'}
              disabled={course?.status !== 'draft'}
              value={ageLimits.find(
                (ageLimit) => ageLimit.value === course.ageLimit
              )}
            />
          </ElementWrapper>
          <ElementWrapper>
            <LabelWrapper>
              <CreateCourseLabel
                title={t('titles.level', {
                  ns: 'createCourse',
                })}
                required
              />
              <Popover placement="top-left">
                <Popover.Trigger>
                  <TooltipWrapper>
                    <InfoTextIcon />
                  </TooltipWrapper>
                </Popover.Trigger>
                <Popover.Content>
                  <PopoverContentWrapper>
                    {getFragmentedText(
                      t('tooltips.level', { ns: 'createCourse' })
                    )}
                  </PopoverContentWrapper>
                </Popover.Content>
              </Popover>
            </LabelWrapper>
            <LevelSelectorsWrapper>
              <CourseLevelSelector
                id={'allLevel'}
                type="all"
                selected={course.level === 'all'}
                onClick={() => handleInputChange('level', 'all')}
                disabled={course?.status !== 'draft'}
              />
              <CourseLevelSelector
                id={'beginnerLevel'}
                type="beginner"
                selected={course.level === 'beginner'}
                onClick={() => handleInputChange('level', 'beginner')}
                disabled={course?.status !== 'draft'}
              />
              <CourseLevelSelector
                id={'intermediateLevel'}
                type="intermediate"
                selected={course.level === 'intermediate'}
                onClick={() => handleInputChange('level', 'intermediate')}
                disabled={course?.status !== 'draft'}
              />
              <CourseLevelSelector
                id={'expertLevel'}
                type="expert"
                selected={course.level === 'expert'}
                onClick={() => handleInputChange('level', 'expert')}
                disabled={course?.status !== 'draft'}
              />
            </LevelSelectorsWrapper>
          </ElementWrapper>
          <ElementWrapper>
            <LabelWrapper>
              <CreateCourseLabel
                title={t('titles.courseLanguage', {
                  ns: 'createCourse',
                })}
                required
              />
              <Popover placement="top-left">
                <Popover.Trigger>
                  <TooltipWrapper>
                    <InfoTextIcon />
                  </TooltipWrapper>
                </Popover.Trigger>
                <Popover.Content>
                  <PopoverContentWrapper>
                    {getFragmentedText(
                      t('tooltips.language', { ns: 'createCourse' })
                    )}
                  </PopoverContentWrapper>
                </Popover.Content>
              </Popover>
            </LabelWrapper>
            <LanguageSelector
              value={course.languages || []}
              disabled={course?.status !== 'draft'}
              addLanguage={addLanguage}
              deleteLanguage={deleteLanguage}
            />
          </ElementWrapper>
        </RightContainer>
      </ContentWrapper>
      <ButtonsWrapper>
        {!changesSaved && (
          <Button
            backgroundColor={colors.uguRed}
            width="15.2rem"
            height="2.9rem"
            color="#1A1E3D"
            text={t('buttons.Cancel', { ns: 'common' })}
            fontFamily={fontFamilies.bold}
            fontSize="0.9rem"
            marginLeft="auto"
            disabled={changesSaved}
            onClick={discardChanges}
          />
        )}
        <Button
          backgroundColor={colors.uguBlue}
          width="15.2rem"
          height="2.9rem"
          color="#1A1E3D"
          text={t('buttons.Save', { ns: 'common' })}
          fontFamily={fontFamilies.bold}
          fontSize="0.9rem"
          marginLeft={!changesSaved ? '2rem' : 'auto'}
          disabled={changesSaved}
          onClick={saveChanges}
        />
        <Button
          backgroundColor={colors.uguYellow}
          width="15.2rem"
          height="2.9rem"
          color="#1A1E3D"
          text={t('buttons.Continue')}
          fontFamily={fontFamilies.bold}
          fontSize="0.9rem"
          marginLeft="2rem"
          disabled={!changesSaved}
          onClick={() => (changesSaved ? setActiveStep(2) : {})}
        />
      </ButtonsWrapper>
    </Container>
  )
}

export default StepOne
