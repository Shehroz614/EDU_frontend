import { ShortCourse } from '@type/course'
import axios from 'axios'
import { Category, Filters } from '@type/main'
import styled from '@emotion/styled'
import routes from '@configs/api'

const CategoryLink = styled.span`
  text-decoration: none;
  color: #666;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    color: black;
  }
`

export const getEmptyFilters = (): Filters => {
  const emptyFilters: Filters = {
    price: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
    },
    rating: 0,
    duration: {
      min: 0,
      max: null,
    },
    category: [],
    subCategory: [],
    topic: [],
    language: [],
    difficulty: [],
  }

  return emptyFilters
}

export const convertToFilters = (obj: any): Filters => {
  const filters: Filters = {
    price: {
      min: obj?.price?.min || 0,
      max:
        obj?.price?.max ||
        (obj?.price?.max !== 0 ? Number.MAX_SAFE_INTEGER : 0),
    },
    rating: obj?.rating || 0,
    duration: {
      min: obj?.duration?.min || 0,
      max: obj?.duration?.min || Number.MAX_SAFE_INTEGER,
    },
    category: obj?.category || [],
    subCategory: obj?.subCategory || [],
    topic: obj?.topic || [],
    language: obj?.language || [],
    difficulty: obj?.difficulty || [],
  }

  console.log('obj', obj)

  return filters
}

export const getBreadCrumbs = (
  filters: Filters,
  query: string,
  resultsQnt = 0,
  categories: Category[]
): any => {
  const clickHandle = (categories: Category[], id: string, type: string) => {
    let filters = getEmptyFilters()
    if (type === 'category') {
      filters = addCategory(filters, id)
    }
    if (type === 'subCategory') {
      filters = addCategory(filters, getSubCategory(categories, id).parent)
      filters = addSubCategory(filters, id)
    }
    if (type === 'topic') {
      filters = addCategory(
        filters,
        getSubCategory(categories, getTopic(categories, id).parent).parent
      )
      filters = addSubCategory(filters, getTopic(categories, id).parent)
      filters = addTopic(filters, id)
    }
    window.location.replace(convertToURL(' ', filters, { 'meta.rating': 1 }))
  }

  let breadCrumbs = <div>Courses</div>
  if (query.trim().length != 0 && filters.category.length == 0) {
    breadCrumbs = (
      <div>{`Search: "${query}" (${resultsQnt} result${
        resultsQnt == 1 ? '' : 's'
      })`}</div>
    )
  } else {
    if (filters.category.length == 1) {
      breadCrumbs = (
        <CategoryLink
          onClick={() => {
            clickHandle(categories, filters.category[0], 'category')
          }}
        >
          {getCategory(categories, filters.category[0])?.name?.en}
        </CategoryLink>
      )
      if (filters.subCategory.length == 1) {
        breadCrumbs = (
          <span>
            {breadCrumbs}
            <span style={{ color: '#666' }}> / </span>
            <CategoryLink
              onClick={() => {
                clickHandle(categories, filters.subCategory[0], 'subCategory')
              }}
            >
              {getSubCategory(categories, filters.subCategory[0])?.name?.en}
            </CategoryLink>
          </span>
        )
        if (filters.topic.length == 1) {
          breadCrumbs = (
            <div style={{ width: 'max-content' }}>
              {breadCrumbs}
              <span style={{ color: '#666' }}> / </span>
              <CategoryLink
                onClick={() => {
                  clickHandle(categories, filters.topic[0], 'topic')
                }}
              >
                {getTopic(categories, filters.topic[0])?.name?.en}
              </CategoryLink>
            </div>
          )
        }
      }
    }
  }
  return breadCrumbs
}

export const getEmptyFiltersURL = (): string => {
  return `/{}/{ "meta.rating": 1 }`
}

export const getQueryFromURL = (url: string): string => {
  if (url.split('/')[1] === 'courses2') {
    return decodeURIComponent(
      url.split('/')[2]?.split('%2F')?.join('/')?.split('.').join(' ')
    )
  } else {
    return ''
  }
}

const filterCategoryCleaner = (filters: Filters): Filters => {
  const newFilters = JSON.parse(JSON.stringify(filters))

  if (newFilters.subCategory.length > 0) {
    newFilters.category = []
  }
  if (newFilters.topic.length > 0) {
    newFilters.subCategory = []
  }

  return newFilters
}

export const getResults = (
  query: string,
  filters: Filters,
  sort: Object,
  page = 0
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const URL = `${routes.COURSES}?search=${query.trim()}&filters=${
      filters
        ? encodeURIComponent(JSON.stringify(filterCategoryCleaner(filters)))
        : '{}'
    }&limit=20&page=${page}&sort=${encodeURIComponent(JSON.stringify(sort))}`
    const tokenId = localStorage.getItem('tokenId')
    console.log(URL)
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }
    axios
      .get(URL, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const convertToURL = (
  query: string,
  filters: Filters,
  sort: Object
): string => {
  return `/courses2/${query}/${encodeURIComponent(
    JSON.stringify(filters)
  )}/${encodeURIComponent(JSON.stringify(sort))}`
}

export const setPrice = (
  oldFilters: Filters,
  price: { min: number; max: number }
): Filters => {
  const newFilters = oldFilters
  newFilters.price = price

  return newFilters
}

export const setDuration = (
  oldFilters: Filters,
  duration: { min: number; max: number }
): Filters => {
  const newFilters = oldFilters
  newFilters.duration = duration

  return newFilters
}

export const setRating = (oldFilters: Filters, rating: number): Filters => {
  const newFilters = oldFilters
  newFilters.rating = rating

  return newFilters
}

export const addCategory = (oldFilters: Filters, id: string): Filters => {
  const newFilters = removeCategory(oldFilters, id)
  newFilters.category.push(id)

  return newFilters
}

export const removeCategory = (oldFilters: Filters, id: string): Filters => {
  const newFilters = oldFilters
  const index = newFilters.category.indexOf(id)
  if (index >= 0) newFilters.category.splice(index, 1)

  return newFilters
}

export const getCategory = (categories: Category[], id: string): Category => {
  return categories.filter((category) => category._id == id)[0]
}

export const getSubCategory = (
  categories: Category[],
  id: string
): Category => {
  let subCategory: Category = {
    _id: '',
    name: { en: '' },
    parent: '',
    children: [],
  }

  categories.forEach((category) => {
    category.children.forEach((element) => {
      if (element._id == id) {
        subCategory = element
      }
    })
  })

  return subCategory
}
export const getSubCategories = (
  categories: Category[],
  selectedCategories: string[]
): Category[] => {
  const subCategories: Category[] = []

  categories.forEach((category) => {
    if (selectedCategories.includes(category._id)) {
      category.children.forEach((subCategory) => {
        subCategories.push(subCategory)
      })
    }
  })

  return subCategories
}

export const addSubCategory = (oldFilters: Filters, id: string): Filters => {
  const newFilters = removeSubCategory(oldFilters, id)
  newFilters.subCategory.push(id)

  return newFilters
}

export const removeSubCategory = (oldFilters: Filters, id: string): Filters => {
  const newFilters = oldFilters
  const index = newFilters.subCategory.indexOf(id)
  if (index >= 0) newFilters.subCategory.splice(index, 1)

  return newFilters
}

export const getTopics = (
  categories: Category[],
  selectedCategories: string[]
): Category[] => {
  const topics: Category[] = []

  categories.forEach((category) => {
    category.children.forEach((subCategory) => {
      if (selectedCategories.includes(subCategory._id)) {
        subCategory.children.forEach((element) => {
          topics.push(element)
        })
      }
    })
  })

  return topics
}

export const getTopic = (categories: Category[], id: string): Category => {
  let topic: Category = { _id: '', name: { en: '' }, parent: '', children: [] }

  categories.forEach((category) => {
    category.children.forEach((subCategory) => {
      subCategory.children.forEach((element) => {
        if (element._id == id) {
          topic = element
        }
      })
    })
  })

  return topic
}

export const addTopic = (oldFilters: Filters, id: string): Filters => {
  const newFilters = removeTopic(oldFilters, id)
  newFilters.topic.push(id)

  return newFilters
}

export const removeTopic = (oldFilters: Filters, id: string): Filters => {
  const newFilters = oldFilters
  const index = newFilters.topic.indexOf(id)
  if (index >= 0) newFilters.topic.splice(index, 1)

  return newFilters
}

export const addDifficulty = (
  oldFilters: Filters,
  difficulty: string
): Filters => {
  const newFilters = removeDifficulty(oldFilters, difficulty)
  newFilters.difficulty.push(difficulty)

  return newFilters
}

export const removeDifficulty = (
  oldFilters: Filters,
  difficulty: string
): Filters => {
  const newFilters = oldFilters
  const index = newFilters.difficulty.indexOf(difficulty)
  if (index >= 0) newFilters.difficulty.splice(index, 1)

  return newFilters
}

export const getTopCourses = async (category: string) => {
  console.log(category)
  const URL = `${routes.COURSES}?search=&filters=${encodeURIComponent(
    JSON.stringify({ category: [category] })
  )}&limit=10&page=0&sort=${encodeURIComponent(
    JSON.stringify({ 'meta.rating': 1 })
  )}`
  const tokenId = localStorage.getItem('tokenId')
  console.log(URL)
  const config = {
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  }
  if (category) {
    const data = JSON.parse(JSON.stringify(await axios.get(URL, config)))
    let shortData: ShortCourse[] = []
    if (data?.data.length > 0) {
      shortData = data?.data?.map((course: any) => {
        const ShortVersion: ShortCourse = {
          _id: course?._id || '',
          title: course?.title,
          status: course?.status,
          author: {
            _id: course?.author?._id,
            first_name: course?.author?.first_name,
            last_name: course?.author?.last_name,
          },
          ratingQty: course?.ratingQty,
          rating: course?.rating,
          shortCourseDescription: course?.shortCourseDescription,
          price: course?.price,
          salePrice: course?.salePrice,
          whatYouWillLearn: course?.whatYouWillLearn,
          presentationalImage: course?.presentationalImage,
          keywords: course?.keywords,
          totalTime: course?.totalTime,
          totalLectures: course?.totalLectures,
        }
        return ShortVersion
      })
    }
    return shortData
  } else {
    return []
  }
}

export const addSearchQuery = async (text: string) => {
  const URL = `${routes.BASE}/api/search/courses/addSearchQuery`

  const tokenId = localStorage.getItem('tokenId')
  console.log(URL)
  const config = {
    headers: {
      Authorization: `Bearer ${tokenId}`,
    },
  }

  const data = {
    search: text,
  }

  return await axios.post(URL, data, config)
}
