import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@components/organisms/Layouts/WithoutSidebar'
import { Loading } from '@nextui-org/react'
import {
  PageHeader,
  PageHeaderTitle,
  FilterButtons,
  CategoryContentWrapper,
  FilterCheckboxesWrapper,
  FilterHeader,
  CategorMainWrapper,
  FilterHeaderWrapper,
  ClearFilters,
} from '@styled_components/courses/styled.components'

import HorizontalCoursesSection from '@components/molecules/HorizontalCoursesSection'

import CategorySidebarFilter from '@components/molecules/CategorySidebarFilter'

import Price from '@components/atoms/CategorySidebarPrice'
import Duration from '@components/atoms/CategorySidebarDuration'
import Topic from '@components/atoms/CategorySidebarTopic'
import Subcategory from '@components/atoms/CategorySidebarSubcategory'
import Category from '@components/atoms/CategorySidebarCategory'
import Difficulty from '@components/atoms/CategorySidebarDifficulty'

import SortBy from '@components/atoms/SortBy'
import Rating from '@components/atoms/Rating'

import { useRouter } from 'next/router'

import {
  getEmptyFilters,
  convertToFilters,
  getBreadCrumbs,
  convertToURL,
  setPrice,
  setRating,
  addCategory,
  removeCategory,
  getSubCategories,
  addSubCategory,
  removeSubCategory,
  getCategory,
  getTopics,
  getSubCategory,
  removeTopic,
  addTopic,
  addDifficulty,
  removeDifficulty,
} from '@helpers/searchHelper'
import { ShortCourse } from '@type/course'
import { isEmpty } from 'lodash'
import { difference } from '@helpers/difference'
import getCategories from '@services/api/category/getCategories'
import { Category as CategoryType, Filters } from '@type/main'

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'courses',
        'footer',
      ])),
    },
  }
}

const Courses2: NextPage = () => {
  const [query, setQuery] = useState<string>('')
  const [filters, setFilters] = useState<Filters>(getEmptyFilters())
  const [sort, setSort] = useState<Object>({})
  const [tm, setTm] = useState<ReturnType<typeof setTimeout>>(
    setTimeout(() => {}, 1)
  )
  const [tmURL, setTmURL] = useState<ReturnType<typeof setTimeout>>(
    setTimeout(() => {}, 1)
  )
  const [results] = useState<ShortCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [oldPrice, setOldPrice] = useState<Object>({ min: 0, max: 0 })
  const [minPrice, setMinPrice] = useState<number>(Number.MAX_SAFE_INTEGER)
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [durationSelection, setDurationSelection] = useState<number>(-1)
  const [headers] = useState<any>([])

  const getCategoriesAPI = async () => {
    setCategories(await getCategories())
  }

  const router = useRouter()
  const searchObject = router.query.searchObject || []

  useEffect(() => {
    setQuery(searchObject[0])
    try {
      setFilters(convertToFilters(JSON.parse(searchObject[1])))
    } catch (err) {
      console.log(err)
      setFilters(getEmptyFilters())
    }
    setSort(JSON.parse(searchObject[2] || ''))
  }, [searchObject])

  useEffect(() => {
    clearTimeout(tm)
    setIsLoading(true)
    setTm(
      setTimeout(async () => {
        // const apiRes = await getResults(query, filters, sort)
        // setResults(apiRes.data)
        // setHeaders(apiRes.headers)
        // setIsLoading(false)
      }, 1500)
    )
  }, [query, filters, sort])

  useEffect(() => {
    //TODO min price and max price
    if (isEmpty(difference(oldPrice, filters.price))) {
      results.forEach((result) => {
        if (result.price < minPrice) {
          setMinPrice(result.price)
        }
        if (result.price > maxPrice) {
          setMaxPrice(result.price)
        }
      })
    }
    setOldPrice(filters.price)
  }, [filters, results])

  useEffect(() => {
    getCategoriesAPI()
  }, [])

  useEffect(() => {
    switch (durationSelection) {
      case 0:
      case 1:
      case 2:
      case 3:
    }
  }, [durationSelection])

  const changeURL = (
    queryCurr: string,
    filtersCurr: Filters,
    sortCurr: Object
  ) => {
    clearTimeout(tmURL)
    setTmURL(
      setTimeout(async () => {
        await router.push(
          {
            pathname: convertToURL(queryCurr, filtersCurr, sortCurr),
            query: {},
          },
          undefined,
          { shallow: true }
        )
      }, 200)
    )
  }

  const changeSort = (newSort: Object) => {
    setSort(newSort)
    changeURL(query, filters, newSort)
  }

  const changePrice = (price: { min: number; max: number }) => {
    const newFilters = setPrice(filters, price)
    changeURL(query, newFilters, sort)
  }

  const changeRating = (rating: number) => {
    const newFilters = setRating(filters, rating)
    changeURL(query, newFilters, sort)
  }

  const clearFilters = () => {
    setFilters(getEmptyFilters())
    changeURL(query, getEmptyFilters(), sort)
  }

  const addCategoryHandler = (id: string) => {
    const newFilters = addCategory(filters, id)
    changeURL(query, newFilters, sort)
  }

  const removeCategoryHandler = (id: string) => {
    let newFilters = removeCategory(filters, id)
    getCategory(categories, id).children.forEach((item) => {
      newFilters = removeSubCategory(newFilters, item._id)
      getSubCategory(categories, item._id).children.forEach((topic) => {
        newFilters = removeTopic(newFilters, topic._id)
      })
    })
    changeURL(query, newFilters, sort)
  }

  const addSubCategoryHandler = (id: string) => {
    const newFilters = addSubCategory(filters, id)
    changeURL(query, newFilters, sort)
  }

  const removeSubCategoryHandler = (id: string) => {
    let newFilters = removeSubCategory(filters, id)
    getSubCategory(categories, id).children.forEach((item) => {
      newFilters = removeTopic(newFilters, item._id)
    })
    changeURL(query, newFilters, sort)
  }

  const addTopicHandler = (id: string) => {
    const newFilters = addTopic(filters, id)
    changeURL(query, newFilters, sort)
  }

  const removeTopicHandler = (id: string) => {
    const newFilters = removeTopic(filters, id)
    changeURL(query, newFilters, sort)
  }

  const addDifficultyHandler = (difficulty: string) => {
    const newFilters = addDifficulty(filters, difficulty)
    changeURL(query, newFilters, sort)
  }

  const removeDifficultyHandler = (difficulty: string) => {
    const newFilters = removeDifficulty(filters, difficulty)
    changeURL(query, newFilters, sort)
  }

  return (
    <Layout>
      {/* <div>
                Query: {query}<br/>
                Filters: {JSON.stringify(filters)}<br/>
                Sort: {JSON.stringify(sort)}<br/>
            </div> */}
      <PageHeader>
        <PageHeaderTitle>
          {getBreadCrumbs(filters, query, headers['x-total'], categories)}
        </PageHeaderTitle>
      </PageHeader>
      <FilterButtons>{/* <GroupedButtons></GroupedButtons> */}</FilterButtons>
      <CategoryContentWrapper>
        <FilterCheckboxesWrapper>
          <FilterHeaderWrapper>
            <FilterHeader>Filter</FilterHeader>
            <ClearFilters onClick={clearFilters}>Clear All</ClearFilters>
          </FilterHeaderWrapper>

          <CategorySidebarFilter filterName="Price" defaultShow={true}>
            <Price
              changePrice={changePrice}
              limits={{ min: 0, max: 9999999 }}
              price={filters.price}
            />
          </CategorySidebarFilter>

          <CategorySidebarFilter filterName="Rating" defaultShow={true}>
            <Rating
              value={filters.rating}
              iconMargin={'0.5rem'}
              onValueChange={changeRating}
              showNumber={true}
              readOnly={false}
              style={{ marginLeft: '1rem' }}
            />
          </CategorySidebarFilter>

          <CategorySidebarFilter filterName="Duration">
            <Duration
              durationSelection={durationSelection}
              setDurationSelection={setDurationSelection}
            />
          </CategorySidebarFilter>

          <CategorySidebarFilter filterName="Category">
            <Category
              addCategory={addCategoryHandler}
              removeCategory={removeCategoryHandler}
              categories={categories}
              selectedCategories={filters.category}
            />
          </CategorySidebarFilter>

          {filters.category.length > 0 ? (
            <CategorySidebarFilter filterName="Subcategory">
              <Subcategory
                subCategories={getSubCategories(categories, filters.category)}
                addSubCategory={addSubCategoryHandler}
                removeSubCategory={removeSubCategoryHandler}
                selectedSubCategories={filters.subCategory}
              />
            </CategorySidebarFilter>
          ) : null}
          {filters.subCategory.length > 0 ? (
            <CategorySidebarFilter filterName="Topic">
              <Topic
                topics={getTopics(categories, filters.subCategory)}
                addTopic={addTopicHandler}
                removeTopic={removeTopicHandler}
                selectedTopics={filters.topic}
              />
            </CategorySidebarFilter>
          ) : null}
          {/* <CategorySidebarFilter filterName="Language">
                    <Language />
                </CategorySidebarFilter> */}

          <CategorySidebarFilter filterName="Level">
            <Difficulty
              selectedDifficulties={filters.difficulty}
              addDifficultyHandler={addDifficultyHandler}
              removeDifficultyHandler={removeDifficultyHandler}
            />
          </CategorySidebarFilter>
        </FilterCheckboxesWrapper>
        <CategorMainWrapper>
          <SortBy sort={sort} setSort={changeSort} />
          <br />
          <br />
          <br />
          {isLoading ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '5rem',
              }}
            >
              <Loading />
            </div>
          ) : (
            <HorizontalCoursesSection
              title=""
              pagination={true}
              courses={results || []}
            />
          )}
          <br />
        </CategorMainWrapper>
      </CategoryContentWrapper>
    </Layout>
  )
}

export default Courses2
