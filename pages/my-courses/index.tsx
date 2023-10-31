// @ts-nocheck
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import MyCourse from '../../components/atoms/MyCourse'
import Button from '../../components/atoms/Button'
import IconText from '../../components/atoms/IconText'
import FilterIcon from '../../public/static/icons/filter-icon'
import ProgressIcon from '../../public/static/icons/progress-icon'
import CourseStatusIcon from '../../public/static/icons/course-status-icon'
import Link from 'next/link'
import { Course } from 'types/course'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAuth } from '@hooks/useAuth'
import { useRouter } from 'next/router'
import { useMyCourses } from '@contexts/MyCoursesContext'

const Body = styled.div`
  display: flex;
  flex-direction: column;
`
const TitleBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  width: 100%;
  margin-left: 0rem;
  flex-direction: column;
  max-width: 1424px;
  z-index: 1;
  height: 8rem;
  justify-content: space-around;
  background-color: #f8f8f8;
  margin-bottom: 1.5rem;
  &::before {
    content: '';
    display: flex;
    justify-content: center;
    width: 100vw;
    background-color: #f8f8f8;
    position: absolute;
    left: 0;
    z-index: 1;
    @media (min-width: 768px) {
      height: 8rem;
    }
  }
  @media (min-width: 768px) {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 8rem;
    padding: 0;
    margin-left: 0.5rem;
  }
`

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
  width: 100%;
  margin-left: 0.5rem;
  flex-direction: column;
  max-width: 1440px;
  @media (min-width: 768px) {
    align-items: flex-start;
    justify-content: center;
  }
  z-index: 2;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  font-weight: bold;
`

const MyCoursesArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
  justify-content: space-between;
`

const GroupedButtons = styled.div`
  display: flex;
`

const FilterButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  width: 100%;
`

const TotalCoursesQty = styled.div`
  font-weight: bold;
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1.125rem;
  margin-top: 2rem;
`

const MyCoursesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: 2rem;
`

// const BackgroundColorFixed = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100vw;
//   height: 18vh;
//   position: absolute;
//   background-color: #f8f8f8;
//   top: 4rem;
//   left: 0;
//   padding: 0 5vw;
// `
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        '404',
        'myCourses',
        'courses',
        'footer',
      ])),
    },
  }
}

const MyCourses = () => {
  const { t } = useTranslation(['common', 'myCourses', 'footer'])

  const { myCourses, progress } = useMyCourses()

  const getMyCourses = () => {
    return myCourses.map((course) => {
      return (
        <MyCourse
          key={'my-course-' + course._id}
          marginBottom={'3rem'}
          course={course}
          progress={progress}
        ></MyCourse>
      )
    })
  }

  const {
    authState: { isAuthenticated, isLoading },
  } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push({ pathname: '/', query: { showAuth: 'true' } })
    }
  }, [isLoading, isAuthenticated])

  return (
    isAuthenticated && (
      <Layout>
        <Body>
          {/* <BackgroundColorFixed> */}
          <TitleBackground>
            <InnerWrapper>
              <Title>{t('My Courses', { ns: 'myCourses' })}</Title>
            </InnerWrapper>
          </TitleBackground>
          {/* </BackgroundColorFixed> */}
          <MyCoursesArea>
            <GroupedButtons>
              <Link href="/my-courses">
                <Button
                  backgroundColor="rgba(107,181,201,0.07)"
                  padding="0 1rem"
                  marginRight="1rem"
                >
                  {t('My Courses', { ns: 'myCourses' })}
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button opacity={0.24} padding="0 1rem" marginRight="1rem">
                  {t('Wishlist', { ns: 'myCourses' })}
                </Button>
              </Link>
            </GroupedButtons>
            {false ? (
              <FilterButtonsWrapper>
                <Button
                  border={'1px solid rgba(151,151,151,0.16)'}
                  backgroundColor="none"
                  borderRadius="6px"
                  width="12rem"
                  height="2.5rem"
                  marginRight="2rem"
                  marginLeft="0rem"
                  justifyContent="flex-start"
                  padding="0 1rem"
                >
                  <IconText
                    text={t('buttons.Filter')}
                    icon={<FilterIcon></FilterIcon>}
                    iconHeight={'0.8rem'}
                    fontSize="0.875rem"
                    marginBetween="0.5rem"
                    opacity="1"
                  ></IconText>
                </Button>
                <Button
                  border={'1px solid rgba(151,151,151,0.16)'}
                  backgroundColor="none"
                  borderRadius="6px"
                  width="12rem"
                  height="2.5rem"
                  marginRight="2rem"
                  marginLeft="0rem"
                  justifyContent="flex-start"
                  padding="0 1rem"
                >
                  <IconText
                    text={t('buttons.Progress')}
                    icon={<ProgressIcon></ProgressIcon>}
                    iconHeight={'0.8rem'}
                    fontSize="0.875rem"
                    marginBetween="0.5rem"
                    opacity="1"
                  ></IconText>
                </Button>
                <Button
                  border={'1px solid rgba(151,151,151,0.16)'}
                  backgroundColor="none"
                  borderRadius="6px"
                  width="12rem"
                  height="2.5rem"
                  marginRight="2rem"
                  marginLeft="0rem"
                  justifyContent="flex-start"
                  padding="0 1rem"
                >
                  <IconText
                    text={t('buttons.Status')}
                    icon={<CourseStatusIcon></CourseStatusIcon>}
                    iconHeight={'0.8rem'}
                    fontSize="0.875rem"
                    marginBetween="0.5rem"
                    opacity="1"
                  ></IconText>
                </Button>
                <Button
                  marginLeft="auto"
                  text={t('buttons.Apply')}
                  backgroundColor="#C7424F"
                  color="#ffffff"
                  width="8rem"
                ></Button>
              </FilterButtonsWrapper>
            ) : (
              <></>
            )}
            {/* <TotalCoursesQty>You have {} Course(s)</TotalCoursesQty>
          </FilterButtonsWrapper> */}
            <TotalCoursesQty>
              {t('You Have', { ns: 'myCourses' })}
              {myCourses.length}&nbsp;
              {t('course(s)', { ns: 'myCourses' })}
            </TotalCoursesQty>
            <MyCoursesWrapper>{getMyCourses()}</MyCoursesWrapper>
            {/* <MyCourse marginBottom={'3rem'}></MyCourse>
          </Link>
        </GroupedButtons>
        <FilterButtonsWrapper>
          <Button
            border={'1px solid rgba(151,151,151,0.16)'}
            backgroundColor="none"
            borderRadius="6px"
            width="12rem"
            height="2.5rem"
            marginRight="2rem"
            marginLeft="0rem"
            justifyContent="flex-start"
            padding="0 1rem"
          >
            <IconText
              text="Filter"
              icon={<FilterIcon></FilterIcon>}
              iconHeight={'0.8rem'}
              fontSize="0.875rem"
              marginBetween="0.5rem"
              opacity="1"
            ></IconText>
          </Button>
          <Button
            border={'1px solid rgba(151,151,151,0.16)'}
            backgroundColor="none"
            borderRadius="6px"
            width="12rem"
            height="2.5rem"
            marginRight="2rem"
            marginLeft="0rem"
            justifyContent="flex-start"
            padding="0 1rem"
          >
            <IconText
              text="Progress"
              icon={<ProgressIcon></ProgressIcon>}
              iconHeight={'0.8rem'}
              fontSize="0.875rem"
              marginBetween="0.5rem"
              opacity="1"
            ></IconText>
          </Button>
          <Button
            border={'1px solid rgba(151,151,151,0.16)'}
            backgroundColor="none"
            borderRadius="6px"
            width="12rem"
            height="2.5rem"
            marginRight="2rem"
            marginLeft="0rem"
            justifyContent="flex-start"
            padding="0 1rem"
          >
            <IconText
              text="Status"
              icon={<CourseStatusIcon></CourseStatusIcon>}
              iconHeight={'0.8rem'}
              fontSize="0.875rem"
              marginBetween="0.5rem"
              opacity="1"
            ></IconText>
          </Button>
          <Button
            marginLeft="auto"
            text="Apply"
            backgroundColor={colors.uguRed}
            color="#ffffff"
            width="8rem"
          ></Button>
        </FilterButtonsWrapper>
        <TotalCoursesQty>You have 6 Courses</TotalCoursesQty>
        {getMyCourses()}
        {/* <MyCourse marginBottom={'3rem'}></MyCourse>
        <MyCourse marginBottom={'3rem'}></MyCourse>
        <MyCourse marginBottom={'3rem'}></MyCourse>
        <MyCourse marginBottom={'3rem'}></MyCourse>
        <MyCourse marginBottom={'3rem'}></MyCourse>
        <MyCourse marginBottom={'3rem'}></MyCourse>
        <MyCourse marginBottom={'3rem'}></MyCourse> */}
          </MyCoursesArea>
        </Body>
      </Layout>
    )
  )
}

export default MyCourses
