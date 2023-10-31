import React, { useEffect, useState } from 'react'
import RoundedButton from 'components/atoms/Button'
import PlusIcon from 'public/static/icons/plus-icon'
import RoundButton from 'components/atoms/RoundButton'
import { BottomNotification, Course } from '@ugu/types'
import { useRouter } from 'next/router'
import { getAuthorCourses } from '@services/api/course'
import {
  Wrapper,
  TitleBackground,
  InnerWrapper,
  Title,
  ButtonsWrapper,
  CoursesWrapper,
  CoursesRow,
  AddCourse,
  AddCourseText,
  NotVerifiedNoticeWrapper,
  NotVerifiedNoticeRow,
  NotVerifiedNoticeCol,
  NotVerifiedNoticeIconWrapper,
} from '@styled_components/author/styled.components'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAuth } from '@hooks/useAuth'
import { colors } from '@configs/styles/config'
import { useTranslation } from 'react-i18next'
import CreateCourseCard from '@components/molecules/VerticalCourse/CreateCourseCard'
import { Card, Text, Button } from '@nextui-org/react'
import ShieldIcon from '@public/static/icons/shield-icon'
import { Loading } from '@nextui-org/react'
import deleteCourse from '@services/api/course/deleteCourse'
import PopUpBottom from '@components/organisms/PopUpBottom'

type Page = 'courses' | 'statistics'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        'footer',
        'author',
        'courses',
      ])),
    },
  }
}

const Author = () => {
  const router = useRouter()
  const { authState } = useAuth()
  const { t } = useTranslation(['common', 'author', 'footer'])

  const [page, setPage] = useState<Page>('courses')
  const [courses, setCourses] = useState<Course[]>([])
  const [bottomNotification, setBottomNotification] = useState<
    boolean | BottomNotification
  >(false)

  useEffect(() => {
    if (authState?.isAuthenticated) {
      if (authState?.user?.isAuthor) {
        const token = localStorage.getItem('tokenId')
        if (token) {
          getAuthorCourses()
            .then((courses) => {
              setCourses(courses)
            })
            .catch((err) => {
              console.log("Error fetching Author's Courses: ", err)
            })
        }
      } else {
        router.push('/author/become-author')
      }
    }
  }, [authState])
  useEffect(() => {
    if (!authState?.isAuthenticated && !authState?.isLoading) {
      router.push('/author/become-author', undefined, { shallow: true })
    }
  }, [authState, router])

  const deleteCourseHandler = async (courseId: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await deleteCourse(courseId)
        if (response) {
          setCourses((state) => state?.filter((s) => s._id !== courseId))
          setBottomNotification({
            message: t('course.courseDeleted', { ns: 'author' }),
            actionType: 'success',
          })
          resolve()
        } else {
          setBottomNotification({
            message: t('messages.Something went wrong', { ns: 'common' }),
            actionType: 'error',
          })
          reject()
        }
      } catch (err: any) {
        console.log(err)
        setBottomNotification({
          message: t('messages.Something went wrong', { ns: 'common' }),
          actionType: 'error',
        })
        reject()
      }
    })
  }
  const handleVerifyButton = () => {
    router.push(
      authState?.user?.isAuthor
        ? '/author/verification'
        : '/author/become-author'
    )
  }

  return (
    <Layout>
      <Wrapper>
        {authState?.isLoading ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '5rem',
              marginBottom: '5rem',
              gridColumnStart: 1,
              gridColumnEnd: -1,
            }}
          >
            <Loading />
          </div>
        ) : (
          authState?.isAuthenticated &&
          authState?.user?.isAuthor &&
          authState?.user.isAuthor && (
            <>
              <TitleBackground>
                <InnerWrapper>
                  <Title>{t('buttons.Author', { ns: 'author' })}</Title>
                  <ButtonsWrapper>
                    <RoundedButton
                      width="12.9rem"
                      height="2.9rem"
                      text={t('buttons.Courses', { ns: 'author' })}
                      backgroundColor={
                        page === 'courses' ? colors.uguBlue : '#E5E5E5'
                      }
                      opacity={page === 'courses' ? 1 : 0.5}
                      fontWeight="bold"
                      onClick={() => {
                        setPage('courses')
                      }}
                    />
                    <RoundedButton
                      width="12.9rem"
                      height="2.9rem"
                      text={t('buttons.Statistics', { ns: 'author' })}
                      backgroundColor={
                        page === 'statistics' ? colors.uguBlue : '#E5E5E5'
                      }
                      fontWeight="bold"
                      color="#1A1E3D"
                      opacity={page === 'statistics' ? 1 : 0.5}
                      marginLeft="2.1rem"
                      disabled={true}
                      onClick={() => {
                        setPage('statistics')
                      }}
                    />
                  </ButtonsWrapper>
                </InnerWrapper>
              </TitleBackground>
              <CoursesWrapper>
                {!authState.user?.isAuthorVerified && (
                  <NotVerifiedNoticeWrapper>
                    <Card variant="flat">
                      <Card.Body style={{ padding: '20px 30px' }}>
                        <NotVerifiedNoticeRow>
                          <NotVerifiedNoticeCol
                            style={{
                              flexGrow: 1,
                              paddingRight: 20,
                            }}
                          >
                            <NotVerifiedNoticeIconWrapper>
                              <ShieldIcon />
                            </NotVerifiedNoticeIconWrapper>
                            <Text>
                              {t('common.authorNotVerified', { ns: 'author' })}
                            </Text>
                          </NotVerifiedNoticeCol>
                          <NotVerifiedNoticeCol>
                            <Button onClick={handleVerifyButton}>
                              {t('buttons.Verify Now', { ns: 'author' })}
                            </Button>
                          </NotVerifiedNoticeCol>
                        </NotVerifiedNoticeRow>
                      </Card.Body>
                    </Card>
                  </NotVerifiedNoticeWrapper>
                )}
                <CoursesRow>
                  <AddCourse
                    disabled={
                      !authState.user?.isAuthor ||
                      (authState?.user?.isAuthor &&
                        !authState?.user?.isAuthorVerified &&
                        // @ts-ignore
                        authState?.user?.my_courses?.length > 1)
                    }
                    onClick={() =>
                      !authState.user?.isAuthor ||
                      (authState?.user?.isAuthor &&
                        !authState?.user?.isAuthorVerified &&
                        // @ts-ignore
                        authState?.user?.my_courses?.length > 1)
                        ? {}
                        : router.push('/create-course/new')
                    }
                  >
                    <RoundButton
                      color={colors.uguYellow}
                      textColor="#1A1E3D"
                      width="3rem"
                      height="3rem"
                    >
                      <PlusIcon width="1rem" height="1rem" />
                    </RoundButton>
                    <AddCourseText>
                      {t('buttons.Create Course', { ns: 'author' })}
                    </AddCourseText>
                  </AddCourse>
                  {courses?.length > 0 &&
                    courses.map((course, index) => (
                      <CreateCourseCard
                        key={course._id}
                        index={index}
                        course={course}
                        onDelete={deleteCourseHandler}
                      />
                    ))}
                </CoursesRow>
              </CoursesWrapper>
            </>
          )
        )}
        {bottomNotification && (
          <PopUpBottom
            setShowPopUp={setBottomNotification}
            bottomNotification={bottomNotification as BottomNotification}
          />
        )}
      </Wrapper>
    </Layout>
  )
}
export default Author
