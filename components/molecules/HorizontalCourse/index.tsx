// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { colors, fontFamilies } from '@configs/styles/config'
import Button from '@components/atoms/Button'
import { ShortCourse } from '@ugu/types'
import {
  CourseContainer,
  CourseInfoContainer,
  CourseTitle,
  AuthorReviewBlockWrapper,
  CourseAuthor,
  CoursePrice,
  BottomWrapper,
  ButtonsWrapper,
  PriceWrapper,
  OriginalPrice,
  CloseButton,
  Price,
} from './styled.components'
import CartIcon from '@public/static/icons/headerIcons/cart-icon'
import WishlistIcon from '@public/static/icons/headerIcons/wishlist-icon'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import CartModal from '@components/organisms/CartModal'
import Link from 'next/link'
import Image from 'next/image'
import IfOwnedCourse from '@components/atoms/IfOwnedCourse/IfOwnedCourse'
import ContinueLearningButton from '@components/atoms/ContinueLearningButton/ContinueLearningButton'
import { VerticalCourseUserIcon } from '@public/static/icons/vertical-course-user-icon'

import { useTranslation } from 'react-i18next'
import CloseIcon from '@public/static/icons/close-icon'
import { Col, Row } from 'react-styled-flexboxgrid'

type HorizontalCourseCardProps = {
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  course?: ShortCourse
  onClick?: Function
  variant?: 'default' | 'cart' | 'wishlist'
  onClose?: () => void
}

const HorizontalCourseCard: React.FC<HorizontalCourseCardProps> = (props) => {
  const { t } = useTranslation('home')
  const {
    course,
    marginLeft = '',
    marginBottom = '20px',
    marginTop = '',
    marginRight = '',
    variant = 'default',
    onClose = () => {},
  } = props

  const courseRef = useRef<any>(null)
  const [inCart, setInCart] = useState(false) // this needs to be deleted and inCart() used instead
  const [inWishlist, setInWishlist] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  const {
    addToCart,
    cartItems,
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
  } = useCartAndWishList()

  useEffect(() => {
    setInCart(cartItems?.filter((item) => item?._id == course?._id).length != 0)
    setInWishlist(
      wishlistItems?.filter((item) => item?._id == course?._id).length != 0
    )
  }, [cartItems, wishlistItems])

  const handleMouseEnter = () => {}
  const handleCartButton = () => {
    if (course) {
      const deleteCourse = (cour: ShortCourse) => {
        console.log(cour)
      }
      !inCart ? addToCart(course) : deleteCourse(course)
      // !inCart ? setShowCheckoutModal((status) => !status) : () => {}
      setShowCheckoutModal((status) => !status)
      setInCart(true)
    }
  }
  const handleWishlistButton = () => {
    if (course) {
      !inWishlist ? addToWishlist(course) : removeFromWishlist(course?._id)
      setInWishlist(!inWishlist)
    }
  }

  const [imageStyle, setImageStyle] = useState({
    width: '100%',
    textAlign: 'center',
    height: '100%',
    backgroundColor: 'rgba(107, 181, 201, 0.2)',
    borderRadius: '15px',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
  })

  return (
    <CourseContainer
      onMouseEnter={() => {
        handleMouseEnter()
        //setShowWindow(true)
      }}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginTop={marginTop}
      ref={courseRef}
    >
      <Link
        href={{ pathname: '/course-page', query: { id: course?._id } }}
        style={{
          width: '30%',
          position: 'relative',
        }}
        prefetch={false}
      >
        <Image
          src={course?.presentationalImage || ''}
          alt="Course Image"
          width={300}
          height={300}
          style={imageStyle}
          onError={() => {
            course.presentationalImage = '/static/images/placeholder.svg'
            setImageStyle({
              width: '100%',
              textAlign: 'center',
              height: '100%',
              padding: '18%',
              backgroundColor: 'rgba(107, 181, 201, 0.2)',
              borderRadius: '15px',
              position: 'absolute',
              top: 0,
            })
          }}
        />
      </Link>
      <CourseInfoContainer style={{ flexGrow: 1 }}>
        <Row>
          <Col xs>
            <Link
              href={{ pathname: '/course-page', query: { id: course?._id } }}
              style={{ textDecoration: 'none' }}
              prefetch={false}
            >
              <CourseTitle>
                {course?.title.slice(0, 40) +
                  (course?.title.length > 40 ? '...' : '')}
              </CourseTitle>
            </Link>
          </Col>
          {variant === 'cart' && (
            <Col>
              <CloseButton onClick={onClose}>
                <CloseIcon />
              </CloseButton>
            </Col>
          )}
        </Row>

        <div
          style={{
            fontFamily: fontFamilies.regular,
            color: '#1A1e3d',
            display: 'flex',
            gapX: 10,
            marginTop: 10,
            flexWrap: 'wrap',
          }}
        >
          {/* <li style={{ listStyleType: 'disc', margin: 0 }}>
            <span style={{ position: 'relative', left: -10, fontSize: 12 }}>
               Students
            </span>
          </li> */}
          <li style={{ listStyleType: 'disc' }}>
            <span
              style={{ position: 'relative', fontSize: 13, marginRight: 20 }}
            >
              {new Date((course?.totalTime || 0) * 1000)
                .toISOString()
                .substring(11, 16)}{' '}
              {t('courseInfo.hours')}
            </span>
          </li>
          <li style={{ listStyleType: 'disc' }}>
            <span style={{ position: 'relative', fontSize: 13 }}>
              {course?.level == 'all' && 'All levels'}
              {course?.level == 'beginner' && 'Beginner'}
              {course?.level == 'intermediate' && 'Medium'}
              {course?.level == 'expert' && 'Expert'}
            </span>
          </li>
        </div>
        <AuthorReviewBlockWrapper>
          <CourseAuthor>
            <VerticalCourseUserIcon></VerticalCourseUserIcon>
            {course?.author.first_name} {course?.author.last_name}
          </CourseAuthor>
          <div
            style={{
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.53405 13.4766L4.72296 15.473C3.98912 15.8574 3.13288 15.234 3.27341 14.4176L4.00034 10.1944L0.924323 7.20673C0.329011 6.62851 0.656424 5.61863 1.47776 5.49971L5.73206 4.88373L7.63795 1.03579C8.00523 0.294238 9.06287 0.29424 9.43016 1.03579L11.336 4.88373L15.5903 5.49971C16.4117 5.61863 16.7391 6.62851 16.1438 7.20672L13.0678 10.1944L13.7947 14.4176C13.9352 15.234 13.079 15.8574 12.3451 15.473L8.53405 13.4766Z"
                fill="#1A1E3D"
              />
            </svg>

            {(course?.rating).toFixed(1)}
          </div>
        </AuthorReviewBlockWrapper>

        {variant !== 'cart' ? (
          <BottomWrapper>
            <PriceWrapper>
              <IfOwnedCourse hide id={course?._id}>
                <CoursePrice>
                  {course && course.price !== undefined
                    ? (course.price / 100).toFixed(2).replace(/\.00$/, '') +
                      t('courseInfo.currency')
                    : ''}
                </CoursePrice>
                {course && course.salePrice && (
                  <OriginalPrice>
                    {(course.salePrice / 100).toFixed(2).replace(/\.00$/, '') +
                      ' USD'}
                  </OriginalPrice>
                )}
              </IfOwnedCourse>
            </PriceWrapper>
            <ButtonsWrapper>
              <>
                <IfOwnedCourse hide id={course?._id}>
                  <Button
                    backgroundColor={
                      inWishlist ? colors.uguLightRed : colors.uguLightLightGrey
                    }
                    width="35px"
                    height="35px"
                    borderRadius="50%"
                    marginRight="0.5rem"
                    onClick={handleWishlistButton}
                  >
                    <WishlistIcon
                      width="15px"
                      color={inWishlist ? colors.uguRed : colors.uguPurple}
                    />
                  </Button>
                  <Button
                    backgroundColor={
                      inCart ? '#E1E5FF' : colors.uguLightLightGrey
                    }
                    width="35px"
                    height="35px"
                    borderRadius="50%"
                    onClick={handleCartButton}
                  >
                    <CartIcon
                      width="17px"
                      color={
                        inCart ? 'rgba(113, 129, 255, 1)' : colors.uguPurple
                      }
                    />
                  </Button>
                </IfOwnedCourse>
              </>
              <IfOwnedCourse show id={course?._id}>
                <ContinueLearningButton
                  ViewMode="verticalCard"
                  courseId={course?._id}
                />
              </IfOwnedCourse>
            </ButtonsWrapper>
          </BottomWrapper>
        ) : (
          <BottomWrapper></BottomWrapper>
        )}
        {variant === 'cart' && (
          <PriceWrapper style={{ marginLeft: 'auto', flexDirection: 'row' }}>
            <Price active>
              {course?.price
                ? course?.salePrice
                  ? `${course?.salePrice / 100} USD`
                  : `${course?.price / 100} USD`
                : 'Free'}
            </Price>
            {course?.salePrice && course?.salePrice < course?.price && (
              <>
                <Price active>/</Price>
                <Price>{course?.price / 100} USD</Price>
              </>
            )}
          </PriceWrapper>
        )}
      </CourseInfoContainer>
      {showCheckoutModal && (
        <CartModal
          onClose={() => {
            setShowCheckoutModal(false)
          }}
        />
      )}
    </CourseContainer>
  )
}
export default HorizontalCourseCard
