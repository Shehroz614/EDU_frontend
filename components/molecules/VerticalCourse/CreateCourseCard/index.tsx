// @ts-nocheck
import React, { useCallback, useRef, useState } from 'react'
import { colors } from '@configs/styles/config'
import Button from '@components/atoms/Button'
import { useRouter } from 'next/router'
import { Course } from '@ugu/types'
import Image from 'next/image'
import {
  CourseContainer,
  CourseInfoContainer,
  CourseTitle,
  AuthorReviewBlockWrapper,
  CourseAuthor,
  CoursePrice,
  EditWindow,
  EditButtonsWrapper,
  PriceWrapper,
  OriginalPrice,
  BottomWrapper,
  BadgesOnImage,
  BadgeTop,
  ColoredCircle,
  LoaderWrapper,
} from '../styled.components'
import CartModal from '@components/organisms/CartModal'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getLatestVersionIndexes } from '@utils/getLatestVersionsIndexes'
import Loader from '@components/organisms/Loader'

type CreateCourseCardProps = {
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  marginTop?: string
  course: Course
  onEdit?: () => {}
  onDelete?: (courseId: string) => Promise<void>
  index: number
}

const CreateCourseCard: React.FC<CreateCourseCardProps> = (props) => {
  const {
    course,
    marginLeft = '',
    marginBottom = '20px',
    marginTop = '',
    marginRight = '',
    index,
    onDelete,
  } = props
  const { t } = useTranslation(['common', 'courses'])
  const router = useRouter()
  const courseRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  const getLastVersion = useCallback(() => {
    const maxVersion = Math.max(...Object.keys(course.versions).map(Number))
    return course.versions[maxVersion]
  }, [course])
  //return three last versions after live

  const { lastDraftIndex, lastLiveIndex, lastReviewIndex } =
    getLatestVersionIndexes(Object.values(course.versions))

  const lastVersion = getLastVersion()

  //returns proper badge for inReview, approved or rejected group
  const getInReviewBadge = useCallback(() => {
    if (lastReviewIndex === -1) return
    else {
      switch (course.versions[lastReviewIndex + 1].status) {
        case 'approved':
          return (
            <BadgeTop>
              <ColoredCircle colors={colors.uguGreen}></ColoredCircle>
              {t('strings.Approved', {
                ns: 'courses',
              })}
            </BadgeTop>
          )
        case 'rejected':
          return (
            <BadgeTop>
              <ColoredCircle colors={colors.uguRed}></ColoredCircle>
              {t('strings.Rejected', {
                ns: 'courses',
              })}
            </BadgeTop>
          )
        case 'inReview':
          return (
            <BadgeTop>
              <ColoredCircle colors={colors.uguBlue}></ColoredCircle>
              {t('strings.In-review', {
                ns: 'courses',
              })}
            </BadgeTop>
          )
      }
    }
  }, [course.versions, lastReviewIndex, t])

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

  const handleDelete = async () => {
    setIsLoading(true)
    await onDelete(course._id)
    setIsLoading(false)
  }

  const getCoursePrice = () => {
    const price =
      lastLiveIndex !== -1
        ? Object.values(course.versions)?.[lastLiveIndex]?.price
        : lastVersion.price
    const salePrice =
      lastLiveIndex !== -1
        ? Object.values(course.versions)?.[lastLiveIndex]?.salePrice
        : lastVersion.salePrice
    return {
      price,
      salePrice,
    }
  }

  console.log(lastVersion.title, getCoursePrice())

  return (
    <CourseContainer
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginTop={marginTop}
      ref={courseRef}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{ height: 338 }}
    >
      <Link
        href={{ pathname: '/course-page', query: { id: course?._id } }}
        style={{ height: '50%', position: 'relative' }}
      >
        <BadgesOnImage>
          {lastLiveIndex !== -1 && (
            <BadgeTop>
              <ColoredCircle colors={colors.uguGreen}></ColoredCircle>
              {t('strings.Live', {
                ns: 'courses',
              })}
            </BadgeTop>
          )}
          {getInReviewBadge()}
          {lastDraftIndex !== -1 && (
            <BadgeTop>
              <ColoredCircle colors={colors.uguWhite}></ColoredCircle>
              {t('strings.Draft', {
                ns: 'courses',
              })}
            </BadgeTop>
          )}
        </BadgesOnImage>
        <Image
          src={lastVersion?.presentationalImage || ''}
          alt="Course Image"
          width={300}
          height={300}
          style={imageStyle}
          onError={() => {
            lastVersion.presentationalImage = '/static/images/placeholder.svg'
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
      <CourseInfoContainer>
        <Link
          href={{ pathname: '/course-page', query: { id: course?._id } }}
          style={{ textDecoration: 'none' }}
        >
          <CourseTitle>
            {lastVersion.title || 'New Course ' + index + 1}
          </CourseTitle>
        </Link>
        <AuthorReviewBlockWrapper>
          <CourseAuthor>
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
        <BottomWrapper style={{ marginTop: 'auto' }}>
          <PriceWrapper>
            <CoursePrice>
              {((getCoursePrice()?.salePrice || getCoursePrice()?.price) / 100)
                .toFixed(2)
                .replace(/\.00$/, '') + ' USD'}
            </CoursePrice>
            {getCoursePrice()?.salePrice < getCoursePrice()?.price && (
              <OriginalPrice>
                {(getCoursePrice()?.price / 100)
                  .toFixed(2)
                  .replace(/\.00$/, '') + ' USD'}
              </OriginalPrice>
            )}
          </PriceWrapper>
        </BottomWrapper>
      </CourseInfoContainer>
      {!isLoading && isHovered && (
        <EditWindow>
          <EditButtonsWrapper>
            <Button
              text={t('buttons.Edit', { ns: 'common' })}
              width="4.5rem"
              marginRight="0.5rem"
              backgroundColor={colors.uguYellow}
              color="white"
              onClick={() => router.push('/create-course/' + course?._id)}
            />
            {lastLiveIndex == -1 && lastReviewIndex == -1 ? (
              <Button
                text={t('buttons.Delete', { ns: 'common' })}
                width="4.5rem"
                backgroundColor={colors.uguPurple}
                color="white"
                onClick={handleDelete}
              />
            ) : (
              lastLiveIndex != -1 && (
                <Button
                  text="View"
                  width="4.5rem"
                  backgroundColor={colors.uguPurple}
                  color="white"
                  onClick={() => {
                    router.push('/course-page?id=' + course?._id)
                  }}
                />
              )
            )}
          </EditButtonsWrapper>
        </EditWindow>
      )}
      {isLoading && (
        <EditWindow>
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        </EditWindow>
      )}
      {showCheckoutModal && (
        <CartModal onClose={() => setShowCheckoutModal(false)} />
      )}
    </CourseContainer>
  )
}
export default CreateCourseCard
