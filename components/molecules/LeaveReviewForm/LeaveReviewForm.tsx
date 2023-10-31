import React, { useState } from 'react'
import Button from '@components/atoms/Button'
import Modal from '@components/molecules/Modal'
import { colors, fontFamilies } from '@configs/styles/config'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import { Grid as UIGrid, Textarea, Text } from '@nextui-org/react'
import Lottie from 'react-lottie'
import contact from '@public/static/icons/LeaveReview.json'
import { reviewDescriptionTextLimit } from 'configs/constants/textLimits'
import axios from 'axios'
import routes from '@configs/api'
import { ReviewType } from '@type/courseReview'
import Rating from '@components/atoms/Rating'

const Grid = styled(UIGrid)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
`

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: hidden;
  width: 100%;
  @media (min-width: 430px) {
    width: 34rem;
    padding: 0 2rem;
  }
`

const ReviewFormHeader = styled.div`
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
`

const SuccessHeader = styled.div`
  display: flex;
  font-size: x-large;
  font-weight: 600;
  margin-bottom: 2rem;
  color: ${colors.uguPurple};
`
const RatingDescriptionText = styled.text`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
`

const RatingWrapper = styled.div`
  display: flex;
  height: 3rem;
  margin: 1rem 0;
`

const GridContainer = styled(UIGrid.Container)`
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;
  min-height: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding-bottom: 1.6rem;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* For Webkit browsers */
  }
`

const AnimationContainer = styled.div`
  height: 277px;
  width: 277px;

  @media (max-height: 768px) {
    height: 250px;
    width: 250px;
  }
  @media (max-height: 768px) {
    display: none;
  }
`

type ReviewFormProps = {
  onClose: () => void
  courseId: string
  oldReview?: ReviewType
  updateUserReview: (userReviewData: ReviewType) => void
}

const LeaveReviewForm: React.FC<ReviewFormProps> = (props) => {
  const {
    onClose,
    courseId,
    oldReview,
    updateUserReview: updateUserReviewHandler,
  } = props
  const [reviewDescription, setReviewDescription] = useState<string>(
    oldReview?.review ? oldReview?.review : ''
  )
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [ratingValue, setRatingValue] = React.useState<number>(
    oldReview?.rating ? oldReview?.rating : 0
  )

  const editingMode = oldReview ? true : false

  const { t } = useTranslation('courseReviews')

  const defaultOptions = {
    loop: 2,
    autoplay: true,
    animationData: contact,
  }

  const ratingLabels = [
    t('Quite Poor'),
    t('Just Fair'),
    t('Good Enough'),
    t('Really Great'),
    t('Absolutely Excellent'),
  ]

  const autoClose = () =>
    setTimeout(() => {
      if (!error) onClose()
    }, 2000)

  const postReview = async () => {
    const reviewData = {
      title: '',
      review: reviewDescription,
      rating: ratingValue,
    }
    const tokenId = localStorage.getItem('tokenId')

    const URL = `${routes.BASE}/api/education/courses/${courseId}/reviews`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenId}`,
      },
    }
    try {
      const response = await axios.post(URL, reviewData, config)
      updateUserReviewHandler(response.data)
      autoClose()
      // console.log(response.data)
    } catch (error) {
      console.error('Failed to post review', error)
      setError(true)
    }
  }

  const patchReview = async () => {
    const reviewData = {
      title: '',
      review: reviewDescription,
      rating: ratingValue,
    }
    const tokenId = localStorage.getItem('tokenId')

    const URL = `${routes.BASE}/api/education/courses/${courseId}/reviews/${oldReview?._id}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenId}`,
      },
    }

    try {
      const response = await axios.patch(URL, reviewData, config)

      updateUserReviewHandler(response.data)
      autoClose()
      // console.log(response.data)
    } catch (error) {
      console.error('Failed to patch review', error)
      setError(true)
    }
  }

  const postReviewHandler = () => {
    if (!editingMode) postReview()
    else patchReview()
    setSuccess(true)
  }

  return (
    <Modal onClose={onClose} blurredBackground>
      <ModalWrapper>
        <GridContainer
          style={{
            display: 'flex',
            gap: '1.6rem',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            width: '100%',
            minHeight: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {success ? (
            error ? (
              <Text color="error">{t(' Something went wrong')}</Text>
            ) : (
              <>
                <SuccessHeader>
                  {!editingMode
                    ? t(' Thanks for your feedback!')
                    : t(' Your changes have been saved!')}
                </SuccessHeader>
                <Button
                  marginBottom="2rem"
                  width="40%"
                  height="3rem"
                  text={t(' Close')}
                  fontWeight="light"
                  fontFamily={fontFamilies.medium}
                  backgroundColor={colors.uguWhite}
                  border="1px solid"
                  borderColor={colors.uguPurple}
                  onClick={onClose}
                />
              </>
            )
          ) : (
            <>
              <Grid>
                <AnimationContainer>
                  <Lottie options={defaultOptions} />
                </AnimationContainer>
                <ReviewFormHeader>
                  {!editingMode
                    ? t(' Rate this Course')
                    : t(' Edit your review')}
                </ReviewFormHeader>
              </Grid>
              {error ? (
                <Text color="error">{t(' Something went wrong')}</Text>
              ) : null}
              <Grid>
                <RatingDescriptionText>
                  {ratingValue
                    ? ratingLabels[ratingValue - 1]
                    : t('Choose rating')}
                </RatingDescriptionText>
                <RatingWrapper>
                  <Rating
                    value={ratingValue}
                    onValueChange={(newValue) => {
                      setRatingValue(newValue ? newValue : 0)
                    }}
                    iconWidth={'3rem'}
                    // iconMargin={'1rem'}
                    readOnly={false}
                    iconStyle={{
                      padding: '0 0.5rem',
                    }}
                  />
                </RatingWrapper>
              </Grid>
              <Grid>
                <Textarea
                  bordered
                  color="primary"
                  labelPlaceholder={t(' Leave your review(optional)')}
                  value={reviewDescription}
                  onChange={(e) => setReviewDescription(e.target.value)}
                  status="default"
                  width="95%"
                  maxLength={reviewDescriptionTextLimit}
                  style={{
                    minHeight: '10.5rem',
                    height: '10.5rem',
                    overflow: 'auto',
                  }}
                />
              </Grid>

              <Grid>
                <Button
                  disabled={
                    (oldReview?.rating == ratingValue &&
                      oldReview?.review == reviewDescription) ||
                    !ratingValue
                  }
                  width="80%"
                  height="3rem"
                  text={
                    !editingMode ? t(' Submit review') : t(' Submit changes')
                  }
                  fontWeight="bold"
                  fontFamily={fontFamilies.medium}
                  backgroundColor={colors.uguYellow}
                  onClick={postReviewHandler}
                />
              </Grid>
            </>
          )}
        </GridContainer>
      </ModalWrapper>
    </Modal>
  )
}

export default LeaveReviewForm
