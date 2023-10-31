// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import Button from '@components/atoms/Button'
import CoursePageBlock from '@components/organisms/CoursePageBlock'
import { colors, fontFamilies } from '@configs/styles/config'
import { useCreateCourse } from '@contexts/CreateCourse'
import { useTranslation } from 'next-i18next'
import CreateCourseLabel from '../../CreateCourseLabel'
import InfoTextIcon from '@components/atoms/InfoTextIcon'
import TextInput from '@components/atoms/TextInput'
import { COURSE_REVIEW_NOTE_TEXT_LIMIT } from '@configs/constants/textLimits'
import TextArea from '@components/atoms/TextArea'
import { AnimatePresence, motion } from 'framer-motion'
import PencilIcon from '@public/static/icons/createCourseIcons/intro-icon'
import MaterialsIcon from '@public/static/icons/createCourseIcons/materials-icon'
import MarketingIcon from '@public/static/icons/createCourseIcons/marketing-icon'
import PriceIcon from '@public/static/icons/createCourseIcons/pricing-icon'
import RedCrossIcon from '@public/static/icons/createCourseIcons/red-cross-icon'
import GreenTickIcon from '@public/static/icons/createCourseIcons/green-tick-icon'
import {
  ButtonRow,
  ButtonsWrapper,
  CompletedSection,
  CoursePreviewContainer,
  CourseStatusDescription,
  HeaderWrapper,
  IconWrapper,
  IncmpletedSection,
  InfoWrapper,
  InputBlock,
  LoadingWrapper,
  MainWrapper,
  SectionComplete,
  SectionHeader,
  SectionItem,
  SectionName,
  SectionStatus,
  SectionStatusHeader,
  SectionsWrapper,
  SectionText,
  StatusContainer,
  StatusHeader,
  StatusIndicator,
  StatusSubHeader,
  StatusWrapper,
  StausTexts,
  StepContainer,
  TermsContainer,
  TermsContent,
  TermsContentWrapper,
  TermsFooter,
  TermsItems,
  TermsSectionHeader,
  TermsSidebar,
  TermsWrapper,
  TextFieldWrapper,
} from '@styled_components/StepFive/styled.components'
import Portal from '@components/molecules/Portal'
import useStepFive from '@hooks/CreateCourses/useStepFive'
import Loader from '@components/organisms/Loader'
import courseStatuses from '@constants/courseStatuses'
import Link from 'next/link'
import _ from 'lodash'
import excludeVersionsCompareFields from '@constants/compareCourseVersions'
import {
  NotVerifiedNoticeCol,
  NotVerifiedNoticeIconWrapper,
  NotVerifiedNoticeRow,
} from '@styled_components/author/styled.components'
import { Text, Card, Button as NxButton, Popover } from '@nextui-org/react'
import ShieldIcon from '@public/static/icons/shield-icon'
import { useAuth } from '@hooks/useAuth'
import { useRouter } from 'next/router'
import {
  PopoverContentWrapper,
  TooltipWrapper,
} from '@styled_components/CreateCourse/styled.components'
import { getFragmentedText } from '@utils/getFragmentedText'

type validationType = {
  intro: string[]
  materials: string[]
  marketing: string[]
  price: string[]
  hasChanged: boolean
}

const StepFive: React.FC = () => {
  const router = useRouter()
  const { authState } = useAuth()
  const { t } = useTranslation(['common', 'createCourse'])
  const {
    course,
    setActiveStep,
    setBottomNotification,
    course_id,
    versions,
    liveVersion,
    draftVersion,
  } = useCreateCourse()
  const {
    reviewNote,
    editReviewNote,
    contactEmail,
    editContactEmail,
    validateFields,
    isPublishEnabled,
    publishCourse,
    cancelReview,
  } = useStepFive()
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [showTermsPopup, setShowTermsPopup] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState('')

  const [isReviewSubmitted, setIsReviewSubmitted] = useState<boolean>(
    course?.status !== 'draft'
  )
  const [validation, setValidation] = useState<validationType>({
    intro: [],
    materials: [],
    marketing: [],
    price: [],
    hasChanged: true,
  })

  const popupRef = useRef<HTMLDivElement>(null)

  console.log('Validation', validation)

  useEffect(() => {
    setIsReviewSubmitted(course?.status !== 'draft')

    setValidation({
      intro: [],
      materials: [],
      marketing: [],
      price: [],
    })

    const tempValidation: validationType = {
      intro: [],
      materials: [],
      marketing: [],
      price: [],
      hasChanged: true,
    }

    //Is draft different from live
    if (liveVersion && draftVersion) {
      const oldVersion = _.omit(course, excludeVersionsCompareFields)
      const newVersion = _.omit(
        versions[liveVersion],
        excludeVersionsCompareFields
      )
      tempValidation.hasChanged = !_.isEqual(oldVersion, newVersion)
    }

    //Intro validation
    if (
      (course?.title?.trim().length || 0) < 3 ||
      course?.title?.trim() == null
    ) {
      tempValidation.intro.push('Title')
    }
    if (course?.category?.length == 0 || course?.category == null) {
      tempValidation.intro.push('Category')
    }
    if (course?.subCategory?.length == 0 || course?.subCategory == null) {
      tempValidation.intro.push('Sub Category')
    }
    // if(course?.subSubCategory?.length == 0 || course?.subSubCategory == null){
    //   tempValidation.intro.push("Topic");
    // }
    if (course?.languages?.length == 0 || course?.languages == null) {
      tempValidation.intro.push('Language')
    }
    if (course?.ageLimit?.trim() == null) {
      tempValidation.intro.push('Age limit')
    }
    if (course?.level?.trim() == null) {
      tempValidation.intro.push('Level')
    }

    //Materials validation
    let lecCount = 0

    course?.course_materials?.sections.map((section: any) => {
      lecCount += section?.lectures?.length || 0
    })

    if (lecCount == 0) {
      tempValidation.materials.push('Lectures')
    }

    //Marketing validation
    if (course?.presentationalVideo?._id == null) {
      tempValidation.marketing.push('Presentational Video')
    }
    if (course?.presentationalImage?.trim() == null) {
      tempValidation.marketing.push('Presentational Image')
    }
    if ((course?.keywords?.length || 0) < 3) {
      tempValidation.marketing.push('Keywords')
    }
    // This one if we will need to validate requirements
    //
    // if(course?.title?.trim() == null){
    //   tempValidation.marketing.push("Title");
    // }
    if ((course?.whatYouWillLearn?.length || 0) < 1) {
      tempValidation.marketing.push('What Students will learn')
    }
    if (
      course?.shortCourseDescription?.trim() == null ||
      course?.shortCourseDescription?.trim().length == 0
    ) {
      tempValidation.marketing.push('Short Description')
    }
    if (
      (course?.description?.trim().length || 0) < 100 ||
      (course?.description?.trim().length || 0) > 2000 ||
      course?.description?.trim() == null
    ) {
      tempValidation.marketing.push('Description (100 - 2000 char.)')
    }
    if (
      (course?.aboutAuthor?.trim().length || 0) < 100 ||
      (course?.aboutAuthor?.trim().length || 0) > 2000 ||
      course?.aboutAuthor?.trim() == null
    ) {
      tempValidation.marketing.push('About Author (100 - 2000 char.)')
    }

    console.log('Validation', course)
    //Price validation
    if (course?.price === null || course?.price <= 0) {
      tempValidation.price.push(
        'Price/ Desired Price (Required/Greater than 0)'
      )
    }
    if (course?.priceType === null) {
      tempValidation.price.push('Price Type (Required)')
    }
    if (
      course?.priceType === 'smart' &&
      (!course?.minPrice || course?.minPrice <= 0)
    ) {
      tempValidation.price.push('Minimum Price (Required/Greater than 0)')
    }

    setValidation(tempValidation)
  }, [course])

  const exitPreview = () => setIsPreview(false)
  const handleSubmit = () => {
    if (
      authState?.user?.isAuthor &&
      !authState?.user?.isAuthorVerified &&
      authState?.user?.my_courses?.length > 1
    ) {
      return
    }
    if (!isPublishEnabled) {
      return
    }
    if (validateFields(reviewNote, contactEmail)) {
      setShowTermsPopup(true)
    } else {
      setBottomNotification({
        message: 'Please provide valid details for all the fields',
        actionType: 'error',
      })
    }
  }
  const handlePublishCourse = async () => {
    setShowTermsPopup(false)
    publishCourse()
      .then(() => {
        setIsLoading(false)
        setIsPreview(false)
        setIsReviewSubmitted(true)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }
  const handleCancelReview = async () => {
    cancelReview()
  }

  const handleScroll = () => {
    const sections =
      popupRef.current?.querySelectorAll<HTMLDivElement>('div[id^="section"]')

    let currentSection = ''

    if (sections) {
      sections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect()

        if (
          sectionRect.top <= window.innerHeight * 0.5 &&
          sectionRect.bottom > window.innerHeight * 0.5
        ) {
          currentSection = section.id
        }
      })
    }

    setActiveSection(currentSection)
  }

  const [visitedSection, setVisitedSection] = useState('')
  useEffect(() => {
    if (visitedSection < activeSection) {
      setVisitedSection(activeSection)
    }
  }, [activeSection])

  useEffect(() => {
    popupRef?.current?.addEventListener('scroll', handleScroll)
    return () => {
      popupRef?.current?.removeEventListener('scroll', handleScroll)
    }
  }, [popupRef, showTermsPopup])

  const sectionNames = [
    'terms.1 Agreement',
    'terms.2 Services & Paid Subscription',
    'terms.3 Rights and Laws',
    'terms.4 3rd Part Applications',
    'terms.5 Rights you grant us',
  ]

  const handleVerifyButton = () => {
    router.push(
      authState?.user?.isAuthor
        ? '/author/verification'
        : '/author/become-author'
    )
  }

  return (
    <StepContainer>
      {isLoading && (
        <LoadingWrapper>
          <Loader size="medium" />
        </LoadingWrapper>
      )}
      {!authState.user?.isAuthorVerified && (
        <Card variant="flat" style={{ marginBottom: 20 }}>
          <Card.Body style={{ padding: '20px 30px' }}>
            <NotVerifiedNoticeRow>
              <NotVerifiedNoticeCol style={{ flexGrow: 1, paddingRight: 20 }}>
                <Text>
                  <NotVerifiedNoticeIconWrapper>
                    <ShieldIcon />
                  </NotVerifiedNoticeIconWrapper>
                  {t('strings.authorNotVerified', { ns: 'createCourse' })}
                </Text>
              </NotVerifiedNoticeCol>
              <NotVerifiedNoticeCol>
                <NxButton onClick={handleVerifyButton}>
                  {t('buttons.verifyNow', { ns: 'createCourse' })}
                </NxButton>
              </NotVerifiedNoticeCol>
            </NotVerifiedNoticeRow>
          </Card.Body>
        </Card>
      )}
      <AnimatePresence>
        {course?.status !== 'draft' && !isPreview ? (
          <MainWrapper>
            {course?.status !== 'rejected' && (
              <InputBlock>
                <TextFieldWrapper>
                  {course?.status !== 'online' ? (
                    <CreateCourseLabel
                      title={t('titles.coursePreview', { ns: 'createCourse' })}
                    />
                  ) : (
                    <CreateCourseLabel
                      title={t('titles.viewCourse', { ns: 'createCourse' })}
                    />
                  )}
                  <Popover placement="top-left">
                    <Popover.Trigger>
                      <TooltipWrapper>
                        <InfoTextIcon style={{ marginLeft: '0.5rem' }} />
                      </TooltipWrapper>
                    </Popover.Trigger>
                    <Popover.Content>
                      <PopoverContentWrapper>
                        {getFragmentedText(
                          t('tooltips.viewCourse', { ns: 'createCourse' })
                        )}
                      </PopoverContentWrapper>
                    </Popover.Content>
                  </Popover>
                </TextFieldWrapper>
                {course?.status !== 'online' &&
                course?.status !== 'approved' ? (
                  <>
                    <StatusContainer>
                      <StatusIndicator status={course?.status || 'draft'} />
                      {courseStatuses[course?.status || 'draft']}
                    </StatusContainer>
                    <Button
                      width="15.2rem"
                      height="2.9rem"
                      backgroundColor={colors.uguYellow}
                      text={t('titles.coursePreview', { ns: 'createCourse' })}
                      fontFamily={fontFamilies.bold}
                      fontSize="0.9rem"
                      marginTop="1rem"
                      onClick={() => setIsPreview(true)}
                    />
                  </>
                ) : null}

                {course?.status == 'online' && (
                  <>
                    <Link href={'/course-page/?id=' + course_id} passHref>
                      <Button
                        width="15.2rem"
                        height="2.9rem"
                        backgroundColor={colors.uguYellow}
                        text={t('titles.viewCourse', { ns: 'createCourse' })}
                        fontFamily={fontFamilies.bold}
                        fontSize="0.9rem"
                        marginTop="1rem"
                        onClick={() => {}}
                      />
                    </Link>
                  </>
                )}
              </InputBlock>
            )}
            <InputBlock>
              <TextFieldWrapper>
                <CreateCourseLabel
                  title={t('titles.statusDescription', {
                    ns: 'createCourse',
                  })}
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
                        t('tooltips.statusDescription', { ns: 'createCourse' })
                      )}
                    </PopoverContentWrapper>
                  </Popover.Content>
                </Popover>
              </TextFieldWrapper>
              <CourseStatusDescription>
                {course?.status === 'online'
                  ? t(
                      'review.Your Course has been accepted by Reviewer and is currently online',
                      { ns: 'createCourse' }
                    )
                  : course?.status === 'inReview'
                  ? t(
                      'review.Your Course has been submitted for review, we will get back to you soon',
                      { ns: 'createCourse' }
                    )
                  : course?.status === 'approved'
                  ? t(
                      'review.Your Course has been accepted by Reviewer, you can publish it now',
                      { ns: 'createCourse' }
                    )
                  : course?.status === 'rejected' &&
                    t('review.Your Course has been rejected by Reviewer', {
                      ns: 'createCourse',
                    })}
              </CourseStatusDescription>
            </InputBlock>
            {course?.status !== 'online' &&
              course?.status !== 'approved' &&
              course?.status !== 'rejected' && (
                <InputBlock>
                  <TextFieldWrapper>
                    <CreateCourseLabel
                      title={t('titles.cancelPreview', {
                        ns: 'createCourse',
                      })}
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
                            t('tooltips.cancelPreview', {
                              ns: 'createCourse',
                            })
                          )}
                        </PopoverContentWrapper>
                      </Popover.Content>
                    </Popover>
                  </TextFieldWrapper>
                  <Button
                    width="15.2rem"
                    height="2.9rem"
                    backgroundColor={colors.uguRed}
                    color={colors.uguWhite}
                    text={t('cancelReview', {
                      ns: 'createCourse',
                    })}
                    fontFamily={fontFamilies.bold}
                    fontSize="0.9rem"
                    marginTop="1rem"
                    onClick={handleCancelReview}
                  />
                </InputBlock>
              )}
            {course?.status === 'approved' && (
              <InputBlock>
                <TextFieldWrapper>
                  <CreateCourseLabel
                    title={t('titles.courseManagement', {
                      ns: 'createCourse',
                    })}
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
                          t('tooltips.courseManagement', { ns: 'createCourse' })
                        )}
                      </PopoverContentWrapper>
                    </Popover.Content>
                  </Popover>
                </TextFieldWrapper>
                <ButtonRow>
                  <Button
                    width="15.2rem"
                    height="2.9rem"
                    backgroundColor={colors.uguGreen}
                    color={colors.uguWhite}
                    text={t('common.publishCourse', { ns: 'createCourse' })}
                    fontFamily={fontFamilies.bold}
                    fontSize="0.9rem"
                    marginTop="1rem"
                    onClick={() => {}}
                    marginRight="1rem"
                  />
                  <Button
                    width="15.2rem"
                    height="2.9rem"
                    backgroundColor={colors.uguRed}
                    color={colors.uguWhite}
                    text={t('common.discardChanges', { ns: 'createCourse' })}
                    fontFamily={fontFamilies.bold}
                    fontSize="0.9rem"
                    marginTop="1rem"
                    onClick={() => {}}
                  />
                </ButtonRow>
              </InputBlock>
            )}
          </MainWrapper>
        ) : isPreview ? (
          <CoursePreviewContainer
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: 'tween' }}
          >
            <CoursePageBlock
              course={course}
              isPreview={true}
              exitPreview={exitPreview}
              course_id={course_id}
            />
          </CoursePreviewContainer>
        ) : (
          <MainWrapper>
            <InputBlock>
              <TextFieldWrapper>
                <CreateCourseLabel
                  title={t('titles.courseStatus', { ns: 'createCourse' })}
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
                        t('tooltips.courseStatus', { ns: 'createCourse' })
                      )}
                    </PopoverContentWrapper>
                  </Popover.Content>
                </Popover>
              </TextFieldWrapper>
              {validation.intro.length == 0 &&
              validation.marketing.length == 0 &&
              validation.materials.length == 0 &&
              validation.price.length == 0 ? (
                <StatusWrapper>
                  <GreenTickIcon width="41px"></GreenTickIcon>
                  <StausTexts>
                    <StatusHeader>
                      {t('completed', {
                        ns: 'createCourse',
                      })}
                    </StatusHeader>
                    <StatusSubHeader>
                      {t('allSectionsHaveBeenCompleted', {
                        ns: 'createCourse',
                      })}
                    </StatusSubHeader>
                  </StausTexts>
                </StatusWrapper>
              ) : (
                <StatusWrapper>
                  <RedCrossIcon width="41px"></RedCrossIcon>
                  <StausTexts>
                    <StatusHeader>
                      {t('notCompleted', { ns: 'createCourse' })}
                    </StatusHeader>
                    <StatusSubHeader>
                      {t('pleaseChecktheDetailsSection', {
                        ns: 'createCourse',
                      })}
                    </StatusSubHeader>
                  </StausTexts>
                </StatusWrapper>
              )}
              <HeaderWrapper>
                <SectionHeader>
                  {t('section', {
                    ns: 'createCourse',
                  })}
                </SectionHeader>
                <SectionStatusHeader>
                  {t('sectionStatus', {
                    ns: 'createCourse',
                  })}
                </SectionStatusHeader>
              </HeaderWrapper>
              <SectionsWrapper>
                <SectionItem>
                  <SectionName onClick={() => setActiveStep(1)}>
                    <IconWrapper>
                      <PencilIcon></PencilIcon>
                    </IconWrapper>
                    <SectionText>
                      {t('introduction', {
                        ns: 'createCourse',
                      })}
                    </SectionText>
                  </SectionName>
                  <SectionStatus>
                    {validation.intro.length > 0 ? (
                      validation.intro.map((item) => (
                        <IncmpletedSection key={item}>{item}</IncmpletedSection>
                      ))
                    ) : (
                      <CompletedSection>
                        {t('completed', {
                          ns: 'createCourse',
                        })}
                      </CompletedSection>
                    )}
                  </SectionStatus>
                  <SectionComplete>
                    {/* {
                      validation.intro.length > 0 &&
                      <CompleteButton onClick={() => setActiveStep(1)}>COMPLETE</CompleteButton>
                    } */}
                  </SectionComplete>
                </SectionItem>
                <SectionItem>
                  <SectionName onClick={() => setActiveStep(2)}>
                    <IconWrapper>
                      <MaterialsIcon></MaterialsIcon>
                    </IconWrapper>
                    <SectionText>
                      {t('outline', {
                        ns: 'createCourse',
                      })}
                    </SectionText>
                  </SectionName>
                  <SectionStatus>
                    {validation.materials.length > 0 ? (
                      validation.materials.map((item) => (
                        <IncmpletedSection key={item}>{item}</IncmpletedSection>
                      ))
                    ) : (
                      <CompletedSection>
                        {t('completed', {
                          ns: 'createCourse',
                        })}
                      </CompletedSection>
                    )}
                  </SectionStatus>
                  <SectionComplete>
                    {/* {
                      validation.materials.length > 0 &&
                      <CompleteButton onClick={() => setActiveStep(2)}>COMPLETE</CompleteButton>
                    } */}
                  </SectionComplete>
                </SectionItem>
                <SectionItem>
                  <SectionName onClick={() => setActiveStep(3)}>
                    <IconWrapper>
                      <MarketingIcon></MarketingIcon>
                    </IconWrapper>
                    <SectionText>
                      {t('presentation', {
                        ns: 'createCourse',
                      })}
                    </SectionText>
                  </SectionName>
                  <SectionStatus>
                    {validation.marketing.length > 0 ? (
                      validation.marketing.map((item) => (
                        <IncmpletedSection key={item}>{item}</IncmpletedSection>
                      ))
                    ) : (
                      <CompletedSection>
                        {t('completed', {
                          ns: 'createCourse',
                        })}
                      </CompletedSection>
                    )}
                  </SectionStatus>
                  <SectionComplete>
                    {/* {
                      validation.marketing.length > 0 &&
                      <CompleteButton onClick={() => setActiveStep(3)}>COMPLETE</CompleteButton>
                    } */}
                  </SectionComplete>
                </SectionItem>
                <SectionItem>
                  <SectionName onClick={() => setActiveStep(4)}>
                    <IconWrapper>
                      <PriceIcon></PriceIcon>
                    </IconWrapper>
                    <SectionText>
                      {t('price.price', {
                        ns: 'createCourse',
                      })}
                    </SectionText>
                  </SectionName>
                  <SectionStatus>
                    {validation.price.length > 0 ? (
                      validation.price.map((item) => (
                        <IncmpletedSection key={item}>{item}</IncmpletedSection>
                      ))
                    ) : (
                      <CompletedSection>
                        {t('completed', {
                          ns: 'createCourse',
                        })}
                      </CompletedSection>
                    )}
                  </SectionStatus>
                  <SectionComplete>
                    {/* {
                      validation.price.length > 0 &&
                      <CompleteButton onClick={() => setActiveStep(4)}>COMPLETE</CompleteButton>
                    } */}
                  </SectionComplete>
                </SectionItem>
              </SectionsWrapper>
            </InputBlock>
            <InputBlock>
              <TextFieldWrapper>
                <CreateCourseLabel
                  title={t('titles.coursePreview', { ns: 'createCourse' })}
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
                        t('tooltips.coursePreview', { ns: 'createCourse' })
                      )}
                    </PopoverContentWrapper>
                  </Popover.Content>
                </Popover>
              </TextFieldWrapper>
              <Button
                width="15.2rem"
                height="2.9rem"
                backgroundColor={colors.uguYellow}
                text={t('buttons.preview', { ns: 'common' })}
                fontFamily={fontFamilies.bold}
                fontSize="0.9rem"
                marginTop="1rem"
                onClick={() => setIsPreview(true)}
              />
            </InputBlock>
            <InputBlock>
              <TextFieldWrapper>
                <CreateCourseLabel
                  title={t('titles.reviewNote', { ns: 'createCourse' })}
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
                        t('tooltips.reviewNote', { ns: 'createCourse' })
                      )}
                    </PopoverContentWrapper>
                  </Popover.Content>
                </Popover>
              </TextFieldWrapper>
              <TextArea
                value={reviewNote}
                onChange={editReviewNote}
                placeholder={t('placeholders.provideWhat’sNew', {
                  ns: 'createCourse',
                })}
                width="100%"
                height="10rem"
                marginTop="1rem"
                backgroundColor="#ffffff"
                padding="1rem 2rem"
                borderRadius="25px"
                maxLength={COURSE_REVIEW_NOTE_TEXT_LIMIT}
                alwaysShowMaxLength={true}
              />
            </InputBlock>
            <InputBlock>
              <TextFieldWrapper>
                <CreateCourseLabel
                  title={t('titles.contactEmail', { ns: 'createCourse' })}
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
                        t('tooltips.contactEmail', { ns: 'createCourse' })
                      )}
                    </PopoverContentWrapper>
                  </Popover.Content>
                </Popover>
              </TextFieldWrapper>
              <TextInput
                value={contactEmail}
                onChange={editContactEmail}
                placeholder={t('placeholders.email', {
                  ns: 'createCourse',
                })}
                width="20rem"
                height="2.8rem"
                backgroundColor="#ffffff"
                padding="1rem 2rem"
                marginTop="1rem"
                maxLength={30}
                marginRight="1rem"
              />
            </InputBlock>
          </MainWrapper>
        )}
      </AnimatePresence>
      <ButtonsWrapper>
        {isPreview && (
          <Button
            backgroundColor="#ffffff"
            width="19.3rem"
            height="2.9rem"
            color="#1A1E3D"
            text={
              isPreview
                ? t('buttons.exitPreview', { ns: 'createCourse' })
                : t('buttons.backToEditing', { ns: 'createCourse' })
            }
            fontWeight="bold"
            fontSize="0.9rem"
            marginTop="3rem"
            borderColor="#1A1E3D"
            onClick={() => (isPreview ? setIsPreview(false) : setActiveStep(1))}
            border="1px solid"
          />
        )}
        {!isReviewSubmitted && (
          <Button
            backgroundColor="#E9B735"
            width="15.2rem"
            height="2.9rem"
            color="#1A1E3D"
            text={t('buttons.publish', { ns: 'createCourse' })}
            fontFamily={fontFamilies.bold}
            fontSize="0.9rem"
            marginTop="3rem"
            marginLeft="3rem"
            disabled={
              !isPublishEnabled ||
              !(
                validation.hasChanged &&
                validation.intro.length == 0 &&
                validation.marketing.length == 0 &&
                validation.materials.length == 0 &&
                validation.price.length == 0
              ) ||
              !authState.user?.isAuthor ||
              (authState?.user?.isAuthor &&
                !authState?.user?.isAuthorVerified &&
                // @ts-ignore
                authState?.user?.my_courses?.length > 1)
            }
            onClick={handleSubmit}
          />
        )}
      </ButtonsWrapper>
      {/* {showTermsPopup && ( */}
      <Portal selector="#modal">
        <TermsWrapper
          style={{
            display: showTermsPopup ? 'flex' : 'none',
          }}
        >
          <TermsContainer>
            <TermsSidebar>
              {sectionNames.map((sectionName, index) => (
                <TermsItems
                  key={`#section${index + 1}`}
                  isActive={activeSection === `section${index + 1}`}
                  isVisited={visitedSection >= `section${index + 1}`}
                >
                  {visitedSection < `section${index + 1}` ? (
                    <span>{t(sectionName, { ns: 'createCourse' })}</span>
                  ) : (
                    <Link
                      href={`#section${index + 1}`}
                      onClick={() => setActiveSection(`section${index + 1}`)}
                      style={{
                        textDecoration: 'none',
                        color: 'white',
                      }}
                    >
                      {t(sectionName, { ns: 'createCourse' })}
                    </Link>
                  )}
                </TermsItems>
              ))}
            </TermsSidebar>
            <TermsContentWrapper>
              <TermsContent ref={popupRef}>
                <h1>Edugram Inc.</h1>
                <h1>Terms & Conditions</h1>
                <div id="section1">
                  <TermsSectionHeader>
                    {t('terms.1 Agreement', { ns: 'createCourse' })}
                  </TermsSectionHeader>
                  <p>
                    By using Edugram (hereinafter referred to as the
                    &quot;Platform&quot;), you agree to be bound by these Terms
                    & Conditions. These Terms & Conditions constitute a legally
                    binding agreement between you and Edugram. If you do not
                    agree to these terms, please do not access or use the
                    Platform. Edugram reserves the right to change these Terms &
                    Conditions at any time, and it is your responsibility to
                    review them periodically for any changes. Your use of the
                    Platform is subject to your compliance with all applicable
                    laws, rules, and regulations. You are solely responsible for
                    any content you post or share on the Platform, as well as
                    any actions you take in connection with your use of the
                    Platform. By using the Platform, you represent and warrant
                    that you have the necessary rights, licenses, and
                    permissions to post, share, or otherwise use any content you
                    provide, and that your use of the Platform will not infringe
                    on the rights of any third parties, including but not
                    limited to intellectual property rights and privacy rights.
                    You agree to indemnify, defend, and hold harmless Edugram
                    and its affiliates, officers, directors, employees, and
                    agents from any claims, liabilities, damages, or expenses,
                    including reasonable attorneys&apos; fees, arising from or
                    related to your use of the Platform, your violation of these
                    Terms & Conditions, or your infringement of any third-party
                    rights. Edugram may, in its sole discretion, terminate your
                    access to the Platform or remove any content you provide,
                    without notice or liability, for any reason or no reason,
                    including but not limited to your violation of these Terms &
                    Conditions, your infringement of any third-party rights, or
                    your conduct that is harmful to the Platform, its users, or
                    any third parties. You acknowledge and agree that Edugram
                    may access, preserve, and disclose your account information
                    and any content you provide if required to do so by law or
                    if Edugram believes, in good faith, that such access,
                    preservation, or disclosure is reasonably necessary to
                    comply with legal process, enforce these Terms & Conditions,
                    respond to claims that any content violates the rights of
                    third parties, protect the rights, property, or personal
                    safety of Edugram, its users, or the public, or respond to
                    your requests for customer service. Edugram may also, in its
                    sole discretion, monitor your use of the Platform, including
                    but not limited to your submission of content, your
                    communication with other users, and your use of any features
                    or functionalities provided by the Platform. Edugram
                    reserves the right to take any action it deems appropriate
                    in response to any information it learns through such
                    monitoring, including but not limited to the removal of
                    content, the termination of your access to the Platform, or
                    the initiation of legal proceedings. You acknowledge and
                    agree that your use of the Platform is at your own risk, and
                    that Edugram is not responsible for any content you provide
                    or any actions you take in connection with your use of the
                    Platform. You further acknowledge and agree that the
                    Platform may contain links to third-party websites or
                    services that are not owned or controlled by Edugram, and
                    that Edugram is not responsible for the content, policies,
                    or practices of any third-party websites or services. You
                    are solely responsible for any interactions you have with
                    other users of the Platform or any third parties, and
                    Edugram is not responsible for any harm or damage that may
                    result from such interactions. By using the Platform, you
                    acknowledge and agree that you may be exposed to content
                    that you find offensive, indecent, or objectionable, and
                    that Edugram is not responsible for any such content. You
                    further acknowledge and agree that the Platform may contain
                    content that is protected by copyright, trademark, or other
                    intellectual property rights, and that you are solely
                    responsible
                  </p>
                </div>

                <div id="section2">
                  <TermsSectionHeader>
                    {t('terms.2 Services & Paid Subscription', {
                      ns: 'createCourse',
                    })}
                  </TermsSectionHeader>
                  <p>
                    The Platform offers a range of services, including but not
                    limited to access to educational content, communication with
                    authors, and the ability to purchase and enroll in courses.
                    Some services may be available for free, while others may
                    require a paid subscription. Edugram reserves the right to
                    modify, suspend, or discontinue any services at any time,
                    without prior notice. Edugram also reserves the right to
                    offer additional services, features, or functionalities,
                    which may be subject to separate terms and conditions. By
                    purchasing a paid subscription, you agree to pay the
                    associated fees, as well as any applicable taxes. Edugram
                    may change the fees for any service at any time, and it is
                    your responsibility to review the fees associated with a
                    service before purchasing it. All purchases are final, and
                    no refunds will be provided except as required by law or at
                    Edugram&apos;s sole discretion. Your subscription may also
                    be subject to automatic renewal, and you are responsible for
                    managing your subscription settings, including canceling any
                    unwanted renewals. In addition to paid subscriptions, the
                    Platform may offer promotional codes or discounts for
                    certain services. These promotional codes or discounts are
                    subject to their own terms and conditions, and may be
                    subject to expiration or other limitations. Edugram reserves
                    the right to modify or discontinue any promotional codes or
                    discounts at any time, without prior notice. Edugram may
                    also offer a referral program, which allows you to earn
                    rewards or discounts by referring new users to the Platform.
                    Participation in the referral program is subject to its own
                    terms and conditions, and Edugram reserves the right to
                    modify or discontinue the referral program at any time,
                    without prior notice. As a user of the Platform, you agree
                    to provide accurate, current, and complete information when
                    registering for an account or making a purchase. You are
                    responsible for maintaining the confidentiality of your
                    account information, including your username and password,
                    and for any activity that occurs under your account. You
                    agree to notify Edugram immediately of any unauthorized use
                    of your account or any other breach of security. As an
                    author on the Platform, you have the ability to create and
                    sell courses to users. By creating a course, you represent
                    and warrant that you have the necessary rights, licenses,
                    and permissions to use, distribute, and sell any content
                    included in the course, and that the course does not
                    infringe on the intellectual property rights of any third
                    parties. You also agree to comply with all applicable laws
                    and regulations in relation to the creation, distribution,
                    and sale of your courses, including but not limited to
                    export control laws and data protection laws. Edugram may,
                    in its sole discretion, review and approve or reject any
                    courses submitted by authors for sale on the Platform.
                    Edugram is not responsible for any content included in a
                    course, and any opinions, advice, or recommendations
                    expressed in a course are those of the author and not
                    Edugram. Authors are responsible for setting the prices for
                    their courses, and for any taxes or fees associated with the
                    sale of their courses. Edugram may, in its sole discretion,
                    withhold a portion of the revenue generated by the sale of a
                    course as a commission or processing fee. Authors may also
                    be eligible for revenue sharing or other incentives offered
                    by the Platform, subject to the terms and conditions of any
                    such programs. Users who purchase a course on the Platform
                    are granted a limited, non-exclusive, non-transferable
                    license to access and use the course for their personal,
                    non-commercial use. Users may not reproduce, redistribute,
                    or resell any content from a course, except as expressly
                    permitted by the author or as required by law.
                  </p>
                </div>

                <div id="section3">
                  <TermsSectionHeader>
                    {t('terms.3 Rights and Laws', { ns: 'createCourse' })}
                  </TermsSectionHeader>
                  <p>
                    By using the Edugram platform, you agree to abide by all
                    applicable local, national, and international laws, as well
                    as any rules, regulations, or guidelines established by the
                    platform. You are solely responsible for your conduct on the
                    platform, and for any content you create, share, or interact
                    with. As an author, you retain all intellectual property
                    rights to the content you create and upload to the platform,
                    except for any rights you expressly grant to Edugram in
                    these Terms & Conditions or in any other agreement you enter
                    into with the platform. By uploading content to the
                    platform, you grant Edugram a non-exclusive, worldwide,
                    royalty-free, sublicensable, and transferable license to
                    use, reproduce, distribute, display, and perform the content
                    in connection with the platform and its affiliated entities,
                    as well as for promoting and redistributing part or all of
                    the platform (and any derivative works thereof) in any media
                    formats and through any media channels. As a user, you
                    understand that the content made available on the platform
                    is owned by the respective authors or other content
                    providers and is protected by intellectual property laws,
                    including but not limited to copyright and trademark laws.
                    You agree not to copy, reproduce, distribute, transmit,
                    display, perform, or create derivative works from any
                    content available on the platform, except as expressly
                    permitted by the author or as required by law. Edugram
                    respects the intellectual property rights of others and
                    expects its users to do the same. The platform has a policy
                    for handling claims of copyright infringement, as well as
                    for removing content that is found to be infringing on the
                    rights of others. If you believe that your copyrighted work
                    has been copied, reproduced, or distributed on the platform
                    in a way that constitutes copyright infringement, or if you
                    believe that your intellectual property rights have been
                    otherwise violated, please follow our procedures for
                    reporting such issues, as outlined in our Copyright Policy.
                    In addition to intellectual property rights, you agree to
                    respect the privacy rights of other users and to comply with
                    all applicable data protection and privacy laws. You are
                    responsible for ensuring that any personal information you
                    collect, store, or process through the platform is done so
                    in compliance with all relevant laws and regulations, as
                    well as any guidelines or policies established by Edugram.
                    You also agree not to engage in any activities that could
                    harm the platform, its users, or its reputation, including
                    but not limited to: Using the platform for any illegal,
                    harmful, or abusive purposes; Interfering with the proper
                    functioning of the platform or its security features;
                    Accessing or attempting to access any unauthorized areas of
                    the platform; Impersonating any person or entity, or falsely
                    stating or otherwise misrepresenting your affiliation with
                    any person or entity; Harassing, stalking, or threatening
                    other users, or invading their privacy; Collecting, using,
                    or disclosing any personal information about other users
                    without their consent, or for any purpose other than the
                    purpose for which it was disclosed; Sending or posting any
                    unsolicited or unauthorized advertising, promotional
                    materials, or spam; Reverse engineering, decompiling, or
                    disassembling any part of the platform, or attempting to do
                    so. Violations of these Terms & Conditions may result in the
                    suspension or termination of your account, at Edugram&apos;s
                    sole discretion. In addition, Edugram reserves the right to
                    take any legal action it deems necessary or appropriate in
                    response to any violations of these Terms & Conditions or
                    any other actions that may harm the platform or its users.
                  </p>
                </div>
                <div id="section4">
                  <TermsSectionHeader>
                    {t('terms.4 3rd Part Applications', { ns: 'createCourse' })}
                  </TermsSectionHeader>
                  <p>
                    The Edugram platform may integrate or interact with
                    third-party applications, websites, or services
                    (collectively, &quot;Third-Party Applications&quot;) to
                    enhance the user experience and provide additional
                    functionality. Examples of Third-Party Applications include,
                    but are not limited to, payment processing services, video
                    conferencing tools, and social media platforms. By using the
                    Edugram platform, you acknowledge and agree that: Edugram
                    does not endorse, control, or assume responsibility for any
                    Third-Party Applications, including their content,
                    functionality, accuracy, legality, or availability; Your use
                    of any Third-Party Applications is at your own risk and
                    subject to the terms and conditions of those applications,
                    which may differ from Edugram&apos;s Terms & Conditions;
                    Edugram is not responsible for any loss, damage, or harm
                    that may result from your use of or reliance on any
                    Third-Party Applications; You are responsible for reading
                    and understanding the terms and conditions and privacy
                    policies of any Third-Party Applications you choose to use
                    or interact with, and for complying with those terms and
                    conditions and policies; You may be required to create an
                    account with the Third-Party Application provider, and to
                    provide certain personal information, in order to access or
                    use the Third-Party Application; Edugram may share certain
                    information with the Third-Party Application provider, as
                    necessary for the integration or interaction between the
                    Edugram platform and the Third-Party Application; Edugram
                    may receive fees or other compensation from the Third-Party
                    Application provider in connection with the integration or
                    interaction between the Edugram platform and the Third-Party
                    Application. Edugram reserves the right to modify, suspend,
                    or discontinue its integration or interaction with any
                    Third-Party Applications at any time, with or without
                    notice. You agree that Edugram will not be liable to you or
                    any third party for any modification, suspension, or
                    discontinuation of its integration or interaction with any
                    Third-Party Applications. If you choose to use any
                    Third-Party Applications in connection with your courses or
                    other content on the Edugram platform, you are responsible
                    for ensuring that your use of those applications complies
                    with all applicable laws, regulations, and guidelines, as
                    well as with any terms and conditions or policies
                    established by Edugram or the Third-Party Application
                    provider. You also agree to indemnify, defend, and hold
                    harmless Edugram and its affiliates, officers, directors,
                    employees, and agents from and against any and all claims,
                    liabilities, damages, losses, costs, expenses, or fees
                    (including reasonable attorneys&apos; fees) that may arise
                    as a result of your use of any Third-Party Applications or
                    your violation of any terms and conditions or policies of
                    those applications.
                  </p>
                </div>
                <div id="section5">
                  <TermsSectionHeader>
                    {t('terms.5 Rights you grant us', { ns: 'createCourse' })}
                  </TermsSectionHeader>
                  <p>
                    By using the Edugram platform and submitting your content,
                    you grant Edugram certain rights to use your content in
                    accordance with these Terms & Conditions. These rights are
                    necessary for Edugram to operate and maintain the platform
                    and provide its services effectively. By submitting your
                    content to the platform, you agree to the following: You
                    grant Edugram a non-exclusive, worldwide, royalty-free,
                    sublicensable, and transferable license to use, reproduce,
                    distribute, display, and perform your content in connection
                    with the platform and its affiliated entities, as well as
                    for promoting and redistributing part or all of the platform
                    (and any derivative works thereof) in any media formats and
                    through any media channels. This license includes the right
                    for Edugram to make your content available to other users of
                    the platform, who may access, view, and use your content,
                    subject to any limitations or restrictions you may impose
                    through the platform&apos;s content settings and controls.
                    You grant Edugram the right to use your name, likeness, and
                    any other personal or identifying information you provide to
                    the platform in connection with your content, for the
                    purpose of promoting, distributing, or otherwise exploiting
                    your content on the platform or through any media channels.
                    This includes, but is not limited to, using your name,
                    likeness, or information in promotional materials, social
                    media posts, and other marketing efforts. You grant Edugram
                    the right to use any trademarks, service marks, logos, or
                    other distinctive brand features associated with your
                    content, for the purpose of promoting, distributing, or
                    otherwise exploiting your content on the platform or through
                    any media channels. This includes, but is not limited to,
                    using your trademarks, service marks, logos, or brand
                    features in promotional materials, social media posts, and
                    other marketing efforts. The rights you grant to Edugram
                    under these Terms & Conditions will remain in effect for as
                    long as your content is available on the platform, and will
                    continue even if you cease to use the platform or remove
                    your content. Edugram will not use your content in any
                    manner not authorized by these Terms & Conditions without
                    your express consent. You represent and warrant that you
                    have all necessary rights, licenses, permissions, and
                    consents to grant the rights and licenses described in this
                    section, and that your content does not and will not
                    infringe, misappropriate, or violate any intellectual
                    property rights, publicity rights, privacy rights, or other
                    rights of any third party. You also represent and warrant
                    that your content does not and will not contain any
                    defamatory, libelous, obscene, or otherwise unlawful
                    material, and that it does not and will not violate any
                    applicable laws, rules, or regulations. You agree to
                    indemnify, defend, and hold harmless Edugram and its
                    affiliates, officers, directors, employees, and agents from
                    and against any and all claims, liabilities, damages,
                    losses, costs, expenses, or fees (including reasonable
                    attorneys&apos; fees) that may arise as a result of your
                    breach of these representations and warranties, or your
                    violation of any rights of any third party in connection
                    with your content.
                  </p>
                </div>
              </TermsContent>
              <TermsFooter>
                <Button
                  width="15.2rem"
                  height="2.9rem"
                  backgroundColor={colors.uguYellow}
                  text={t('buttons.accept', { ns: 'createCourse' })}
                  fontFamily={fontFamilies.bold}
                  fontSize="0.9rem"
                  disabled={activeSection !== 'section5'}
                  onClick={handlePublishCourse}
                />
                <Button
                  width="15.2rem"
                  height="2.9rem"
                  backgroundColor="transparent"
                  border="2px solid"
                  borderColor={colors.uguGrey}
                  color={colors.uguGrey}
                  text={t('buttons.decline', { ns: 'createCourse' })}
                  fontFamily={fontFamilies.bold}
                  fontSize="0.9rem"
                  marginLeft="1rem"
                  onClick={() => setShowTermsPopup(false)}
                />
              </TermsFooter>
            </TermsContentWrapper>
          </TermsContainer>
        </TermsWrapper>
      </Portal>
    </StepContainer>
  )
}
export default StepFive
