import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ReviewSectionDetailedRow from '../ReviewSectionDetailedRow'
import Review from '../Review'
import Button from '../../atoms/Button'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import routes from '@configs/api'
import Rating from '@components/atoms/Rating'
import { fontFamilies } from '@configs/styles/config'
import LeaveReviewForm from '../LeaveReviewForm/LeaveReviewForm'
import IfOwnedCourse from '@components/atoms/IfOwnedCourse/IfOwnedCourse'
import { ReviewType } from 'types/courseReview'
import { useAuth } from '@hooks/useAuth'

type CourseReviewsProps = {
  title?: string
  courseId: string
}

const CourseReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  color: #1a1e3d;
`

const Title = styled.div`
  font-size: 1.25rem;
`

const ReviewsBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewsStatisticWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 1rem;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const CourseRateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
  margin-right: 20px;
`
const CourseRateMark = styled.div`
  font-size: 6rem;
  font-family: ${fontFamilies.bold};
  /* font-weight: 800; */
  line-height: 7.5rem;
  text-align: center;
  margin-bottom: -1rem;
`

const CourseRateLabel = styled.div`
  display: flex;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-family: ${fontFamilies.light};
`
const DetailedStatisticWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  /* height: 9rem; */

  @media (max-width: 700px) {
    flex-direction: column;
    gap: 0.6rem;
  }
`

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
  width: 100%;
`

const ShowMoreButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`
const LeaveReviewButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`

const CourseReviews: React.FunctionComponent<CourseReviewsProps> = (props) => {
  const { courseId } = props
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [selectedRating, setSelectedRating] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const {
    authState: { user },
  } = useAuth()

  const isUserReview = (review: ReviewType | undefined) => {
    return review ? review.author.id === user?._id : false
  }

  const moveUserReviewToStart = (reviews: ReviewType[]): ReviewType[] | [] => {
    const userReviewData = reviews.find((review) => isUserReview(review))
    if (userReviewData) {
      return [
        userReviewData,
        ...reviews.filter((review) => review.author.id !== user?._id),
      ]
    }
    return reviews
  }

  const updateUserReviewHandler = (userReviewData: ReviewType) => {
    if (isUserReview(reviews[0]))
      setReviews((prevReviews) => [userReviewData, ...prevReviews.slice(1)])
    else setReviews((prevReviews) => [userReviewData, ...prevReviews])
  }

  const fetchReviews = async () => {
    try {
      const reviewsResponse = await axios.get(
        `${routes.BASE}/api/education/courses/${courseId}/reviews`
      )
      const reviewsData = reviewsResponse.data
      setReviews(moveUserReviewToStart(reviewsData))

      console.log('Reviews:', reviewsData)
    } catch (error) {
      console.log('Error fetching reviews:', error)
    }
  }
  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    if (showReviewModal) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [showReviewModal])

  const getAverageRating = () => {
    if (reviews.length === 0) {
      return 0
    }
    const totalRating = reviews.reduce(
      (sum, review: any) => sum + review.rating,
      0
    )
    return totalRating / reviews.length
  }

  const averageRating = getAverageRating()

  const calculateRatingPercentages = () => {
    const ratingCounts = [0, 0, 0, 0, 0]

    reviews.forEach((review: any) => {
      ratingCounts[5 - review.rating]++
    })
    const percentages = ratingCounts.map(
      (count) => (count / reviews.length) * 100
    )
    return percentages
  }

  const ratingPercentages = calculateRatingPercentages()

  const handleRatingFilter = (rating: any) => {
    setSelectedRating(rating)
  }

  const filteredReviews = selectedRating
    ? reviews.filter((review: any) => review.rating === selectedRating)
    : reviews

  const { t } = useTranslation(['courseReviews'])
  return (
    <CourseReviewsWrapper>
      <Title>
        {t('Reviews: ')}
        {reviews.length}
      </Title>
      <ReviewsBlock>
        <ReviewsStatisticWrapper>
          <CourseRateWrapper>
            <CourseRateMark>{averageRating.toPrecision(2)}</CourseRateMark>
            <Rating value={averageRating} iconMargin={'0.3rem'} />
            <CourseRateLabel>{t('Course Rating')}</CourseRateLabel>
          </CourseRateWrapper>
          <DetailedStatisticWrapper>
            {ratingPercentages.map((percentage, index) => (
              <ReviewSectionDetailedRow
                key={index}
                progress={percentage}
                value={5 - index}
                selected={
                  selectedRating
                    ? selectedRating === 5 - index
                      ? true
                      : false
                    : true
                }
                isSelected={selectedRating ? true : false}
                onClick={() => handleRatingFilter(5 - index)}
                onClear={() => setSelectedRating(null)}
              />
            ))}
          </DetailedStatisticWrapper>
        </ReviewsStatisticWrapper>
        <IfOwnedCourse show id={courseId}>
          {!isUserReview(reviews[0]) && (
            <LeaveReviewButtonWrapper>
              <Button
                text="Add Review"
                width="20rem"
                height="3rem"
                fontWeight="bold"
                fontFamily={fontFamilies.medium}
                borderColor={'#898B9B'}
                backgroundColor={'none'}
                border={'1px solid'}
                onClick={() => {
                  setShowReviewModal(true)
                }}
              />
            </LeaveReviewButtonWrapper>
          )}
          {showReviewModal && (
            <LeaveReviewForm
              onClose={() => setShowReviewModal(false)}
              courseId={courseId}
              oldReview={isUserReview(reviews[0]) ? reviews[0] : undefined}
              updateUserReview={updateUserReviewHandler}
            />
          )}
        </IfOwnedCourse>

        <ReviewsWrapper>
          {filteredReviews.map((review: ReviewType, index) =>
            index === 0 && isUserReview(review) ? (
              <Review
                key={index}
                review={review.review}
                name={review.author.first_name}
                date={new Date(review.createdAt).toLocaleDateString()}
                rating={review.rating}
                userCreatedReview
                editingHandler={() => setShowReviewModal(true)}
              />
            ) : (
              <Review
                key={index}
                review={review.review}
                name={review.author.first_name}
                date={new Date(review.createdAt).toLocaleDateString()}
                rating={review.rating}
              />
            )
          )}
          {selectedRating && reviews.length > 0 && (
            <ShowMoreButtonWrapper>
              <Button
                text={'Show All'}
                borderColor={'#898B9B'}
                backgroundColor={'none'}
                color={'rgba(26,30,61,0.7)'}
                border={'1px solid'}
                padding={'0 20px'}
                onClick={() => setSelectedRating(null)}
              />
            </ShowMoreButtonWrapper>
          )}
        </ReviewsWrapper>
      </ReviewsBlock>
    </CourseReviewsWrapper>
  )
}

export default CourseReviews
