import React, { useLayoutEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import EditIcon from '@public/static/icons/edit-icon'
import Rating from '@components/atoms/Rating'
import ReviewAvatarIcon from '@public/static/icons/reviewAvatarIcon'
import { colors } from '@configs/styles/config'
import useWindowDimensions from '@hooks/useWindowDimensions'

// import Button from '../atoms/Button'
// import { colors } from '@configs/styles/config'
// import { useTranslation } from 'react-i18next'

type ReviewProps = {
  name: string
  date: any
  rating: number
  review: string
  userCreatedReview?: boolean
  editingHandler?: () => void
  linesToShow?: number
}

const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 2rem 1rem 2rem 2rem;
  border-radius: 10px;
  background-color: rgba(248, 248, 248, 0.16);
  margin-top: 1rem;
  box-sizing: border-box;
  @media (max-width: 800px) {
    padding: 2rem 1rem 2rem 0rem;
  }
`
const AvatarWrapper = styled.div`
  display: flex;
  height: 4rem;
  min-width: 4rem;
  border-radius: 20px;
  background-color: ${colors.uguLightLightGrey};
  margin-right: 1rem;
  align-items: center;
  justify-content: center;
`

const ReviewBlock = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  width: 100%;
`

const ReviewUpperBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ReviewWrapperBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const ReviewUpperInnerBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const AuthorName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`
const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`

const DatePosted = styled.div`
  display: flex;
  opacity: 0.8;
  margin-right: 0.5rem;
`

const ReviewTextWrapper = styled.div<{
  linesToShow: number
  showMore: boolean
}>`
  max-height: ${(props) =>
    props.showMore ? 'none' : `${props.linesToShow * 1.5 + 0.625}rem`};
  margin-top: 0.5rem;
  max-width: 100%;
  cursor: pointer;
  transition: 0.3s;
  padding: 5px 0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`
const ReviewText = styled.div`
  opacity: 0.8;
  line-height: 1.5rem;
  max-width: 100%;
  cursor: pointer;
`
const ShadowBlock = styled.div`
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 15%,
    rgba(0, 212, 255, 0) 42%
  );
  height: 80px;
  overflow: hidden;
  width: 100%;
  position: absolute;
  bottom: -21px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: underline;
  align-items: center;
  cursor: pointer;
`
// (Edugram Alfa) This component is hidden until you start working on this issue:
// https://github.com/UGU-Academy/ugu/issues/290
// const UsefulBlock = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 30px;
//   flex-wrap: wrap;
// `
// const UsefulBlockText = styled.div`
//   opacity: 0.8;
//   margin-right: 1rem;
// `
// const UsefulBlockButtons = styled.div`
//   display: flex;
//   flex-direction: row;
// `
// const ComplainButton = styled.div`
//   opacity: 0.8;
//   text-decoration: underline;
// `

const CourseReviews: React.FunctionComponent<ReviewProps> = (props) => {
  // const { t } = useTranslation(['common', 'review'])
  const [showMore, setShowMore] = useState(false)
  const {
    name: title,
    date,
    rating,
    review,
    userCreatedReview = false,
    editingHandler,
    linesToShow = 5,
  } = props

  const { width } = useWindowDimensions()

  const textContainerRef = useRef<HTMLDivElement>(null)
  const [linesNeeded, setLinesNeeded] = useState(0)

  useLayoutEffect(() => {
    if (textContainerRef.current) {
      const containerHeight = textContainerRef.current.clientHeight
      const lineHeight = parseFloat(
        getComputedStyle(textContainerRef.current).lineHeight
      )
      const lines = Math.ceil(containerHeight / lineHeight)
      console.log('lines', lines)
      setLinesNeeded(lines)
    }
  }, [review, width])

  return (
    <ReviewWrapper>
      <ReviewBlock>
        <ReviewWrapperBlock>
          <AvatarWrapper>
            <ReviewAvatarIcon width="3rem" />
          </AvatarWrapper>
          <ReviewUpperBlock>
            <ReviewUpperInnerBlock>
              <AuthorName>{title}</AuthorName>
              <LeftWrapper>
                <DatePosted>{date}</DatePosted>
                {userCreatedReview && (
                  <EditIcon
                    onClick={() => {
                      if (editingHandler !== undefined) editingHandler()
                    }}
                    width={'1.25rem'}
                    style={{ marginLeft: 'auto', cursor: 'pointer' }}
                  />
                )}
              </LeftWrapper>
            </ReviewUpperInnerBlock>
            <Rating value={rating} iconMargin={'0.25rem'} />
            <div style={{ position: 'relative' }}>
              <ReviewTextWrapper linesToShow={linesToShow} showMore={showMore}>
                <ReviewText ref={textContainerRef}>{review}</ReviewText>
              </ReviewTextWrapper>
              {linesNeeded > linesToShow && (
                <ShadowBlock onClick={() => setShowMore(!showMore)}>
                  {showMore ? 'Show Less' : 'Show More'}
                </ShadowBlock>
              )}
            </div>
          </ReviewUpperBlock>
        </ReviewWrapperBlock>

        {/*(Edugram Alfa) This component is hidden until you start working on this issue: 
          https://github.com/UGU-Academy/ugu/issues/290
        <UsefulBlock>
          <UsefulBlockText>
            {t('Did You Find This Review Helpful', { ns: 'review' })}
          </UsefulBlockText>
          <UsefulBlockButtons>
            <Button
              width={'4rem'}
              text={t('buttons.Yes')}
              borderColor={'#898B9B'}
              backgroundColor={'none'}
              border={`1px #898B9B solid`}
              color={'rgba(26,30,61,0.5)'}
              marginRight={'10px'}
            ></Button>
            <Button
              width={'4rem'}
              text={t('buttons.No')}
              borderColor={colors.uguRed}
              backgroundColor={'none'}
              color={'rgba(199,66,79,0.5)'}
              border={`1px ${colors.uguRed} solid`}
              marginRight={'0.7rem'}
            ></Button>
          </UsefulBlockButtons>
          <ComplainButton>{t('Complain', { ns: 'review' })}</ComplainButton>
        </UsefulBlock>*/}
      </ReviewBlock>
    </ReviewWrapper>
  )
}
export default CourseReviews
