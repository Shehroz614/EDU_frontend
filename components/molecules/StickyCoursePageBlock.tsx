// @ts-nocheck
import React, { Dispatch, SetStateAction } from 'react'
import styled from '@emotion/styled'
import RoundedButton from '../atoms/Button'
import IconText from '../atoms/IconText'
import { TimeAmountIcon } from '../../public/static/icons/time-amount-icon'
import LecturesQtyIcon from '../../public/static/icons/lectures-qty-icon'
import InfinityIcon from '../../public/static/icons/infinity-icon'
import CertificateIcon from '../../public/static/icons/certificate-icon'
import { Course, ShortCourse } from 'types/course'
import { secondsToHours } from 'helpers/secondsToHms'
import { colors } from '@configs/styles/config'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import VideoPlayIcon from '@public/static/icons/video-play-icon'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import IfOwnedCourse from '@components/atoms/IfOwnedCourse/IfOwnedCourse'
import ContinueLearningButton from '@components/atoms/ContinueLearningButton/ContinueLearningButton'
import ProgressBar from './ProgressBar'

type StickyCoursePageBlockProps = {
  course: Course
  totalTime: number
  totalLectures: number
  isPreview: boolean
  setShowCheckoutModal: Function
  exitPreview: () => void
  setShowPresentationalVideo: Dispatch<SetStateAction<boolean>>
  setShowShareModal: Function
  buyNow: Function
}

const StickyCoursePageBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 20px;
  color: #1a1e3d;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: -10px 10px 20px 10px rgba(0, 0, 0, 0.05);
  position: -webkit-sticky;
  position: sticky;
  top: 1rem;
  z-index: 2;
  padding: 2rem;
  box-sizing: border-box;
`
//TODO: we need to use Next.js Image component
const VideoPlayerWrapper = styled.div`
  width: 100%;
  height: 12rem;
  border-radius: 10px;
  position: relative;
`
const PlayIconContainer = styled.div`
  display: flex;
  border-radius: 100%;
  width: 2.8rem;
  height: 2.8rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.3);
`
const PlayIconWrapper = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  position: relative;
  display: flex;
  :hover {
    cursor: pointer;
  }
`

const CoursePosterImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(107, 181, 201, 0.3);
  object-fit: cover;
`
const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  align-self: flex-end;
`

const Price = styled.div<{ active?: boolean }>`
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  font-size: 1.5rem;
  text-decoration: ${(props) => (props.active ? '' : 'line-through')};
  color: ${(props) => (props.active ? colors.uguPurple : colors.uguGrey)};
  margin-left: 5px;
`
const BuyButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 6.5rem; */
  justify-content: space-between;
`
const WarrantyText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  opacity: 0.5;
  margin-top: 1rem;
`
const WhatIncludedText = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: bold;
  margin-top: 2rem;
  padding-left: 1rem;
`
const IconTextWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  height: 7rem;
  justify-content: space-between;
  padding-left: 1.5rem;
`

const TextButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin-top: 1.5rem;
  padding: 0 1.5rem;
`
const TextButton = styled.div`
  font-size: 0.875rem;
  cursor: pointer;
  color: ${colors.uguBlue};
  margin-right: 1rem;
`
// const Price = styled.div``;

const StickyCoursePageBlock: React.FunctionComponent<
  StickyCoursePageBlockProps
> = (props) => {
  const {
    course,
    totalTime,
    totalLectures,
    isPreview,
    exitPreview,
    setShowCheckoutModal,
    setShowPresentationalVideo,
    setShowShareModal,
    buyNow,
    shortVersion,
  } = props

  console.log(totalTime)

  const { t } = useTranslation(['common', 'stickyCoursePageBlock'])

  const router = useRouter()

  const { addToCart } = useCartAndWishList()

  return (
    <StickyCoursePageBlockWrapper>
      <VideoPlayerWrapper>
        {course.presentationalVideo && (
          <PlayIconContainer>
            <PlayIconWrapper onClick={() => setShowPresentationalVideo(true)}>
              <VideoPlayIcon width="100%" />
            </PlayIconWrapper>
          </PlayIconContainer>
        )}
        <CoursePosterImage src={course.presentationalImage} />
      </VideoPlayerWrapper>
      <PriceWrapper>
        <Price active>
          {shortVersion.price
            ? shortVersion.salePrice
              ? `$${shortVersion.salePrice / 100}`
              : `$${shortVersion.price / 100}`
            : 'Free'}
        </Price>
        {shortVersion.salePrice &&
          shortVersion.salePrice < shortVersion.price && (
            <>
              <Price active>/</Price>
              <Price>${shortVersion.price / 100}</Price>
            </>
          )}
      </PriceWrapper>
      <BuyButtonsWrapper>
        {isPreview && (
          <RoundedButton
            width="100%"
            height="3rem"
            text={t('buttons.Exit Preview')}
            fontSize="0.8rem"
            fontFamily="RobotoBold"
            backgroundColor={colors.uguPurple}
            onClick={exitPreview}
            color="white"
          />
        )}
        <IfOwnedCourse hide id={course._id}>
          <div
            onClick={() => {
              addToCart(shortVersion)
              setShowCheckoutModal(true)
            }}
          >
            <RoundedButton
              marginTop=".5rem"
              width="100%"
              height="3rem"
              text={t('buttons.Add To Cart')}
              fontSize="0.8rem"
              fontFamily="RobotoBold"
              backgroundColor={colors.uguBlue}
            />
          </div>
          <RoundedButton
            marginTop=".5rem"
            width="100%"
            height="3rem"
            fontSize="0.8rem"
            text={t('buttons.Buy Now')}
            fontFamily="RobotoBold"
            backgroundColor={colors.uguYellow}
            onClick={buyNow}
          />
        </IfOwnedCourse>

        <IfOwnedCourse show id={course._id}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <ContinueLearningButton
              ViewMode="coursePage"
              courseId={course._id}
            />
            <ProgressBar value={25} />
          </div>
        </IfOwnedCourse>
      </BuyButtonsWrapper>
      <IfOwnedCourse hide id={course._id}>
        <WarrantyText>30-Day Money Back Guarantee</WarrantyText>
      </IfOwnedCourse>
      <WhatIncludedText>
        {t('Whats Included:', { ns: 'stickyCoursePageBlock' })}
      </WhatIncludedText>
      <IconTextWrapper>
        <IconText
          icon={<TimeAmountIcon />}
          text={
            secondsToHours(totalTime) +
            (secondsToHours(totalTime) > 1
              ? t('Hours', { ns: 'stickyCoursePageBlock' })
              : t('Hour', { ns: 'stickyCoursePageBlock' }))
          }
          marginBetween="1rem"
          opacity="1"
        ></IconText>
        <IconText
          icon={<LecturesQtyIcon />}
          text={
            totalLectures +
            (totalLectures > 1
              ? t('Lectures', { ns: 'stickyCoursePageBlock' })
              : t('Lecture', { ns: 'stickyCoursePageBlock' }))
          }
          marginBetween="1rem"
          opacity="1"
        ></IconText>
        <IconText
          icon={<InfinityIcon />}
          text={'Lifetime access'}
          marginBetween="1rem"
          opacity="1"
        ></IconText>
        <IconText
          icon={<CertificateIcon />}
          text={'Completion Certificate'}
          opacity="1"
          marginBetween="1rem"
        ></IconText>
      </IconTextWrapper>
      <TextButtonWrapper>
        <TextButton>
          {t('Have A Coupon', { ns: 'stickyCoursePageBlock' })}
        </TextButton>
        <TextButton
          onClick={() => {
            setShowShareModal(true)
          }}
        >
          {t('Share', { ns: 'stickyCoursePageBlock' })}
        </TextButton>
      </TextButtonWrapper>
    </StickyCoursePageBlockWrapper>
  )
}

export default StickyCoursePageBlock
