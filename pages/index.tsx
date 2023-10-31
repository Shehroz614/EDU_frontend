import React, { useEffect, useState } from 'react'
import BodyWrapper from '../components/atoms/Body'
import VerticalCourse from '../components/molecules/VerticalCourse'
import CourseWrapper from '../components/atoms/CourseWrapper'
import GroupedCourses from '../components/atoms/GroupedCourses'
import styled from '@emotion/styled'
import GroupedButtons from '../components/molecules/GroupedButtons'

import { useRouter } from 'next/router'
import LoginModal from '@components/organisms/LoginModal'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAuth } from '@hooks/useAuth'
import { ShortCourse } from '@type/course'
import { getEmptyFilters, getResults } from '@helpers/searchHelper'

import { Loading } from '@nextui-org/react'

import MyCousesSection from '@components/molecules/MyCousesSection/MyCousesSection'

import { debounce, isEmpty, isEqual, isUndefined } from 'lodash'
import { ParsedUrlQuery } from 'querystring'
import { Filters } from '@type/index'
import SubCategoriesBlock from '@components/pages/home/SubCategoriesBlock'

const CourseSectionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
`

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'home',
        'authentication',
        'footer',
        'courses',
        'signUp',
        'home',
      ])),
    },
  }
}

// Helper Components
const getTopCoursesComponents = (results: ShortCourse[]) => {
  return (
    <>
      {results.map((course) => (
        <VerticalCourse key={course._id} course={course} />
      ))}
    </>
  )
}

const NoCoursesFound = () => {
  return (
    <h3
      style={{
        fontSize: '1.3rem',
        color: '#888',
        margin: 'auto',
        marginTop: '5rem',
        marginBottom: '5rem',
        gridColumnStart: 1,
        gridColumnEnd: -1,
      }}
    >
      No courses found
    </h3>
  )
}

const LoadingComponent = () => (
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
)

const Home = () => {
  // Home page states
  const [category, setCategory] = useState<string>('')
  const [results, setResults] = useState<ShortCourse[]>([])
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [routerQuery, setRouterQuery] = useState<ParsedUrlQuery>({ hi: 'hi' })
  const [filters, setFilters] = useState<Filters>(getEmptyFilters())
  const sort = { 'meta.rating': 1 }
  const [isLoading, setIsLoading] = useState(true)
  const [total, setTotal] = useState(0)
  let pageCnt = 0

  let isFetchingNewCourses = false
  // Contexts for the home page
  const { authState } = useAuth()
  const router = useRouter()

  const { showAuth } = router.query

  // Helper Functions
  const getCourses = async (
    searchQuery: string,
    filters: Filters,
    sort: {}
  ) => {
    pageCnt = 0
    setIsLoading(true)
    const apiRes = await getResults(searchQuery, filters, sort)
    console.log(apiRes.headers)
    setTotal(apiRes.headers['x-total'])
    setResults(apiRes.data)
    setIsLoading(false)
  }

  const fastCategorySelect = async () => {
    /***********************************************
    This function is helping users find best courses
    from each category by simply clicking on it from
    the home page.

    Fast category search ignores search query and filters.
    It's primary goal is to give TOP courses from selected 
    category.
    ***********************************************/
    pageCnt = 0
    setIsLoading(true)
    const tempFilters = getEmptyFilters()
    tempFilters.category.push(category)
    const fastApiRes = await getResults('', tempFilters, { 'meta.rating': 1 })
    setResults(fastApiRes.data)
    setIsLoading(false)
  }

  // Home useEffects

  useEffect(() => {
    /***********************************************
    This useEffect utilizes fastCategorySelect function.
    
    It is initiated if user slects new category and it
    is not empty.

    See fastCategorySelect() description above ^^^
    ***********************************************/
    if (category.trim().length != 0) fastCategorySelect()
  }, [category])

  useEffect(() => {
    /***********************************************
    This useEffect is initiated each time user loads the page.

    If user was redirected from protected page to the 
    home page, this useEffect will open login modal.
    ***********************************************/
    if (!authState.isAuthenticated && router.isReady) {
      setShowLoginModal(showAuth === 'true')
    }
  }, [router.isReady])

  useEffect(() => {
    /***********************************************
    This useEffect is used to load data from URl.

    User should be able to share their search results.
    So filters, sort and search query should be loaded
    from URL if they are present.

    It takes info from url query and fills states from
    them.
    ***********************************************/
    if (!isEqual(routerQuery, router.query)) {
      if (isEmpty(router.query.filters)) {
        const newQuery = decodeURIComponent(
          (router.query.search || '')?.toString()
        ).trim()
        setSearchQuery(newQuery)
        const newFilters = JSON.parse(JSON.stringify(filters))
        if (JSON.parse(router.query.category?.toString() || '[]').length != 0) {
          newFilters.category = JSON.parse(
            router.query.category?.toString() || '[]'
          )
        } else {
          newFilters.category = []
        }
        if (
          JSON.parse(router.query.subCategory?.toString() || '[]').length != 0
        ) {
          newFilters.subCategory = JSON.parse(
            router.query.subCategory?.toString() || '[]'
          )
        } else {
          newFilters.subCategory = []
        }
        if (!isEqual(newFilters, filters)) {
          setFilters(newFilters)
        }

        getCourses(newQuery, newFilters, sort)
      } else {
        let newFilters = JSON.parse(JSON.stringify(filters))
        if (!isUndefined(router.query.filters)) {
          newFilters = JSON.parse(router.query.filters?.toString())
        }
        setFilters(newFilters)
        getCourses(searchQuery, newFilters, sort)
      }
      setRouterQuery(router.query)
    }
  }, [router.query])

  useEffect(() => {
    console.log('User from Context in Header:', authState.user)
    if (authState.isAuthenticated && showLoginModal) {
      setShowLoginModal(false)
    }
  }, [authState.isAuthenticated, authState.user, showLoginModal])

  const onScroll = async () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = window.innerHeight
    const elementTop = document.getElementById('moreCoursesTrigger')?.offsetTop

    if (
      scrollTop + scrollHeight + 15 > (elementTop || 0) &&
      !isLoading &&
      !isFetchingNewCourses &&
      results.length < total &&
      pageCnt + 1 < total / 20
    ) {
      isFetchingNewCourses = true
      const apiRes = await getResults(searchQuery, filters, sort, pageCnt + 1)
      setTotal(apiRes.headers['x-total'])
      setResults([...results, ...apiRes.data])
      pageCnt += 1
      isFetchingNewCourses = false
    }
  }

  // Debounce the onScroll function
  const debouncedOnScroll = debounce(onScroll, 350)

  useEffect(() => {
    window.addEventListener('scroll', debouncedOnScroll)
    return () => {
      window.removeEventListener('scroll', debouncedOnScroll) // Cleanup
    }
  }, [isLoading])

  return (
    <Layout>
      <BodyWrapper>
        <CourseWrapper>
          <CourseSectionButtons>
            {!isEmpty(router.query.filters) ? (
              <div
                style={{
                  border: '1px solid black',
                  borderRadius: 20,
                  padding: '7px 16px',
                  fontSize: 16,
                  minWidth: 'max-content',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}
              >
                {total} Filtered Results
                <div
                  style={{
                    marginLeft: 15,
                    borderRadius: '50%',
                    background: '#F0F0F0',
                    cursor: 'pointer',
                    width: 19,
                    height: 19,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => {
                    window.location.href = '/'
                  }}
                >
                  &#215;
                </div>
              </div>
            ) : filters.category.length == 0 ? (
              searchQuery.trim().length == 0 ? (
                <GroupedButtons setCategory={setCategory}></GroupedButtons>
              ) : (
                <div
                  style={{
                    border: '1px solid black',
                    borderRadius: 20,
                    padding: '7px 16px',
                    fontSize: 16,
                    minWidth: 'max-content',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  {isLoading ? '' : total} Results for &quot;
                  <b>{searchQuery.trim()}</b>&quot;
                  <div
                    style={{
                      marginLeft: 15,
                      borderRadius: '50%',
                      background: '#F0F0F0',
                      cursor: 'pointer',
                      width: 19,
                      height: 19,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => {
                      router.push('/')
                    }}
                  >
                    &#215;
                  </div>
                </div>
              )
            ) : (
              <SubCategoriesBlock filters={filters} setFilters={setFilters} />
            )}
          </CourseSectionButtons>
          <GroupedCourses>
            {isLoading ? (
              <LoadingComponent />
            ) : results?.length > 0 ? (
              <>{getTopCoursesComponents(results)}</>
            ) : (
              <NoCoursesFound />
            )}

            {authState.isAuthenticated && (
              <MyCousesSection max={3}></MyCousesSection>
            )}
          </GroupedCourses>
        </CourseWrapper>
        <div id="moreCoursesTrigger"></div>
        {showLoginModal && (
          <LoginModal
            onClose={() => {
              setShowLoginModal(false)
            }}
          />
        )}
      </BodyWrapper>
    </Layout>
  )
}

export default Home
