// @ts-nocheck
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import CloseIcon from '@public/static/icons/close-icon'
import { ShortCourse } from '@type/course'
import { useCartAndWishList } from '@contexts/CartAndWishList'
import { colors, fontFamilies } from '@configs/styles/config'
import Button from '@components/atoms/Button'
import CartIcon from '@public/static/icons/headerIcons/cart-icon'
import WishlistIcon from '@public/static/icons/headerIcons/wishlist-icon'
import Link from 'next/link'
import { AiFillTag } from 'react-icons/ai'
import Image from 'next/image'
import { getLiveCourse } from '@services/api/course'
import IfOwnedCourse from '@components/atoms/IfOwnedCourse/IfOwnedCourse'
import ContinueLearningButton from '@components/atoms/ContinueLearningButton/ContinueLearningButton'
import { useMyCourses } from '@contexts/MyCoursesContext'
import Rating from '@components/atoms/Rating'

type CardType = 'home' | 'category' | 'cart' | 'wishlist'

type HorizontalCourseCardProps = {
  text?: string
  cardType?: CardType
  opacity?: string //opacity of the Text
  fontSize?: string //font size of the Text
  textColor?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  marginBottom?: string
  width?: string
  inCart?: boolean
  closable?: boolean
  data: ShortCourse
  where?: string
}
type CourseContainerProps = {
  marginLeft: string
  marginRight: string
  cardType: CardType
}

const CourseContainer = styled.div<CourseContainerProps>`
  height: 12rem;
  min-width: ${(props) =>
    props.cardType === 'home'
      ? '46rem'
      : props.cardType === 'category'
      ? '49.5rem'
      : '49.5rem'};
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  margin: 0 2rem 2rem 0;
  /* box-shadow: 4px 10px 20px 10px #ededed; */
  box-shadow: 4px 5px 50px 10px #e8e8e8;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '')};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '')};
  color: ${colors.uguPurple};
  :hover {
    cursor: pointer;
    /* box-shadow: 10px 10px 20px 20px #ededed; */
    /* box-shadow: 4px 10px 20px 10px #dedede; */
    /* box-shadow: 4px 10px 20px #e7e7e7; */
    box-shadow: 4px 10px 50px 10px #e0e0e0;
  }
`

// const ImageWrapper = styled.img<{ cardType: CardType }>`
//   width: ${(props) =>
//     props.cardType === 'home'
//       ? '12rem'
//       : props.cardType === 'category'
//         ? '14rem'
//         : '14rem'};
//   height: 100%;
//   background-color: rgba(107, 181, 201, 0.2);
//   border-radius: 15px 0 0 15px;
//   object-fit: cover;
// `

const VerticalCourseInfoWrapper = styled.div<{ cardType: CardType }>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* width: ${(props) => (props.cardType ? '35rem' : '35rem')}; */
  width: ${(props) =>
    props.cardType === 'home'
      ? '33.5rem'
      : props.cardType === 'category'
      ? '35rem'
      : '35rem'};
  background-color: #ffffff;
  border-radius: 0 15px 15px 0;
  padding: 0.75rem 0.5rem 0.5rem 1rem;
  box-sizing: border-box;
  text-decoration: none;
  flex-grow: 1;
`
const TopWrapper = styled.div`
  display: flex;
`

const CourseTitle = styled.div`
  height: 2.5rem;
  padding-right: 1rem;
  line-height: 1.25rem;
  color: black;
  text-decoration: none;
  /* font-size: 0.9rem; */
  font-family: ${fontFamilies.medium};
`
// const DesciptionKeywordsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `
const CourseDescription = styled.div`
  /* width: 28rem; */
  width: 80%;
  font-size: 0.9rem;
  line-height: 1.25rem;
  font-family: ${fontFamilies.light};
  height: 2.5rem;
  margin-top: 0.5rem;

  display: -webkit-box;

  -webkit-line-clamp: 2; /* if you change this, make sure to change the fallback line-height and height */
  -webkit-box-orient: vertical;
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
`
const CourseKeywordsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  min-height: 1.8rem;
`

const Keyword = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.uguPurple};
  font-family: ${fontFamilies.light};
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
  align-items: flex-start;
  font-size: 0.75rem;
`

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* width: 100%; */
  margin-top: 0.75rem;
  align-items: flex-end;
  height: 1.25rem;
`
const LeftWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 80%;
  /* padding-top: 0.5rem; */
`

const AuthorWrapper = styled.div`
  width: 10rem;
  font-size: 0.75rem;
  margin-right: 1rem;
  font-family: ${fontFamilies.light};
  max-lines: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 1rem;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 0.25rem;
`

const PriceWrapper = styled.div<{
  cardType?: CardType
}>`
  font-size: 0.75rem;
  font-weight: bold;
  margin-left: auto;
  margin-top: ${(props) => (props.cardType === 'cart' ? '-1.25rem' : '')};
  /* margin-top: 0.5rem; */
  /* margin-left: 2rem; */
`

const CoursePrice = styled.text`
  display: flex;
  /* align-items: flex-end; */
  color: ${colors.uguPurple};
  height: 60%;
  font-size: 1rem;
  line-height: 1.25rem;
  margin-left: 0.25rem;
  justify-content: flex-start;
  font-family: ${fontFamilies.medium};
`
const OriginalPrice = styled.text<{
  cardType?: CardType
}>`
  display: flex;
  color: ${colors.uguPurple};
  height: 40%;
  font-size: 0.7rem;
  margin-top: ${(props) => (props.cardType === 'cart' ? '' : '-0.25rem')};
  font-family: ${fontFamilies.light};
  text-decoration: line-through;
`

// const RightSideWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 7rem;
//   justify-content: space-between;
//   padding-top: 0.5rem;
//   padding-right: 1rem;
// `
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -1rem;
  margin-left: auto;
`

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1rem;
  height: 1rem;
  border-radius: 10px;
  background-color: #f0f0f0;
  position: relative;
  top: 0.7rem;
  right: 0.7rem;
`

const HorizontalCourseCard: React.FC<HorizontalCourseCardProps> = (props) => {
  const {
    //closable,
    marginLeft = '',
    marginRight = '',
    marginTop = '',
    marginBottom = '',
    cardType = 'home',
    data,
  } = props

  const [inCart, setInCart] = useState(false) // this needs to be deleted and inCart() used instead
  const [inWishlist, setInWishlist] = useState(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  // const { cart, addToCart, removeFromCart } = useCart() // uncomment
  // const { wishlist, addToWishlist, removeFromWishlist } = useWishlist() // uncomment
  const {
    addToCart,
    removeFromCart,
    cartItems,
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
  } = useCartAndWishList()

  const onCloseHandler = () => {
    //check which cardType it is,
    //if cart - remove from cart
    //if wishlist - remove from wishlist
    if (cardType == 'cart') {
      removeFromCart(data?._id)
    }
    if (cardType == 'wishlist') {
      removeFromWishlist(data?._id)
    }
  }
  //uncomment
  // const inCart = useCallback(() => {
  //check if in cart and return boolean
  // }, [cart])

  //uncomment
  // const inWishlist = useCallback(() => {
  //check if in wishlist and return boolean
  // }, [wishlist])

  useEffect(() => {
    console.log()
    setInCart(cartItems?.filter((item) => item._id == data?._id).length != 0)
    setInWishlist(
      wishlistItems?.filter((item) => item._id == data?._id).length != 0
    )
  }, [cartItems, wishlistItems, data._id])

  const handleCartButton = () => {
    if (data) {
      !inCart ? addToCart(data) : removeFromCart(data?._id)
      setInCart(!inCart)
    }
  }
  const handleWishlistButton = () => {
    if (data) {
      !inWishlist ? addToWishlist(data) : removeFromWishlist(data?._id)
      setInWishlist(!inWishlist)
    }
  }
  // const handleAddToCart = (item: ShortCourse) => {
  //   addToCart(item)
  // }

  const [totalCourseTime, setTotalCourseTime] = useState(0)
  const [totalCourseLectures, setTotalCourseLectures] = useState(0)

  useEffect(() => {
    let totalTime = 0
    let totalLectures = 0
    data?.course_materials?.sections.forEach((section: any) => {
      section?.lectures.forEach((lecture: any) => {
        totalTime = totalTime + lecture?.content?.duration
      })
      totalLectures = totalLectures + section.lectures.length
    })

    setTotalCourseTime(totalTime / 3600)
    setTotalCourseLectures(totalLectures)
  }, [data])

  const { isMyCourse } = useMyCourses()
  return (
    <CourseContainer
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      cardType={cardType}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <Link
        href={{ pathname: '/course-page', query: { id: data?._id } }}
        style={{
          textDecoration: 'none',
        }}
      >
        <Image
          src={
            data?.presentationalImage
              ? data?.presentationalImage
              : '/static/images/og-learning-path-react.jpg'
          }
          alt={data?.title + ' Presentation Image'}
          width={230}
          height={230}
          style={{
            width: cardType === 'home' ? '12rem' : '14rem',
            height: '100%',
            backgroundColor: 'rgba(107, 181, 201, 0.2)',
            borderRadius: '15px 0 0 15px',
            objectFit: 'cover',
          }}
          loading="lazy"
        />
      </Link>
      <VerticalCourseInfoWrapper cardType={cardType}>
        <TopWrapper>
          <Link
            href={{ pathname: '/course-page', query: { id: data?._id } }}
            style={{
              textDecoration: 'none',
            }}
          >
            <CourseTitle>
              {data?.title?.slice(0, 50) +
                (data?.title?.length > 50 ? '...' : '')}
            </CourseTitle>
          </Link>
          {cardType !== 'cart' && (
            <PriceWrapper>
              <IfOwnedCourse hide id={data._id}>
                <CoursePrice>
                  {data && data.price !== undefined
                    ? ((data.salePrice || data.price) / 100)
                        .toFixed(2)
                        .replace(/\.00$/, '') + ' $'
                    : ''}
                </CoursePrice>
              </IfOwnedCourse>
            </PriceWrapper>
          )}
        </TopWrapper>
        <CourseDescription>{data?.shortCourseDescription}</CourseDescription>
        <CourseKeywordsWrapper>
          <Keyword>{Math.round(totalCourseTime * 10) / 10} Hours</Keyword>
          <Keyword>
            {data?.level == 'all'
              ? 'All levels'
              : data?.level == 'beginner'
              ? 'Beginner'
              : data?.level == 'intermediate'
              ? 'Intermediate'
              : data?.level == 'expert'
              ? 'Expert'
              : ''}
          </Keyword>
        </CourseKeywordsWrapper>
        <BottomWrapper>
          <LeftWrapper>
            <AuthorWrapper>
              Author: {data?.author.first_name} {data?.author.last_name}
            </AuthorWrapper>
            <Rating
              value={data?.rating}
              showText={true}
              text={JSON.stringify(data?.ratingQty)}
              iconMargin={'0.5rem'}
            />
          </LeftWrapper>
          <ButtonsWrapper>
            {(isHovered || inCart || inWishlist || isMyCourse(data._id)) &&
              cardType !== 'cart' && (
                <>
                  <IfOwnedCourse hide id={data._id}>
                    <Button
                      backgroundColor={
                        inCart ? colors.uguLightBlue : colors.uguLightLightGrey
                      }
                      width="35px"
                      height="35px"
                      borderRadius="50%"
                      marginRight="0.5rem"
                      onClick={handleCartButton}
                    >
                      <CartIcon
                        width="17px"
                        color={inCart ? colors.uguPurple : colors.uguPurple}
                      />
                    </Button>
                    <Button
                      backgroundColor={
                        inWishlist
                          ? colors.uguLightRed
                          : colors.uguLightLightGrey
                      }
                      width="35px"
                      height="35px"
                      borderRadius="50%"
                      onClick={handleWishlistButton}
                    >
                      <WishlistIcon
                        width="15px"
                        color={inWishlist ? colors.uguRed : colors.uguPurple}
                      />
                    </Button>
                  </IfOwnedCourse>
                </>
              )}
            <IfOwnedCourse show id={data._id}>
              <ContinueLearningButton
                ViewMode="horizontalCard"
                courseId={data._id}
              />
            </IfOwnedCourse>
          </ButtonsWrapper>

          {cardType === 'cart' ? (
            <PriceWrapper cardType={cardType}>
              <IfOwnedCourse hide id={data._id}>
                <CoursePrice>
                  {data && data.price !== undefined
                    ? ((data.salePrice || data.price) / 100)
                        .toFixed(2)
                        .replace(/\.00$/, '') + ' $'
                    : ''}
                </CoursePrice>
                {data.salePrice && data.salePrice < data.price && (
                  <OriginalPrice cardType={cardType}>
                    $
                    {data && data.price !== undefined
                      ? (data.price / 100).toFixed(2).replace(/\.00$/, '')
                      : ''}
                    <IconWrapper>
                      <AiFillTag color="#8D9AFF" size="1rem" />
                    </IconWrapper>
                  </OriginalPrice>
                )}
              </IfOwnedCourse>
            </PriceWrapper>
          ) : (
            <></>
          )}
        </BottomWrapper>
      </VerticalCourseInfoWrapper>
      {cardType === 'cart' ? (
        <CloseButton onClick={() => onCloseHandler()}>
          <CloseIcon width="0.5rem" height="0.5rem" />
        </CloseButton>
      ) : (
        ''
      )}
    </CourseContainer>
  )
}

export default HorizontalCourseCard
