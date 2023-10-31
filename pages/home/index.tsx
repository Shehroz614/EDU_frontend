import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  GetStartedButton,
  Gradient1,
  LandingWrapper,
  SloganBlock,
  UpperBlock,
  UpperBlockWrapper,
  UpperSlogan,
  IconWrapper,
  Gradient2,
  HeaderWrapper,
  MenuButtonsWrapper,
  MenuButton,
  LeftHeader,
  JoinUsButton,
  FeaturesButtons,
  FeatureButton,
  FeatureButtonInner,
  OurPartnersWrapper,
  OurPartnersHeader,
  PartnersList,
  PartnerImageWrapper,
  EdugramForWrapper,
  EdugramForHeader,
  EdugramForText,
  EdugramForButtonsWrapper,
  EdugramForButtonCreator,
  EdugramForButton,
  BenefitsForCreatorsWrapper,
  BenefitsForCreatorsHeader,
  BenefitsForCreatorsSubHeader,
  HamburgerWrapper,
  JoinUsButtonBenefits,
  OurGoalWrapper,
  OurGoalGlobalWrapper,
  BenefitsBlocks,
  HowItWorksWrapper,
  HowItWorksLineOne,
  CurveOne,
  HowItWorksHeader,
  HowItWorksText,
  HowItWorksTextWrapper,
  StepNumber,
  RightImageWrapper,
  LeftImageWrapper,
  CurveTwo,
  TextTwoWrapper,
  CurveThree,
  BenefitBlocksWrapper,
  OurGoal,
  JoinEdugramWrapper,
  JoinEdugramInnerWrappery,
  FooterWrapper,
  FooterHeading,
  FooterInfoBlock,
  FooterText,
  FooterInfoWrapper,
  StillHaveQuestionsWrapper,
  StillHaveQuestionsGlobalWrapper,
  ContactiWithSpecialist,
  MenuWrapper,
  GoalCardsWrapper,
} from '@styled_components/home/styled.components'
import { LandingHeaderIllustration } from '@public/static/vectorIllustrations/landing-header-illustration'
import { LiveCourseIcon } from '@public/static/icons/landingPageIcons/live-course-icon'
import { NewLogo } from '@public/static/icons/new-logo'
import { AnimatePresence, motion } from 'framer-motion'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { useEffect, useState } from 'react'
import {
  HamburgerMenuIcon,
  CrossMenu,
} from '@public/static/icons/hamburger-menu-icon'
import { HowItWorksOne } from '@public/static/icons/how-it-works-one'
import { HowItWorksTwo } from '@public/static/icons/how-it-works-two'
import { HowItWorksThree } from '@public/static/icons/how-it-works-three'
import { HowItWorksFour } from '@public/static/icons/how-it-works-four'
import { JoinEdugram1, JoinEdugram2 } from '@public/static/icons/join-edugram'
import { StillHaveQuestions } from '@public/static/icons/still-have-questions-icon'
import {
  FacebookNewIcon,
  GoogleNewIcon,
  InstaeNewIcon,
  TwitterNewIcon,
  YoutubeNewIcon,
} from '@public/static/icons/social-icons'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { PercentIcon } from '@public/static/icons/landingPageIcons/percent-icon'
import { OnlineCourseIcon } from '@public/static/icons/landingPageIcons/online-course-icon'
import { SubscriptionsIcon } from '@public/static/icons/landingPageIcons/subscriptions-icon'
import { PodcastsIcon } from '@public/static/icons/landingPageIcons/podcasts-icon'
import { edugramGoals } from '@constants/authorBenefits'
import React from 'react'
import AuthorBenefits from '@components/pages/benefits/AuthorBenefits'
import GoalCardComponent from '@components/pages/benefits/GoalCard'
import MainAuthorBenefits from '@components/pages/benefits/MainAuthorBenefits'
import { getFragmentedText } from '@utils/getFragmentedText'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'footer',
        'landingPage',
      ])),
    },
  }
}

const menuItems = [
  {
    id: 1,
    link: '#aboutedu',
    translationKey: 'whatIsEdugram',
  },
  {
    id: 2,
    link: '#edubenefits',
    translationKey: 'benefits',
  },
  {
    id: 3,
    link: '#edugoal',
    translationKey: 'ourGoal',
  },
  {
    id: 4,
    link: '#howitworks',
    translationKey: 'howItWorks',
  },
]

const Landing = () => {
  const { t } = useTranslation(['footer', 'landingPage'])
  const dimentions = useWindowDimensions()
  const [selectedGoal, setSelectedGoal] = useState(1) // By default, the first goal is selected.
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [selectedButton, setSelectedButton] = useState(0)
  const [goalMargin, setGoalMargin] = useState(0)

  const handleGoadlCardClick = (clickedGoalNumber) => {
    if (clickedGoalNumber === selectedGoal) {
      setDirection('backward')
      setSelectedGoal((prevState) => (prevState === 1 ? 3 : prevState - 1))
    } else if (clickedGoalNumber === (selectedGoal % 3) + 1) {
      setDirection('forward')
      setSelectedGoal((prevState) => (prevState % 3) + 1)
    } else {
      setDirection('backward')
      setSelectedGoal((prevState) => (prevState === 1 ? 3 : prevState - 1))
    }
  }
  useEffect(() => {
    if ((dimentions.width || 0) > 900) setGoalMargin(400)
    else if ((dimentions.width || 0) > 400)
      setGoalMargin((dimentions.width || 0) / 3)
    else setGoalMargin((dimentions.width || 0) / 4)
  }, [dimentions])

  const [showMenu, setShowMenu] = useState(false)

  return (
    <LandingWrapper>
      <UpperBlock>
        <UpperBlockWrapper>
          <HeaderWrapper>
            <LeftHeader>
              <Link href={'/'}>
                <NewLogo
                  width={
                    (dimentions.width || 0) < 800
                      ? (dimentions.width || 0) < 500
                        ? '220'
                        : '45vw'
                      : '353'
                  }
                ></NewLogo>
              </Link>
              {/* ANCHOR - MENU ITEMS DESKTOP */}
              <MenuButtonsWrapper>
                {menuItems.map((item) => (
                  <div key={item.id}>
                    <Link href={item.link}>
                      <MenuButton
                        onMouseOver={() => setSelectedButton(item.id)}
                        onMouseLeave={() => setSelectedButton(0)}
                      >
                        {t(item.translationKey, { ns: 'landingPage' })}
                      </MenuButton>
                      <motion.div
                        style={{
                          background: '#7181FF',
                          height: 5,
                          width: 0,
                          margin: 'auto',
                          borderRadius: 5,
                        }}
                        initial={{ width: 0 }}
                        animate={{
                          width: selectedButton === item.id ? '40%' : 0,
                        }}
                        transition={{ ease: 'linear', duration: 0.12 }}
                      />
                    </Link>
                  </div>
                ))}
              </MenuButtonsWrapper>
            </LeftHeader>

            <Link href="/author">
              <JoinUsButton>{t('joinUs', { ns: 'landingPage' })}</JoinUsButton>
            </Link>
            <HamburgerWrapper
              onClick={() => {
                setShowMenu(!showMenu)
              }}
            >
              <motion.div
                style={{ height: '100%' }}
                initial={{ transform: 'rotate(0deg)' }}
                animate={{
                  transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                transition={{ duration: 0.42 }}
              >
                <AnimatePresence initial={false}>
                  {showMenu ? (
                    <CrossMenu></CrossMenu>
                  ) : (
                    <HamburgerMenuIcon width="100%" />
                  )}
                </AnimatePresence>
              </motion.div>
            </HamburgerWrapper>
            {/* ANCHOR - MENU ITEMS MOBILE */}
            <MenuWrapper style={{ height: showMenu ? 310 : 0 }}>
              {menuItems.map((item, index) => (
                <div key={item.id} style={{ marginTop: index === 0 ? 30 : 0 }}>
                  <Link href={item.link}>
                    <MenuButton
                      onMouseOver={() => setSelectedButton(item.id)}
                      onMouseLeave={() => setSelectedButton(0)}
                    >
                      {t(item.translationKey, { ns: 'landingPage' })}
                    </MenuButton>
                    <motion.div
                      style={{
                        background: '#7181FF',
                        height: 5,
                        width: 0,
                        margin: 'auto',
                        borderRadius: 5,
                      }}
                      initial={{ width: 0 }}
                      animate={{
                        width: selectedButton === item.id ? '40%' : 0,
                      }}
                      transition={{ ease: 'linear', duration: 0.12 }}
                    ></motion.div>
                  </Link>
                </div>
              ))}
              <Link href="/author">
                <JoinUsButtonBenefits style={{ marginTop: 10 }}>
                  {t('joinUs', { ns: 'landingPage' })}
                </JoinUsButtonBenefits>
              </Link>
            </MenuWrapper>
          </HeaderWrapper>
          <SloganBlock>
            <UpperSlogan>
              <div
                style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
              >
                <Gradient1 />
              </div>
              {getFragmentedText(t('mainSlogan', { ns: 'landingPage' }))}
              <Link href="/author">
                <GetStartedButton>
                  {' '}
                  {t('getStartedNow', { ns: 'landingPage' })}
                </GetStartedButton>
              </Link>
            </UpperSlogan>
            <IconWrapper>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  zIndex: -1,
                }}
              >
                <Gradient2 />
              </div>
              <LandingHeaderIllustration width="100%"></LandingHeaderIllustration>
            </IconWrapper>
          </SloganBlock>
        </UpperBlockWrapper>
      </UpperBlock>
      <FeaturesButtons>
        <FeatureButton>
          <FeatureButtonInner>
            <PercentIcon
              width={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 700
                    ? '30px'
                    : '4vw'
                  : '57px'
              }
            />
            {t('shortBenefits.noCommission', { ns: 'landingPage' })}
          </FeatureButtonInner>
        </FeatureButton>
        <FeatureButton>
          <FeatureButtonInner>
            <OnlineCourseIcon
              width={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 700
                    ? '30px'
                    : '4vw'
                  : '57px'
              }
            />
            {t('shortBenefits.onlineCourses', { ns: 'landingPage' })}
          </FeatureButtonInner>
        </FeatureButton>
        <FeatureButton>
          <FeatureButtonInner>
            <LiveCourseIcon
              width={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 700
                    ? '30px'
                    : '4vw'
                  : '57px'
              }
            />
            {t('shortBenefits.liveCourses', { ns: 'landingPage' })}
          </FeatureButtonInner>
        </FeatureButton>
        <FeatureButton>
          <FeatureButtonInner>
            <SubscriptionsIcon
              width={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 700
                    ? '30px'
                    : '4vw'
                  : '57px'
              }
            />
            {t('shortBenefits.subscriptions', { ns: 'landingPage' })}
          </FeatureButtonInner>
        </FeatureButton>
        <FeatureButton>
          <FeatureButtonInner>
            <PodcastsIcon
              width={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 700
                    ? '30px'
                    : '4vw'
                  : '57px'
              }
            />
            {t('shortBenefits.podcasts', { ns: 'landingPage' })}
          </FeatureButtonInner>
        </FeatureButton>
      </FeaturesButtons>
      <OurPartnersWrapper>
        <OurPartnersHeader id="aboutedu">
          {t('ourPartners', { ns: 'landingPage' })}
        </OurPartnersHeader>
        <PartnersList>
          <PartnerImageWrapper>
            <img
              alt={'Oracle logo'}
              src={'/static/images/Oracle_logo.svg.png'}
              height={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 850
                    ? 14
                    : (dimentions.width || 0) * 0.0167
                  : 26
              }
            />
          </PartnerImageWrapper>
          <PartnerImageWrapper>
            <img
              alt={'AWS logo'}
              src={'/static/images/512px-Amazon_Web_Services_Logo.svg.png'}
              height={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 850
                    ? 29
                    : (dimentions.width || 0) * 0.034
                  : 53
              }
            />
          </PartnerImageWrapper>
          <PartnerImageWrapper>
            <img
              alt={'Oracle logo'}
              src={'/static/images/498px-Slack_Technologies_Logo.svg.png'}
              height={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 850
                    ? 22
                    : (dimentions.width || 0) * 0.0257
                  : 40
              }
            />
          </PartnerImageWrapper>
          <PartnerImageWrapper>
            <img
              alt={'Oracle logo'}
              src={'/static/images/Android_logo_(2015-2019).svg.png'}
              height={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 850
                    ? 21
                    : (dimentions.width || 0) * 0.0237
                  : 37
              }
            />
          </PartnerImageWrapper>
          <PartnerImageWrapper>
            <img
              alt={'Oracle logo'}
              src={'/static/images/Adobe_Corporate_logo.svg.png'}
              height={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 850
                    ? 23
                    : (dimentions.width || 0) * 0.0289
                  : 45
              }
            />
          </PartnerImageWrapper>
          <PartnerImageWrapper>
            <img
              alt={'Oracle logo'}
              src={'/static/images/zoover.svg'}
              height={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 850
                    ? 20
                    : (dimentions.width || 0) * 0.0224
                  : 35
              }
            />
          </PartnerImageWrapper>
        </PartnersList>
      </OurPartnersWrapper>
      <EdugramForWrapper>
        <EdugramForHeader>
          {t('edugramFor', { ns: 'landingPage' })}
        </EdugramForHeader>
        <EdugramForText>
          {getFragmentedText(t('edugramForCreators', { ns: 'landingPage' }))}
        </EdugramForText>
        <EdugramForButtonsWrapper>
          <EdugramForButtonCreator>
            {t('creators', { ns: 'landingPage' })}
          </EdugramForButtonCreator>
          <EdugramForButton>
            {t('parents', { ns: 'landingPage' })}
          </EdugramForButton>
          <EdugramForButton>
            {t('students', { ns: 'landingPage' })}
          </EdugramForButton>
        </EdugramForButtonsWrapper>
      </EdugramForWrapper>
      <UpperBlock>
        {/* ANCHOR - BENEFITS FOR CREATORS */}
        <BenefitsForCreatorsWrapper id="edubenefits">
          {(dimentions.width || 0) < 1100 || (
            <>
              <BenefitsForCreatorsHeader>
                {t('benefitsForCreators', { ns: 'landingPage' })}
              </BenefitsForCreatorsHeader>
              <BenefitsForCreatorsSubHeader>
                {t('benefitsForCreatorsSubtitle', { ns: 'landingPage' })}
              </BenefitsForCreatorsSubHeader>
            </>
          )}
          <MainAuthorBenefits />
        </BenefitsForCreatorsWrapper>
      </UpperBlock>
      {/* ANCHOR - TRULY ALL IN ONE PLATFORM */}
      <BenefitsBlocks>
        <BenefitsForCreatorsHeader
          style={{ textAlign: 'center', padding: '0 15px' }}
        >
          {t('trulyAllInOnePlarform', { ns: 'landingPage' })}
        </BenefitsForCreatorsHeader>
        <BenefitsForCreatorsSubHeader
          style={{ textAlign: 'center', padding: '0 15px' }}
        >
          {t('trulyAllInOnePlarformSubtitle', { ns: 'landingPage' })}
        </BenefitsForCreatorsSubHeader>
        <BenefitBlocksWrapper>
          <AuthorBenefits />
        </BenefitBlocksWrapper>
      </BenefitsBlocks>
      {/* ANCHOR - OUR GOALS */}
      <OurGoalGlobalWrapper id="edugoal">
        <OurGoalWrapper>
          <OurGoal>{t('ourGoal', { ns: 'landingPage' })}</OurGoal>
          <GoalCardsWrapper>
            {edugramGoals.map((goal, index) => (
              <GoalCardComponent
                key={index}
                goalNumber={index + 1}
                selectedGoal={selectedGoal}
                direction={direction}
                goalMargin={goalMargin}
                title={goal.titleKey}
                index={index}
                description={goal.descriptionKey}
                icon={goal.icon}
                onClick={() => handleGoadlCardClick(index + 1)}
              />
            ))}
          </GoalCardsWrapper>
        </OurGoalWrapper>
      </OurGoalGlobalWrapper>
      {/* ANCHOR - HOW IT WORKS */}
      <HowItWorksWrapper id="howitworks">
        <BenefitsForCreatorsHeader
          style={{
            margin: 'auto',
            width: 'max-content',
            marginBottom: (dimentions.width || 0) < 731 ? -20 : 60,
            marginTop: -10,
          }}
        >
          {t('howItWorks', { ns: 'landingPage' })}
        </BenefitsForCreatorsHeader>
        <HowItWorksLineOne
          style={{
            flexDirection:
              (dimentions.width || 0) < 731 ? 'column-reverse' : 'row',
          }}
        >
          <CurveOne>
            <StepNumber>#1</StepNumber>
          </CurveOne>
          <HowItWorksTextWrapper>
            {(dimentions.width || 0) < 731 && (
              <StepNumber
                style={{
                  marginLeft: -35,
                  fontSize: 20,
                  position: 'absolute',
                  width: 'max-content',
                  height: 35,
                }}
              >
                #1
              </StepNumber>
            )}
            <HowItWorksHeader>Create Your Course</HowItWorksHeader>
            <HowItWorksText>
              Design an engaging and informative course that showcases your
              expertise and knowledge. Craft your content using our
              user-friendly course builder, and tailor the structure to best
              suit your teaching style.
            </HowItWorksText>
          </HowItWorksTextWrapper>
          <RightImageWrapper style={{ borderLeft: 0 }}>
            <Gradient2
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 'auto',
              }}
            ></Gradient2>
            <HowItWorksOne
              width={(dimentions.width || 0) < 1561 ? '23vw' : '359'}
              right={(dimentions.width || 0) < 1561 ? '10vw' : '100'}
              position={(dimentions.width || 0) < 731 ? 'static' : 'absolute'}
            ></HowItWorksOne>
          </RightImageWrapper>
        </HowItWorksLineOne>
        <HowItWorksLineOne>
          <LeftImageWrapper>
            <Gradient2
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 'auto',
                opacity: 0.19,
              }}
            ></Gradient2>
            <HowItWorksTwo
              width={(dimentions.width || 0) < 1561 ? '23vw' : '359'}
            ></HowItWorksTwo>
          </LeftImageWrapper>
          <CurveTwo>
            <StepNumber
              style={{
                margin: 0,
                marginLeft: (dimentions.width || 0) < 1561 ? '1.5vw' : 25,
              }}
            >
              #2
            </StepNumber>
          </CurveTwo>
          <TextTwoWrapper>
            {(dimentions.width || 0) < 731 && (
              <StepNumber
                style={{
                  marginLeft: -35,
                  fontSize: 20,
                  position: 'absolute',
                  width: 'max-content',
                  height: 35,
                }}
              >
                #2
              </StepNumber>
            )}
            <HowItWorksHeader>Add Details with Ease</HowItWorksHeader>
            <HowItWorksText>
              Utilize our intuitive interface to effortlessly add rich details,
              multimedia, and interactive elements to your course, enhancing the
              learning experience for your students.
            </HowItWorksText>
          </TextTwoWrapper>
        </HowItWorksLineOne>
        <HowItWorksLineOne
          style={{
            flexDirection:
              (dimentions.width || 0) < 731 ? 'column-reverse' : 'row',
          }}
        >
          <CurveThree>
            <StepNumber
              style={{
                margin: 0,
                marginLeft: (dimentions.width || 0) < 1561 ? '-2vw' : -30,
              }}
            >
              #3
            </StepNumber>
          </CurveThree>
          <TextTwoWrapper
            style={{
              paddingBottom: (dimentions.width || 0) < 1561 ? '6.5vw' : 100,
              paddingLeft: 40,
              borderBottom:
                (dimentions.width || 0) > 730 ? '2px dashed #7282FD' : 0,
            }}
          >
            {(dimentions.width || 0) < 731 && (
              <StepNumber
                style={{
                  marginLeft: -35,
                  fontSize: 20,
                  position: 'absolute',
                  width: 'max-content',
                  height: 35,
                }}
              >
                #3
              </StepNumber>
            )}
            <HowItWorksHeader>Publish with Confidence</HowItWorksHeader>
            <HowItWorksText>
              Once you&apos;re satisfied with your course, publish it with a
              single click. Our platform ensures a seamless experience for both
              you and your students, so you can focus on teaching.
            </HowItWorksText>
          </TextTwoWrapper>
          <RightImageWrapper style={{ paddingTop: 40 }}>
            <Gradient2
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 'auto',
                opacity: 0.2,
              }}
            ></Gradient2>
            <HowItWorksThree
              width={(dimentions.width || 0) < 1561 ? '21vw' : '339'}
              position={(dimentions.width || 0) < 731 ? 'static' : 'absolute'}
            ></HowItWorksThree>
          </RightImageWrapper>
        </HowItWorksLineOne>
        <HowItWorksLineOne>
          <LeftImageWrapper style={{ borderBottom: 0 }}>
            <Gradient2
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 'auto',
                opacity: 0.23,
              }}
            ></Gradient2>
            <HowItWorksFour
              width={(dimentions.width || 0) < 1561 ? '23vw' : '355'}
            ></HowItWorksFour>
          </LeftImageWrapper>
          <CurveTwo
            style={{
              maxHeight: 50,
              borderBottomRightRadius: 0,
              borderBottom: 0,
              marginLeft: 20,
            }}
          >
            <StepNumber
              style={{
                margin: 0,
                marginLeft: (dimentions.width || 0) < 1561 ? '1.5vw' : 25,
              }}
            >
              #4
            </StepNumber>
          </CurveTwo>
          <TextTwoWrapper style={{ borderLeft: 0 }}>
            {(dimentions.width || 0) < 731 && (
              <StepNumber
                style={{
                  marginLeft: -35,
                  fontSize: 20,
                  position: 'absolute',
                  width: 'max-content',
                  height: 35,
                }}
              >
                #4
              </StepNumber>
            )}
            <HowItWorksHeader>Start Selling and Inspire</HowItWorksHeader>
            <HowItWorksText>
              Reach a global audience and begin selling your course through our
              marketplace. Our advanced AI technology handles marketing,
              selling, and everything else automatically, allowing you to focus
              on sharing your knowledge, inspiring learners, and contributing to
              a brighter future for all.
            </HowItWorksText>
          </TextTwoWrapper>
        </HowItWorksLineOne>
      </HowItWorksWrapper>
      <JoinEdugramWrapper>
        <JoinEdugramInnerWrappery>
          {(dimentions.width || 0) < 800 || (
            <div
              style={{
                flex: 1,
                paddingLeft: 15,
                alignSelf: 'flex-end',
                marginBottom: -10,
              }}
            >
              <JoinEdugram1></JoinEdugram1>
            </div>
          )}

          <BenefitsForCreatorsWrapper
            style={{
              background: 0,
              padding: '30px 10px',
              textAlign: 'center',
              flex: 2,
              margin: 0,
            }}
          >
            <BenefitsForCreatorsHeader>
              {t('joinEdugram', { ns: 'landingPage' })}
            </BenefitsForCreatorsHeader>
            <BenefitsForCreatorsSubHeader>
              {t('joinEdugramSlogan', { ns: 'landingPage' })}
            </BenefitsForCreatorsSubHeader>

            <Link href="/author">
              <JoinUsButtonBenefits>
                {t('joinNow', { ns: 'landingPage' })}
              </JoinUsButtonBenefits>
            </Link>
          </BenefitsForCreatorsWrapper>
          {(dimentions.width || 0) < 800 || (
            <div
              style={{
                flex: 1,
                paddingRight: 15,
                marginBottom: -10,
                textAlign: 'right',
                alignSelf: 'center',
              }}
            >
              <JoinEdugram2></JoinEdugram2>
            </div>
          )}
        </JoinEdugramInnerWrappery>
      </JoinEdugramWrapper>
      <StillHaveQuestionsGlobalWrapper>
        <StillHaveQuestionsWrapper
          style={{
            height: 'auto',
            marginTop: 70,
            display: 'flex',
            flexDirection: (dimentions.width || 0) < 810 ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8%',
            width: '100% !imporant',
          }}
        >
          <div style={{ flex: 1 }}>
            <StillHaveQuestions></StillHaveQuestions>
          </div>
          <div
            style={{
              flex: 1.2,
              display: 'flex',
              flexDirection: 'column',
              marginTop: 20,
              alignItems:
                (dimentions.width || 0) < 810 ? 'center' : 'flex-start',
            }}
          >
            <BenefitsForCreatorsHeader
              style={{
                color: 'white',
                textAlign: (dimentions.width || 0) < 810 ? 'center' : 'left',
              }}
            >
              {t('stillHaveQuestions', { ns: 'landingPage' })}
            </BenefitsForCreatorsHeader>
            <BenefitsForCreatorsSubHeader
              style={{
                color: 'white',
                textAlign: (dimentions.width || 0) < 810 ? 'center' : 'left',
              }}
            >
              {t('connectWithEduSpecialistAndGetAnswers', {
                ns: 'landingPage',
              })}
            </BenefitsForCreatorsSubHeader>
            <ContactiWithSpecialist style={{ marginBottom: 20 }}>
              {t('connectWithEduSpecialist', {
                ns: 'landingPage',
              })}
            </ContactiWithSpecialist>
          </div>
        </StillHaveQuestionsWrapper>
      </StillHaveQuestionsGlobalWrapper>
      <FooterWrapper>
        <div>
          <div style={{ marginLeft: 5 }}>
            <NewLogo
              width={
                (dimentions.width || 0) < 1561
                  ? (dimentions.width || 0) < 1025
                    ? '290'
                    : '22vw'
                  : '353'
              }
            ></NewLogo>
          </div>
          <FooterHeading style={{ marginTop: 30 }}>
            Social network
          </FooterHeading>
          <div style={{ display: 'flex', marginTop: 10, gap: 12 }}>
            <GoogleNewIcon></GoogleNewIcon>
            <FacebookNewIcon></FacebookNewIcon>
            <InstaeNewIcon></InstaeNewIcon>
            <YoutubeNewIcon></YoutubeNewIcon>
            <TwitterNewIcon></TwitterNewIcon>
          </div>
        </div>
        <FooterInfoWrapper>
          <FooterInfoBlock>
            <FooterHeading>About Us</FooterHeading>
            <FooterText>Become a teacher</FooterText>
            <FooterText>Our goal</FooterText>
            <FooterText>Support</FooterText>
          </FooterInfoBlock>
          <FooterInfoBlock>
            <FooterHeading>Possibilities</FooterHeading>
            <FooterText>Premium</FooterText>
            <FooterText>Jobs</FooterText>
            <FooterText>Parents</FooterText>
            <FooterText>Business</FooterText>
          </FooterInfoBlock>
          <FooterInfoBlock>
            <FooterHeading>Cooperation</FooterHeading>
            <FooterText>Become a teacher</FooterText>
            <FooterText>Partners</FooterText>
            <FooterText>Certificates</FooterText>
            <FooterText>Awards</FooterText>
          </FooterInfoBlock>
          <FooterInfoBlock>
            <FooterHeading>FAQ</FooterHeading>
            <FooterText>How it works</FooterText>
            <FooterText>Business</FooterText>
            <FooterText>Awards</FooterText>
          </FooterInfoBlock>
        </FooterInfoWrapper>
      </FooterWrapper>
      <FooterWrapper style={{ padding: 0, margin: 'auto', border: 0 }}>
        <FooterText style={{ marginLeft: 30, paddingBottom: 10 }}>
          Copyright © 2023
        </FooterText>
      </FooterWrapper>
    </LandingWrapper>
  )
}

export default Landing
