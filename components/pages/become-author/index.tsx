import LoginModal from '@components/organisms/LoginModal'
import { colors, fontFamilies } from '@configs/styles/config'
import styled from '@emotion/styled'
import { updateProfileInfo } from '@helpers/userHelpers'
import { useAuth } from '@hooks/useAuth'
// import styled from '@emotion/styled'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { Modal, useModal } from '@nextui-org/react'
import BecomeAuthorIllustration from '@public/static/vectorIllustrations/becomeAuthorIllustration'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSlider from 'react-slider'
import AnimatedNumber from './AnimatedNumber'
import LearnHowWeEstimatePopUp from './HowWeEstimatePopUp'
import SetEstimatesPopUp from './TotalEstimatePopUp'

type BecomeAuthorProps = {}

interface TrackProps {
  index: number
}

const BecomeAuthorWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: ${colors.uguPurple};
  align-self: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (min-width: 1300px) {
    width: 1250px;
  }
`

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  align-items: center;
  @media (min-width: 768px) {
    width: 50%;
    padding: 10rem 2rem 1rem 2rem;
  }
  @media (min-width: 992px) {
    padding: 10rem 3rem 1rem 3rem;
  }
  @media (min-width: 1300px) {
    padding: 10rem 4rem 1rem 4rem;
  }
`
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 36rem;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  font-size: 2rem;
  line-height: 2.25rem;
  font-family: ${fontFamilies.medium};
  @media (min-width: 768px) {
    font-size: 2.5rem;
    line-height: 2.75rem;
  }
  @media (min-width: 992px) {
    font-size: 3rem;
    line-height: 3.25rem;
  }
`
const PriceLabel = styled.div`
  font-size: 3rem;
  font-family: ${fontFamilies.medium};
  margin-top: 1rem;
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
  @media (min-width: 992px) {
    font-size: 4.5rem;
  }
`
const AvarageEstimationWrapper = styled.span`
  /* display: flex; */
  font-size: 0.875rem;
  width: 18rem;
  font-family: ${fontFamilies.medium};
  text-align: center;
  margin-top: 1rem;
  padding: 0 0.5rem;
  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
  @media (min-width: 992px) {
    font-size: 1rem;
  }
`

const StudentQty = styled.span`
  text-decoration: underline;
  margin-right: 0.25rem;
  :hover {
    cursor: pointer;
  }
`

const SliderWrapper = styled.div`
  display: flex;
  height: 1rem;
  width: 18rem;
  align-items: center;
  margin-top: 1rem;
`

const StyledSlider = styled(ReactSlider)<{}>`
  height: 6px;
  width: 100%;
  margin: auto;
  text-align: center;
  outline: none;
  :focus {
    outline: none;
  }
`

const StyledThumb = styled.div`
  cursor: pointer;
  width: 19px;
  height: 19px;
  position: absolute;
  background-color: #1a1e3d;
  border: 1px solid #1a1e3d;
  border-radius: 100%;
  margin-top: -7px;
  outline: none;
  :focus {
    outline: none;
  }
`

const StyledTrack = styled.div<TrackProps>`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 1 ? colors.uguLightLightGrey : colors.uguPurple};
  border-radius: 3px;
`

const Track = (props: any, state: any) => (
  <StyledTrack index={state.index} {...props} />
)

const Thumb = (props: { [key: string]: any }) => (
  <StyledThumb {...props}></StyledThumb>
)

const LearnHowWeEstimate = styled.div`
  display: flex;
  margin-top: 1rem;
  font-family: ${fontFamilies.light};
  text-decoration: underline;
  font-size: 0.875rem;
  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
  @media (min-width: 992px) {
    font-size: 1rem;
  }
  :hover {
    cursor: pointer;
  }
`
const BecomeAuthorButtonWrapper = styled.div`
  display: flex;
  border: 1px solid ${colors.uguPurple};
  font-family: ${fontFamilies.medium};
  font-size: 1rem;
  margin-top: 2rem;
  border-radius: 10px;
  padding: 0.75rem 4.5rem;
  :hover {
    cursor: pointer;
  }
`

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    padding: 0 2rem 1rem 2rem;
    width: 50%;
  }
  @media (min-width: 992px) {
    padding: 0 3rem 1rem 3rem;
  }
  @media (min-width: 1300px) {
    padding: 0rem 4rem 1rem 4rem;
  }
`
const IllustrationWrapper = styled.div`
  display: none;
  width: 100%;
  @media (min-width: 768px) {
    display: flex;
    margin-top: -2rem;
  }
`
const ExploreEdugramWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ExloreEdugramMessageWrapper = styled.div`
  display: flex;
  font-size: 1rem;
  justify-content: center;
  @media (min-width: 768px) {
    font-size: 1.15rem;
  }
  @media (min-width: 992px) {
    font-size: 1.25rem;
  }
`
const ExploreEdugramButtonWrapper = styled.div`
  display: flex;
  width: 18rem;
  justify-content: center;
  border: 1px solid;
  background-color: ${colors.uguBrightPurple};
  margin-top: 1rem;
  font-family: ${fontFamilies.medium};
  font-size: 1rem;
  border-radius: 10px;
  padding: 0.75rem;
  color: white;
  :hover {
    cursor: pointer;
  }
`

const formatNumber = (num: number): string => {
  const formatted = num.toLocaleString('en-US')
  console.log('Formatted number:', formatted)
  return formatted
}

const AVARAGE_COURSE_PRICE = 49.99
const AVARAGE_FEE = 0.75
const STUDENTS_STEPS = [100, 200, 300, 500, 750, 1000, 1250, 2000, 5000, 7500]

const calculatePriceUsingSlider = (
  value: number,
  price: number = AVARAGE_COURSE_PRICE
): number => {
  let index = Math.floor(value / 10)
  if (index > 9) index = 9 // if value is 100, index should be 9
  return Math.floor(value * price * STUDENTS_STEPS[index] * AVARAGE_FEE)
}

const calculatePriceUsingCalculator = (students, price) => {
  return Math.floor(price * students * AVARAGE_FEE)
}

const calculateStudents = (value: number): number => {
  let index = Math.floor(value / 10)
  if (index > 9) index = 9 // if value is 100, index should be 9
  return Math.floor(value * STUDENTS_STEPS[index])
}

const deriveValueFromStudents = (studentQty: number): number => {
  for (let i = 0; i < STUDENTS_STEPS.length; i++) {
    if (studentQty < STUDENTS_STEPS[i] * 9 + STUDENTS_STEPS[i] * i * 10) {
      console.log('round' + i)
      return Math.min(Math.floor(studentQty / STUDENTS_STEPS[i]), 100)
    }
  }
  console.log('final round')
  return Math.min(
    Math.floor(studentQty / STUDENTS_STEPS[STUDENTS_STEPS.length - 1]),
    100
  )
}

const DEFAULT_SLIDER_VALUE = 15
const DEFAULT_STUDENT_AMOUNT = 3000

const calculateDefaultTotalEarning = (students: number, price: number) => {
  return Math.floor(students * price * AVARAGE_FEE)
}

type EarningEstimateStateType = {
  sliderValue: number
  students: number
  pricePerCourse: number
  totalEarnings: number
}

const BecomeAuthor: React.FC<BecomeAuthorProps> = () => {
  const router = useRouter()
  const priceFromURL = Number(router.query.price)
  const studentsFromURL = Number(router.query.students)
  const { authState, updateCurrentUserFromResponse } = useAuth()
  const { width } = useWindowDimensions()

  const [state, setState] = useState<EarningEstimateStateType>({
    sliderValue: studentsFromURL
      ? deriveValueFromStudents(studentsFromURL)
      : DEFAULT_SLIDER_VALUE,
    students: studentsFromURL || DEFAULT_STUDENT_AMOUNT,
    pricePerCourse: priceFromURL || AVARAGE_COURSE_PRICE,
    totalEarnings: calculateDefaultTotalEarning(
      studentsFromURL || DEFAULT_STUDENT_AMOUNT,
      priceFromURL || AVARAGE_COURSE_PRICE
    ),
  })
  const { t } = useTranslation()
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  const [showModalType, setShowModalType] = useState<
    'howWeEstimate' | 'totalEstimate' | 'hidden'
  >('hidden')
  const { setVisible, bindings } = useModal()

  const addSelectionToUrl = (students: number, price: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: { price, students },
      },
      undefined,
      { shallow: true }
    )
  }

  const applyEstimates = (students: number, price: number) => {
    const newValue = deriveValueFromStudents(students)
    setState({
      ...state,
      sliderValue: newValue,
      totalEarnings: calculatePriceUsingCalculator(students, price),
      students: students,
      pricePerCourse: price,
    })
    addSelectionToUrl(students, price)

    setVisible(false)
  }

  const onSliderChange = (newValue: number) => {
    const newStudents = calculateStudents(newValue)
    setState({
      ...state,
      sliderValue: newValue as number,
      totalEarnings: calculatePriceUsingSlider(newValue, state.pricePerCourse),
      students: newStudents,
    })

    addSelectionToUrl(newStudents, state.pricePerCourse)
  }

  const navigateToLandingPage = () => {
    router.push('/home')
  }

  const becomeAuthorAction = async () => {
    updateProfileInfo({ isAuthor: true })
      .then((updatedUser) => {
        updateCurrentUserFromResponse(updatedUser)
      })
      .catch((err) => console.error('becomeAuthor Action has been failed', err))
  }

  const becomeAuthorButtonClicked = async () => {
    if (authState.isAuthenticated) {
      becomeAuthorAction()
    } else {
      setShowLoginModal(true)
    }
  }

  return (
    <BecomeAuthorWrapper>
      <LeftWrapper>
        <TitleWrapper>
          <span
            style={{
              color: colors.uguBrightPurple,
            }}
          >
            {t('edugramIt', { ns: 'aboutAuthor' })}{' '}
          </span>

          {t('youCouldEarn', { ns: 'aboutAuthor' })}
        </TitleWrapper>
        <PriceLabel>
          <AnimatedNumber value={state.totalEarnings} />
        </PriceLabel>
        <AvarageEstimationWrapper>
          <StudentQty
            onClick={() => {
              setVisible(true)
              setShowModalType('totalEstimate')
            }}
          >
            {formatNumber(state.students)}{' '}
            {t('studentsLowerCase', { ns: 'aboutAuthor' })}
          </StudentQty>
          {t('withAnAvaragePrice', { ns: 'aboutAuthor' })}
          {formatNumber(Number(state.pricePerCourse.toFixed(2)))}{' '}
          {t('usdPerCourse', { ns: 'aboutAuthor' })}
        </AvarageEstimationWrapper>
        <SliderWrapper>
          <StyledSlider
            onChange={(newValue: number | readonly number[]) => {
              //   getPrice(newValue as number)
              console.log('newValue', newValue)
              onSliderChange(newValue as number)
            }}
            value={state.sliderValue}
            defaultValue={60}
            renderTrack={Track}
            renderThumb={Thumb}
            min={1}
          />
        </SliderWrapper>
        <LearnHowWeEstimate
          onClick={() => {
            setVisible(true)
            setShowModalType('howWeEstimate')
          }}
        >
          {t('learnHowWeEstimate', { ns: 'aboutAuthor' })}
        </LearnHowWeEstimate>
        {!authState.isLoading &&
          (!authState.isAuthenticated ||
            (authState.isAuthenticated && !authState.user?.isAuthor)) && (
            <BecomeAuthorButtonWrapper
              onClick={() => {
                becomeAuthorButtonClicked()
              }}
            >
              {t('becomeAuthor', { ns: 'aboutAuthor' })}
            </BecomeAuthorButtonWrapper>
          )}
      </LeftWrapper>
      <RightWrapper>
        <IllustrationWrapper>
          <BecomeAuthorIllustration width={'100%'} />
        </IllustrationWrapper>
        <ExploreEdugramWrapper>
          <ExloreEdugramMessageWrapper>
            {t('interestedInWhatWeOffer', { ns: 'aboutAuthor' })}
          </ExloreEdugramMessageWrapper>
          <ExploreEdugramButtonWrapper onClick={() => navigateToLandingPage()}>
            {t('exploreEdugramBenefits', { ns: 'aboutAuthor' })}
          </ExploreEdugramButtonWrapper>
        </ExploreEdugramWrapper>
      </RightWrapper>
      <Modal
        aria-labelledby="modal-title"
        width={'430px'}
        style={{
          marginBottom: width && width < 768 ? '-2rem' : '',
          maxHeight: width && width < 768 ? '100vh' : '',
        }}
        {...bindings}
      >
        <Modal.Body>
          {showModalType === 'totalEstimate' && (
            <SetEstimatesPopUp
              price={state.pricePerCourse}
              students={state.students}
              onApply={applyEstimates}
              onClose={() => {
                setVisible(false)
                setTimeout(() => {
                  setShowModalType('hidden')
                }, 500)
              }}
            />
          )}
          {showModalType === 'howWeEstimate' && (
            <LearnHowWeEstimatePopUp
              onClose={() => {
                setVisible(false)
                setTimeout(() => {
                  setShowModalType('hidden')
                }, 500)
              }}
            />
          )}
        </Modal.Body>
      </Modal>
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false)
          }}
        />
      )}
    </BecomeAuthorWrapper>
  )
}

export default BecomeAuthor
