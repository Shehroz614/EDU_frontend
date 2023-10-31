// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'
import CheckmarkSectionContainer from 'components/atoms/CheckmarkSection'
import BulletPoinntSectionContainer from 'components/atoms/BulletPointSection'
import CourseMaterials from 'components/molecules/CourseMaterials'
import AboutAuthor from 'components/molecules/AboutAuthor'
import StickyCoursePageBlock from 'components/molecules/StickyCoursePageBlock'
import Button from 'components/atoms/Button'
import SectionsRoute from 'components/atoms/SectionsRoute/SectionsRoute'
import { CourseLanguageIcon } from '@public/static/icons/course-language'
import GiftIcon from 'public/static/icons/gift-icon'
import WishlistIcon from 'public/static/icons/headerIcons/wishlist-icon'
import IconText from 'components/atoms/IconText'
import ButtonWithIcon from 'components/atoms/ButtonWithIcon'
import CartIcon from '@public/static/icons/headerIcons/cart-icon'
import ShareIcon from '@public/static/icons/share-icon'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { fontFamilies } from '@configs/styles/config'
import VideoPlayIcon from '@public/static/icons/video-play-icon'
import EmailIcon from '@public/static/icons/email-icon'
import LinkIcon from '@public/static/icons/link-icon'
import TwitterIcon from '@public/static/icons/twitter-icon'
import FaceBookIcon from '@public/static/icons/facebook-icon'
import LinkedInIcon from '@public/static/icons/linkedin-icon'
import TelegramIcon from '@public/static/icons/telegram-icon'
import StarIcon from '@public/static/icons/empty-star'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import { Course, ShortCourse } from 'types/course'
import { useTranslation } from 'react-i18next'
import { Popover, Text } from '@nextui-org/react'
import Link from 'next/link'
import Modal from '@components/molecules/Modal'
import ReportProblem from '@components/organisms/ReportProblem'
import {
  Body,
  FixedPart,
  //CourseInfoContainer,
  CourseTitle,
  AuthorName,
  NumbersContainer,
  ShortDescriptionFlex,
  ButtonsFlex,
  ReportBlock,
  FloatingPart,
  TopContainer,
  DescriptionHeader,
  ShowMore,
  ShowMoreLine,
  ShowMoreButton,
  TopBg,
  VideoPlayerWrapper,
  PlayIconContainer,
  PlayIconWrapper,
  CoursePosterImage,
  FixedBuyBlock,
  ShareHeader,
  ShareModalWrapper,
  InfoWrapper,
  ShareBlock,
  ButtonWrapper,
  InfoText,
  PriceWrapper,
  Price,
} from './styled.components'
import VideoPlayerModal from '@components/organisms/VideoPlayerModal'
import { StudentQtyIconNew } from '@public/static/icons/students-qty-icon'
import { TimeAmountIconNew } from '@public/static/icons/time-amount-icon'
import CartModal from '../CartModal'
import GiftAnimation from '@public/static/images/47407-gift-box'
import { Input } from '@nextui-org/react'
import { Textarea } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'
import RoundedButton from '@components/atoms/Button'
import { colors } from '@configs/styles/config'
import { useAuth } from '@hooks/useAuth'
import { useRouter } from 'next/router'
import IfOwnedCourse from '@components/atoms/IfOwnedCourse/IfOwnedCourse'
import ContinueLearningButton from '@components/atoms/ContinueLearningButton/ContinueLearningButton'
import GiftCourseModal from '@components/molecules/GiftCourseModal'
import CourseReviews from '@components/molecules/CourseReviews'
import Rating from '@components/atoms/Rating'
import styled from '@emotion/styled'

const SectionsRouteContainer = styled.div`
  display: flex;
  overflow: auto;
`

const RouteButton = styled.button`
  color: #999;
  padding: 0;
  font-size: 1rem;
  background: none;
  transition: 0.2s;
  white-space: nowrap;
  :hover {
    color: black;
    cursor: pointer;
  }
`

const Separator = styled.div`
  margin: 0.5rem;
  font-size: 1rem;
  color: #999;
`
import { getCoursePricingPolicies } from '@services/api/course'
import dayjs from 'dayjs'

type CoursePageBlockProps = {
  course: Course | null
  isPreview?: boolean
  exitPreview?: () => void
  course_id?: string
}

const CoursePageBlock: React.FC<CoursePageBlockProps> = (props) => {
  const { authState } = useAuth()
  const router = useRouter()
  const { width } = useWindowDimensions()
  const { t } = useTranslation(['common', 'review', 'stickyCoursePageBlock'])
  const topContainerRef = useRef<HTMLDivElement>(null)

  const { isPreview = false, course, exitPreview = () => {}, course_id } = props
  const [totalCourseTime, setTotalCourseTime] = useState<number>(0)
  const [totalCourseLectures, setTotalCourseLectures] = useState<number>(0)
  const [openDesc, setOpenDesc] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState(1100)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [isPopover, setIsPopover] = useState(false)
  const [giftCourseModal, setGiftCourseModal] = useState(false)
  const [shortVersion, setShortVersion] = useState<ShortCourse>({
    _id: course_id || '',
    title: course?.title,
    status: course?.status,
    author: course?.author,
    ratingQty: course?.ratingQty,
    rating: course?.rating,
    shortCourseDescription: course?.shortCourseDescription,
    price: course?.price,
    salePrice: course?.salePrice,
    whatYouWillLearn: course?.whatYouWillLearn,
    presentationalImage: course?.presentationalImage,
    keywords: course?.keywords,
    totalTime: course?.totalTime,
    totalLectures: course?.totalLectures,
  })

  const [topBlockHeight, setTopBlockHeight] = useState(0)
  const [showShareModal, setShowShareModal] = useState(false)

  const [showPresentationalVideo, setShowPresentationalVideo] =
    useState<boolean>(false)

  //calculate total course time & lectures
  useEffect(() => {
    let totalTime = 0
    let totalLectures = 0
    course?.course_materials.sections.forEach((section) => {
      section.lectures.forEach((lecture) => {
        totalTime = totalTime + lecture?.content?.duration
      })
      totalLectures = totalLectures + section.lectures.length
    })

    setTotalCourseTime(totalTime)
    setTotalCourseLectures(totalLectures)
    if (isPreview) {
      getCoursePricingPolicies(course_id, course?.version).then((res) => {
        if (res.length > 0) {
          const timestamp = dayjs().format()
          const activePolicy = res.filter(
            (p) =>
              p.isActive &&
              p.type === 'override' &&
              p.startDate <= timestamp &&
              p.expiryDate >= timestamp
          )?.[0]
          if (activePolicy) {
            console.log(activePolicy)
            if (activePolicy.showOriginalPrice) {
              setShortVersion((state) => ({
                ...state,
                price: activePolicy.initialValue * 100 || state.price,
                salePrice: activePolicy.value * 100,
              }))
            } else {
              setShortVersion((state) => ({
                ...state,
                price: activePolicy.value * 100,
              }))
            }
          }
        }
      })
    }
  }, [course])
  useEffect(() => {
    if (topContainerRef.current) {
      setTopBlockHeight(topContainerRef.current.offsetHeight)
    }
  }, [windowWidth, topContainerRef])
  useEffect(() => {
    setWindowWidth(width || 1100)
  }, [width])

  const {
    addToCart,
    addToWishlist,
    wishlistItems,
    setGiftDetails,
    setInstantCheckoutItem,
  } = useCartAndWishList()

  document.getElementsByTagName('html')[0].style.scrollBehavior = 'smooth'

  const giftCourseHandler = (e: any) => {
    setGiftDetails(e)
    setGiftCourseModal(false)
    setInstantCheckoutItem(shortVersion)
    router.push('/checkout')
  }

  const buyNowHandler = () => {
    setInstantCheckoutItem(shortVersion)
    router.push('/checkout')
  }

  return (
    course && (
      <div style={{ width: '100%' }}>
        <Body style={{ fontFamily: fontFamilies.regular }}>
          <FixedBuyBlock>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CourseTitle
                style={{ fontSize: 22, margin: 0, marginLeft: '-3px' }}
              >
                {course?.title ||
                  'iOS & Swift - The Complete iOS App Development Bootcamp'}
              </CourseTitle>
              <Rating
                text={
                  course.rating && course.rating > 0
                    ? course.rating + ' students'
                    : '1,000'
                }
                showText={true}
                iconMargin="0.5rem"
                showNumber={true}
                value={course.rating || 4.3}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
              <Button
                border="1px solid #333"
                borderRadius="6px"
                fontSize="18px"
                onClick={buyNowHandler}
              >
                Buy Now
              </Button>
            </div>
          </FixedBuyBlock>
          <FixedPart>
            <TopContainer ref={topContainerRef}>
              <SectionsRouteContainer>
                <RouteButton
                  onClick={() => {
                    router.push({
                      pathname: '/',
                      query: {
                        category: JSON.stringify([course?.category?._id]),
                        subCategory: JSON.stringify([]),
                      },
                    })
                  }}
                >
                  {course?.category?.name?.en}
                </RouteButton>
                <Separator>/</Separator>
                <RouteButton
                  onClick={() => {
                    router.push({
                      pathname: '/',
                      query: {
                        category: JSON.stringify([course?.category?._id]),
                        subCategory: JSON.stringify([course?.subCategory?._id]),
                      },
                    })
                  }}
                >
                  {course?.subCategory?.name?.en}
                </RouteButton>
              </SectionsRouteContainer>
              {windowWidth < 1051 ? (
                <VideoPlayerWrapper>
                  {course.presentationalVideo && (
                    <PlayIconContainer>
                      <PlayIconWrapper
                        onClick={() => setShowPresentationalVideo(true)}
                      >
                        <VideoPlayIcon />
                      </PlayIconWrapper>
                    </PlayIconContainer>
                  )}
                  <CoursePosterImage src={course.presentationalImage} />
                </VideoPlayerWrapper>
              ) : null}
              <CourseTitle>
                {course?.title ||
                  'iOS & Swift - The Complete iOS App Development Bootcamp'}
              </CourseTitle>
              <NumbersContainer>
                <Link href={'#reviews'} style={{ textDecoration: 'none' }}>
                  <div style={{ marginBottom: '20px', marginRight: '2rem' }}>
                    <Rating
                      value={course.rating}
                      text={
                        course.ratingQty && course.ratingQty > 0
                          ? course.ratingQty
                          : course.studentsQty
                      }
                      showText={true}
                      textStyle={{
                        paddingTop: '1px',
                        textDecoration: 'underline',
                      }}
                      showNumber={true}
                      iconMargin="0.5rem"
                    />
                  </div>
                </Link>
                <IconText
                  icon={<StudentQtyIconNew />}
                  text={
                    course.studentsQty && course.studentsQty > 0
                      ? Math.round(course.studentsQty) + ' students'
                      : 'No students yet'
                  }
                  marginRight="2rem"
                  color="#000"
                  opacity="1"
                  marginBottom="20px"
                />
                <IconText
                  icon={<TimeAmountIconNew />}
                  text={
                    'Last update: ' + course?.createdAt?.substr(0, 10) || ''
                  }
                  marginRight="2rem"
                  color="#000"
                  opacity="1"
                  marginBottom="20px"
                />
                <IconText
                  icon={<CourseLanguageIcon />}
                  text={'English'}
                  marginRight={'2rem'}
                  opacity="1"
                  marginBottom="20px"
                />
              </NumbersContainer>
              <AuthorName>
                <span style={{ color: '#999' }}>Author: </span>
                {course.author &&
                  course.author.first_name + ' ' + course.author.last_name}
              </AuthorName>
              <ButtonsFlex>
                <div
                  style={{ display: 'flex' }}
                  onClick={() => setGiftCourseModal(true)}
                >
                  <ButtonWithIcon
                    icon={<GiftIcon />}
                    text="Gift this course"
                    border={true}
                    backgroundColor="rgba(0,0,0,0)"
                  />
                  <IfOwnedCourse hide id={course_id}>
                    <div onClick={() => addToWishlist(shortVersion)}>
                      <ButtonWithIcon
                        icon={<WishlistIcon />}
                        text={
                          wishlistItems.filter((item) => item._id == course._id)
                            .length > 0
                            ? 'In wishlist'
                            : 'Add to wishlist'
                        }
                        backgroundColor="#C7424F1A"
                      />
                    </div>
                  </IfOwnedCourse>
                </div>
                {windowWidth < 1051 ? (
                  <div style={{ display: 'flex' }}>
                    <IfOwnedCourse hide id={course_id}>
                      <div
                        onClick={() => {
                          addToCart(shortVersion)
                          setShowCheckoutModal(true)
                        }}
                      >
                        <ButtonWithIcon
                          icon={<CartIcon />}
                          text="Add to cart"
                          border={true}
                          backgroundColor="rgba(0,0,0,0)"
                        />
                      </div>
                    </IfOwnedCourse>
                    <IfOwnedCourse show id={course_id}>
                      <ContinueLearningButton
                        ViewMode="responsiveCoursePage"
                        courseId={course_id}
                      />
                    </IfOwnedCourse>
                    <div
                      onClick={() => {
                        setShowShareModal(true)
                      }}
                    >
                      <ButtonWithIcon
                        icon={<ShareIcon />}
                        text="Share"
                        border={true}
                        backgroundColor="rgba(0,0,0,0)"
                      />
                    </div>
                  </div>
                ) : null}
              </ButtonsFlex>
            </TopContainer>
            <CheckmarkSectionContainer
              title="What You Will Learn"
              list={
                course.whatYouWillLearn || [
                  'Testing theory and design',
                  'HTTP traffick hijacking using Charles',
                  'Development environment for Java',
                  'Testing theory and design',
                  'Basic GIT mangement theory',
                  'Development environment for Java',
                ]
              }
            />
            <BulletPoinntSectionContainer
              title="Requirements"
              list={
                course.requirements || [
                  'Testing theory and design',
                  'HTTP traffick hijacking using Charles',
                ]
              }
            />
            <DescriptionHeader>Description</DescriptionHeader>
            <ShortDescriptionFlex
              style={{
                maxHeight: openDesc ? '500px' : '80px',
                fontFamily: fontFamilies.regular,
              }}
            >
              The description have not been added yet. Please add the
              description at previous steps. The description have not been added
              yet. Please add the description at previous steps. The description
              have not been added yet. Please add the description at previous
              steps. The description have not been added yet. Please add the
              description at previous steps. The description have not been added
              yet. Please add the description at previous steps. The description
              have not been added yet. Please add the.
              <br />
              <br /> description at previous steps. The description have not
              been added yet. Please add the description at previous steps. The
              description have not been added yet. Please add the description at
              previous steps. The description have not been added yet. Please
              add the description at previous steps. The description have not
              been added yet. Please add the description at previous steps.
            </ShortDescriptionFlex>
            <ShowMore style={{ display: true ? 'flex' : 'hidden' }}>
              <ShowMoreLine />
              <ShowMoreButton
                onClick={() => {
                  setOpenDesc(!openDesc)
                }}
              >
                Show {openDesc ? 'Less' : 'More'}
              </ShowMoreButton>
              <ShowMoreLine />
            </ShowMore>
            <CourseMaterials
              course={course}
              sections={course?.course_materials?.sections}
              totalTime={totalCourseTime}
              totalLectures={totalCourseLectures}
              course_id={course_id}
            />
            <AboutAuthor
              value={course?.aboutAuthor ? course?.aboutAuthor : ''}
            />

            {/* According to the task #259, I hide this element until the task #325 is implemented
            {!isPreview && <OtherCourses />} */}
            {!isPreview && (
              <>
                <div id="reviews">
                  <CourseReviews courseId={course_id} />
                </div>
                <ReportBlock>
                  <Button
                    width="20rem"
                    height="3rem"
                    text="Report a problem"
                    fontWeight="bold"
                    fontFamily={fontFamilies.medium}
                    backgroundColor="#F0F0F0"
                    onClick={() => {
                      setShowReportModal(true)
                    }}
                  />
                  {showReportModal && (
                    <ReportProblem
                      onClose={() => setShowReportModal(false)}
                      itemType="course"
                      itemId={course._id}
                    />
                  )}
                </ReportBlock>
              </>
            )}
          </FixedPart>
          {windowWidth > 1050 ? (
            <FloatingPart>
              <StickyCoursePageBlock
                course={course}
                shortVersion={shortVersion}
                buyNow={buyNowHandler}
                isPreview={isPreview}
                exitPreview={exitPreview}
                totalTime={totalCourseTime}
                totalLectures={totalCourseLectures}
                setShowPresentationalVideo={setShowPresentationalVideo}
                setShowCheckoutModal={setShowCheckoutModal}
                setShowShareModal={setShowShareModal}
              />
            </FloatingPart>
          ) : null}
          {showPresentationalVideo && (
            //which modal should be determined by content type - implement later
            <VideoPlayerModal
              autoplay={true}
              videoLink={course.presentationalVideo[0].public.url}
              onClose={() => setShowPresentationalVideo(false)}
              videoName="Presentational Video"
            />
          )}
        </Body>
        {isPreview ? <></> : <TopBg style={{ height: topBlockHeight }} />}
        {showCheckoutModal && (
          <CartModal onClose={() => setShowCheckoutModal(false)} />
        )}
        {showShareModal && (
          <Modal
            onClose={() => {
              setShowShareModal(false)
            }}
          >
            <ShareModalWrapper>
              <ShareHeader>Share this Course</ShareHeader>
              <InfoWrapper>
                <CoursePosterImage
                  src={course.presentationalImage}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    marginRight: '20px',
                  }}
                />
                <div>
                  {course.title}
                  <InfoWrapper
                    style={{
                      marginLeft: '5px',
                      marginTop: '5px',
                      marginBottom: '5px',
                    }}
                  >
                    <StarIcon width="15px" color="#111" fill={true} />
                    <InfoText style={{ marginLeft: '5px', marginRight: 20 }}>
                      {course.rating.toFixed(1)}
                    </InfoText>
                    <InfoText style={{ marginRight: 20 }}>
                      {course.studentsQty && course.studentsQty > 0
                        ? Math.round(course.studentsQty) + ' students'
                        : 'No students yet'}
                    </InfoText>
                    <InfoText>{course.totalLectures + ' lecture(s)'}</InfoText>
                  </InfoWrapper>
                </div>
              </InfoWrapper>
              <ShareBlock>
                <Popover
                  isOpen={isPopover}
                  onOpenChange={() => {
                    setIsPopover(true)
                    navigator.clipboard.writeText(window.location.href)
                    setTimeout(() => {
                      setIsPopover(false)
                    }, 2000)
                  }}
                  placement={'top'}
                >
                  <Popover.Trigger>
                    <ButtonWrapper>
                      <ButtonWithIcon
                        icon={<LinkIcon />}
                        text="Copy Link"
                        border={true}
                        backgroundColor="rgba(0,0,0,0)"
                        width="100%"
                        textLight={false}
                      />
                    </ButtonWrapper>
                  </Popover.Trigger>
                  <Popover.Content
                    css={{ backgroundColor: 'black', padding: '10px' }}
                  >
                    <Text css={{ p: '$10', color: 'white' }}>Link copied!</Text>
                  </Popover.Content>
                </Popover>
                <ButtonWrapper
                  onClick={() => {
                    window.open(
                      `mailto:?subject=Check out this Course: ${course.title} on Edugram.io&body=${window.location.href}`
                    )
                  }}
                >
                  <ButtonWithIcon
                    icon={<EmailIcon />}
                    text="Email"
                    border={true}
                    backgroundColor="rgba(0,0,0,0)"
                    width="100%"
                    textLight={false}
                  />
                </ButtonWrapper>
                <ButtonWrapper
                  onClick={() => {
                    window.open(
                      `https://twitter.com/intent/tweet?text=Check out this Course: ${course.title} on Edugram.io %0A%0ALink: ${window.location.href}`
                    )
                  }}
                >
                  <ButtonWithIcon
                    icon={<TwitterIcon />}
                    text="Twitter"
                    border={true}
                    backgroundColor="rgba(0,0,0,0)"
                    width="100%"
                    textLight={false}
                  />
                </ButtonWrapper>
                <ButtonWrapper
                  onClick={() => {
                    window.open(
                      `https://www.facebook.com/sharer.php?u=${window.location.href}`
                    )
                  }}
                >
                  <ButtonWithIcon
                    icon={<FaceBookIcon />}
                    text="Facebook"
                    border={true}
                    backgroundColor="rgba(0,0,0,0)"
                    width="100%"
                    textLight={false}
                  />
                </ButtonWrapper>
                <ButtonWrapper
                  onClick={() => {
                    window.open(
                      `http://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`
                    )
                  }}
                >
                  <ButtonWithIcon
                    icon={<LinkedInIcon />}
                    text="LinkedIn"
                    border={true}
                    backgroundColor="rgba(0,0,0,0)"
                    width="100%"
                    textLight={false}
                  />
                </ButtonWrapper>
                <ButtonWrapper
                  onClick={() => {
                    window.open(
                      `https://t.me/share/url?url=${window.location.href}&text=Check out this Course: ${course.title} on Edugram.io`
                    )
                  }}
                >
                  <ButtonWithIcon
                    icon={<TelegramIcon />}
                    text="Telegram"
                    border={true}
                    backgroundColor="rgba(0,0,0,0)"
                    width="100%"
                    textLight={false}
                  />
                </ButtonWrapper>
              </ShareBlock>
            </ShareModalWrapper>
          </Modal>
        )}
        {giftCourseModal && (
          <GiftCourseModal
            onClose={() => setGiftCourseModal(false)}
            onSubmit={giftCourseHandler}
          />
        )}
      </div>
    )
  )
}

export default CoursePageBlock
