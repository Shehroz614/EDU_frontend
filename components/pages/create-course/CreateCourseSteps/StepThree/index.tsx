// @ts-nocheck
import React from 'react'
import Button from '@components/atoms/Button'
import InfoTextIcon from '@components/atoms/InfoTextIcon'
import VideoSection from '@components/pages/create-course/UploadVideoBlock'
import { colors, fontFamilies } from 'configs/styles/config'
import AddRequirementsBlock from '@components/pages/create-course/AddRequirementsBlock'
import AboutAuthorBlock from '@components/pages/create-course/AboutAuthorBlock'
import ShortDescriptionBlock from '@components/pages/create-course/ShortDescriptionBlock'
import UploadImageBlock from '@components/pages/create-course/UploadImageBlock'
import {
  courseRequirementTextLimit,
  courseResultTextLimit,
  courseRequirementsMaxAmount,
  courseWhatStudentsWillLearnMaxAmount,
} from 'configs/constants/textLimits'
import CreateCourseLabel from '../../CreateCourseLabel'
import { useCreateCourse } from '@contexts/CreateCourse'
import { useTranslation } from 'next-i18next'
import useStepThree from '@hooks/CreateCourses/useStepThree'
import {
  StepContainer,
  StepWrapper,
  ButtonsWrapper,
  RequirementsWrapper,
  TextFieldWrapper,
  InfoWrapper,
  PresentationalVideoWrapper,
  VideoSectionWrapper,
} from '@styled_components/StepThree/styled.components'
import AddKeywordsBlock from '../../AddKeywordsBlock'
import DescriptionBlock from '../../DescriptionBlock'
import {
  PopoverContentWrapper,
  TooltipWrapper,
} from '@styled_components/CreateCourse/styled.components'
import { getFragmentedText } from '@utils/getFragmentedText'
import { Popover } from '@nextui-org/react'

const StepThree: React.FC = () => {
  // @ts-ignore
  const { t } = useTranslation(['common', 'createCourse'])
  const { course_id, setActiveStep, setBottomNotification } = useCreateCourse()
  const {
    course,
    setPresentationalImage,
    setPresentationalVideo,
    isPresentationalVideoUploading,
    setIsPresentationalVideoUploading,
    editShortDescriptionHandler,
    editDescriptionHandler,
    editAboutAuthorHandler,
    addRequirementHandler,
    editRequirementHandler,
    deleteRequirementHandler,
    addResultHandler,
    editResultHandler,
    deleteResultHandler,
    addKeywordHandler,
    deleteKeywordHandler,
  } = useStepThree()

  return (
    <StepContainer>
      <StepWrapper>
        <PresentationalVideoWrapper>
          <TextFieldWrapper>
            <CreateCourseLabel
              title={t('titles.previewVideo', { ns: 'createCourse' })}
              required
            />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.previewVideo', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>

          <VideoSection
            isPublic={true}
            courseId={course_id}
            courseVersion={course.version}
            videoContent={course.presentationalVideo}
            setVideoContent={setPresentationalVideo}
            isVideoUploading={isPresentationalVideoUploading}
            setIsVideoUploading={setIsPresentationalVideoUploading}
            isPresentationalVideo={true}
            setBottomNotification={setBottomNotification}
            disabled={course.status != 'draft'}
            abortControllers={{}}
            addAbortController={function (
              name: string,
              controller: AbortController
            ): void {
              throw new Error('Function not implemented.')
            }}
            removeAbortController={function (name: string): void {
              throw new Error('Function not implemented.')
            }}
          />
        </PresentationalVideoWrapper>
        <PresentationalVideoWrapper>
          <TextFieldWrapper>
            <CreateCourseLabel
              title={t('titles.courseImage', { ns: 'createCourse' })}
              required
            />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.courseImage', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <UploadImageBlock
            courseId={course_id}
            courseVersion={course.version}
            image={course.presentationalImage}
            setImage={setPresentationalImage}
            isVideoUploading={isPresentationalVideoUploading}
            setIsVideoUploading={setIsPresentationalVideoUploading}
            isPresentationalImage={true}
            setBottomNotification={setBottomNotification}
            disabled={course.status != 'draft'}
          />
        </PresentationalVideoWrapper>
        <VideoSectionWrapper>{/* <VideoSection /> */}</VideoSectionWrapper>
        <RequirementsWrapper>
          <TextFieldWrapper>
            <CreateCourseLabel
              title={t('titles.keywords', { ns: 'createCourse' })}
              required
            />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.keywords', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <AddKeywordsBlock
            keywords={course?.keywords || []}
            addKeywordHandler={addKeywordHandler}
            deleteKeywordHandler={deleteKeywordHandler}
            disabled={course?.status != 'draft'}
          />
        </RequirementsWrapper>
        <RequirementsWrapper>
          <TextFieldWrapper>
            <CreateCourseLabel
              title={t('titles.requirements', { ns: 'createCourse' })}
              required
            />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.requirements', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <AddRequirementsBlock
            items={course?.requirements || []}
            addItemTitle={t('requirements.Requirements Added', {
              ns: 'createCourse',
            })}
            editItemTitle={t('requirements.Edit Requirement', {
              ns: 'createCourse',
            })}
            addItemPlaceholder={t('requirements.Type a new requirement', {
              ns: 'createCourse',
            })}
            existingItemsTitle={t('requirements.Existing requirements:', {
              ns: 'createCourse',
            })}
            emptyItemsTitle={t('requirements.There is no requirements yet', {
              ns: 'createCourse',
            })}
            itemAddedMessage={t(
              'requirements.New requirement has been added!',
              { ns: 'createCourse' }
            )}
            itemDeletedMessage={t(
              'requirements.Requirement has been deleted!',
              { ns: 'createCourse' }
            )}
            itemEditedMessage={t('requirements.Requirement has been updated!', {
              ns: 'createCourse',
            })}
            itemEmptyMessage={t('requirements.Requirement cannot be empty!', {
              ns: 'createCourse',
            })}
            addItemHandler={addRequirementHandler}
            editItemHandler={editRequirementHandler}
            deleteItemHandler={deleteRequirementHandler}
            maxLength={courseRequirementTextLimit}
            disabled={course?.status != 'draft'}
            courseRequirementsMaxAmount={courseRequirementsMaxAmount}
          />
        </RequirementsWrapper>
        <RequirementsWrapper>
          <TextFieldWrapper>
            <CreateCourseLabel
              title={t('titles.whatStudentsWillLearn', { ns: 'createCourse' })}
              required
            />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.whatStudentWillLearn', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <AddRequirementsBlock
            items={course?.whatYouWillLearn || []}
            addItemTitle={t('items.Items Added', { ns: 'createCourse' })}
            editItemTitle={t('items.Edit Item', { ns: 'createCourse' })}
            addItemPlaceholder={t('items.Type a new item', {
              ns: 'createCourse',
            })}
            existingItemsTitle={t('items.Existing items:', {
              ns: 'createCourse',
            })}
            emptyItemsTitle={t('items.There are no items yet', {
              ns: 'createCourse',
            })}
            itemAddedMessage={t('items.New item has been added!', {
              ns: 'createCourse',
            })}
            itemDeletedMessage={t('items.Item has been deleted!', {
              ns: 'createCourse',
            })}
            itemEditedMessage={t('items.Item has been updated!', {
              ns: 'createCourse',
            })}
            itemEmptyMessage={t('items.Item cannot be empty!', {
              ns: 'createCourse',
            })}
            addItemHandler={addResultHandler}
            editItemHandler={editResultHandler}
            deleteItemHandler={deleteResultHandler}
            maxLength={courseResultTextLimit}
            disabled={course?.status != 'draft'}
            courseRequirementsMaxAmount={courseWhatStudentsWillLearnMaxAmount}
          />
        </RequirementsWrapper>
        <RequirementsWrapper>
          <TextFieldWrapper>
            <CreateCourseLabel
              title={t('titles.shortDescription', { ns: 'createCourse' })}
              required
            />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.shortDescription', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <ShortDescriptionBlock
            shortDescription={course?.shortCourseDescription || ''}
            editShortDescription={editShortDescriptionHandler}
            setBottomNotification={setBottomNotification}
            disabled={course?.status !== 'draft'}
          />
        </RequirementsWrapper>
        <RequirementsWrapper>
          <TextFieldWrapper>
            <CreateCourseLabel
              title={t('titles.courseDescription', { ns: 'createCourse' })}
              required
            />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.courseDescription', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <DescriptionBlock
            description={course?.description || ''}
            editDescription={editDescriptionHandler}
            setBottomNotification={setBottomNotification}
            disabled={course?.status !== 'draft'}
          />
        </RequirementsWrapper>
        <RequirementsWrapper>
          <TextFieldWrapper>
            <CreateCourseLabel
              title={t('titles.aboutAuthor', { ns: 'createCourse' })}
              required
            />
            <Popover placement="top-left">
              <Popover.Trigger>
                <TooltipWrapper>
                  <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                </TooltipWrapper>
              </Popover.Trigger>
              <Popover.Content>
                <PopoverContentWrapper>
                  {getFragmentedText(
                    t('tooltips.aboutAuthor', { ns: 'createCourse' })
                  )}
                </PopoverContentWrapper>
              </Popover.Content>
            </Popover>
          </TextFieldWrapper>
          <AboutAuthorBlock
            aboutAuthor={course.aboutAuthor || ''}
            editAboutAuthor={editAboutAuthorHandler}
            setBottomNotification={setBottomNotification}
            disabled={course?.status !== 'draft'}
          />
        </RequirementsWrapper>
      </StepWrapper>
      <ButtonsWrapper>
        <Button
          text={t('buttons.Continue', { ns: 'common' })}
          backgroundColor={colors.uguYellow}
          color="#1A1E3D"
          width="15rem"
          height="2.9rem"
          fontFamily={fontFamilies.bold}
          marginTop="8.8rem"
          onClick={() => setActiveStep(4)}
        />
      </ButtonsWrapper>
    </StepContainer>
  )
}

export default StepThree
