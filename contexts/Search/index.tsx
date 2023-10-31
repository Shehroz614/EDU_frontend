import { createContext, useContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { ShortCourse } from '@type/course'

// Define the state type
interface SearchState {
  timers: {
    changeTimer: any
    suggestinosTimer: any
    resultsLoader: boolean
  }
  searchObject: {
    searchText: string
    filters: {
      price: Object
      rating: number
      duration: Object
      category: string[]
      subCategory: string[]
      topic: string[]
      language: string[]
      difficulty: string[]
    }
    categories: {
      selectedCategories: {
        name: string[]
        id: string[]
      }
      selectedSubCategories: {
        name: string[]
        id: string[]
      }
      selectedTopic: {
        name: string[]
        id: string[]
      }
    }
    perPageLimit: number
    pageNo: number
    sortObject: Object
  }
  results: ShortCourse[]
  topCourses: ShortCourse[]
  searchSuggestions: string[]
  additional: {
    categorySelected: string
    breadCrumbs: string
  }
}

// Define the action type
type SearchAction = {
  type: string
  payload: {
    searchText?: string
    category?: string
    results?: ShortCourse[]
    sortObject?: Object
    searchSuggestions?: string[]
    topCourses?: ShortCourse[]
    breadCrumbs?: string
    price?: Object
    rating?: number
    addCategory?: { name: string; id: string }
    remIndex?: string
    duration?: { min: number; max: number }
    difficulty?: string[]
  }
}

// Define the initial state
const initialSearchState: SearchState = {
  timers: {
    changeTimer: 0,
    suggestinosTimer: 0,
    resultsLoader: true,
  },
  searchObject: {
    searchText: '',
    filters: {
      price: {},
      rating: 0,
      duration: {},
      category: [],
      subCategory: [],
      topic: [],
      language: [],
      difficulty: [],
    },
    categories: {
      selectedCategories: {
        name: [],
        id: [],
      },
      selectedSubCategories: {
        name: [],
        id: [],
      },
      selectedTopic: {
        name: [],
        id: [],
      },
    },
    perPageLimit: 100,
    pageNo: 1,
    sortObject: { 'meta.rating': 1 },
  },
  results: [],
  topCourses: [],
  searchSuggestions: [],
  additional: {
    categorySelected: '',
    breadCrumbs: 'Courses',
  },
}

// Create the context
const SearchContext = createContext<{
  state: SearchState
  dispatch: React.Dispatch<SearchAction>
}>({
  state: initialSearchState,
  dispatch: () => null,
})

export const useSearchContext = () => useContext(SearchContext)

// Reducer function
const SearchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  let newObj
  let newTimers
  //let data : ShortCourse[] = [];
  switch (action.type) {
    case 'search':
      newObj = {
        ...state.searchObject,
        filters: { ...initialSearchState.searchObject.filters },
        searchText: action.payload.searchText || '',
      }
      console.log('newobj', newObj)
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem('searchObject', JSON.stringify(newObj))
      return { ...state, searchObject: newObj, timers: newTimers }
    case 'getTopCourses':
      const newAdditional = {
        ...state.additional,
        categorySelected: action.payload.category || '',
      }
      return { ...state, additional: newAdditional }
    case 'setTopCourses':
      return { ...state, topCourses: action.payload.topCourses || [] }
    case 'setResults':
      return { ...state, results: action.payload.results || [] }
    case 'changeSort':
      newObj = {
        ...state.searchObject,
        sortObject: action.payload.sortObject || { 'meta.rating': 1 },
      }
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem('searchObject', JSON.stringify(newObj))
      return { ...state, searchObject: newObj, timers: newTimers }
    case 'setSuggestions':
      return {
        ...state,
        searchSuggestions: action.payload.searchSuggestions || [],
      }
    case 'setBreadCrumbs':
      const newCrumbs = {
        ...state.additional,
        breadCrumbs: action.payload.breadCrumbs || '',
      }
      return { ...state, additional: newCrumbs }
    case 'setPrice':
      newObj = {
        ...state.searchObject,
        filters: {
          ...state.searchObject.filters,
          price: action.payload.price || {},
        },
      }
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem('searchObject', JSON.stringify(newObj))
      return { ...state, searchObject: newObj, timers: newTimers }
    case 'reset':
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          filters: {
            price: {},
            rating: 0,
            duration: {},
            category: [],
            subCategory: [],
            topic: [],
            language: [],
            difficulty: [],
          },
        })
      )
      console.log('reset 2', localStorage.getItem('searchObject'))
      return {
        ...state,
        searchObject: {
          ...state.searchObject,
          filters: {
            price: {},
            rating: 0,
            duration: {},
            category: [],
            subCategory: [],
            topic: [],
            language: [],
            difficulty: [],
          },
        },
      }
    case 'setRating':
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          filters: {
            ...state.searchObject.filters,
            rating: action.payload.rating || 0,
            price: {},
          },
        })
      )
      newTimers = { ...state.timers, resultsLoader: true }
      return {
        ...state,
        searchObject: {
          ...state.searchObject,
          filters: {
            ...state.searchObject.filters,
            rating: action.payload.rating || 0,
            price: {},
          },
        },
        timers: newTimers,
      }
    case 'addCategory':
      let newName = state.searchObject.categories?.selectedCategories.name
      let newId = state.searchObject.categories?.selectedCategories.id
      if (action.payload.addCategory?.name && action.payload.addCategory?.id) {
        newName?.push(action.payload.addCategory.name)
        newId?.push(action.payload.addCategory?.id || '')
      }
      newName = newName?.filter((item) => item != '')
      newId = newId?.filter((item) => item != '')
      console.log('add cat', action.payload.addCategory)
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedCategories: { name: newName, id: newId },
          },
        })
      )
      return {
        ...state,
        timers: newTimers,
        searchObject: {
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedCategories: { name: newName, id: newId },
          },
        },
      }
    case 'removeCategory':
      let remIndex = -1
      //console.log("rem cat", action.payload.remIndex)
      for (
        let i = 0;
        i < state.searchObject.categories?.selectedCategories.id.length;
        i++
      ) {
        if (
          state.searchObject.categories?.selectedCategories.id[i] ==
          action.payload.remIndex
        ) {
          remIndex = i
        }
      }
      //console.log("rem index", remIndex)
      let newNameRem: string[] =
        state.searchObject.categories?.selectedCategories.name
      let newIdRem: string[] =
        state.searchObject.categories?.selectedCategories.id
      if (remIndex >= 0) {
        //console.log("Here I delete")
        newNameRem.splice(remIndex, 1)
        newIdRem.splice(remIndex, 1)
      }
      //console.log("rem return", newNameRem, newIdRem)
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedCategories: { name: newNameRem, id: newIdRem },
          },
        })
      )
      return {
        ...state,
        timers: newTimers,
        searchObject: {
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedCategories: { name: newNameRem, id: newIdRem },
          },
        },
      }
    case 'addSubCategory':
      let newSubName = state.searchObject.categories?.selectedSubCategories.name
      let newSubId = state.searchObject.categories?.selectedSubCategories.id
      if (action.payload.addCategory?.name && action.payload.addCategory?.id) {
        newSubName?.push(action.payload.addCategory.name)
        newSubId?.push(action.payload.addCategory?.id || '')
      }
      newSubName = newSubName?.filter((item) => item != '')
      newSubId = newSubId?.filter((item) => item != '')
      console.log('add cat', action.payload.addCategory)
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedSubCategories: { name: newSubName, id: newSubId },
          },
        })
      )
      return {
        ...state,
        timers: newTimers,
        searchObject: {
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedSubCategories: { name: newSubName, id: newSubId },
          },
        },
      }
    case 'removeSubCategory':
      let remSubIndex = -1
      for (
        let i = 0;
        i < state.searchObject.categories?.selectedSubCategories.id.length;
        i++
      ) {
        if (
          state.searchObject.categories?.selectedSubCategories.id[i] ==
          action.payload.remIndex
        ) {
          remSubIndex = i
        }
      }
      let newSubNameRem: string[] =
        state.searchObject.categories?.selectedSubCategories.name
      let newSubIdRem: string[] =
        state.searchObject.categories?.selectedSubCategories.id
      if (remSubIndex >= 0) {
        newSubNameRem.splice(remSubIndex, 1)
        newSubIdRem.splice(remSubIndex, 1)
      }
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedSubCategories: { name: newSubNameRem, id: newSubIdRem },
          },
        })
      )
      return {
        ...state,
        timers: newTimers,
        searchObject: {
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedSubCategories: { name: newSubNameRem, id: newSubIdRem },
          },
        },
      }
    case 'addTopic':
      let newTopicName = state.searchObject.categories?.selectedTopic.name
      let newTopicId = state.searchObject.categories?.selectedTopic.id
      if (action.payload.addCategory?.name && action.payload.addCategory?.id) {
        newTopicName?.push(action.payload.addCategory.name)
        newTopicId?.push(action.payload.addCategory?.id || '')
      }
      newTopicName = newTopicName?.filter((item) => item != '')
      newTopicId = newTopicId?.filter((item) => item != '')
      console.log('add cat', action.payload.addCategory)
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedTopic: { name: newTopicName, id: newTopicId },
          },
        })
      )
      return {
        ...state,
        timers: newTimers,
        searchObject: {
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedTopic: { name: newTopicName, id: newTopicId },
          },
        },
      }
    case 'removeTopic':
      let remTopicIndex = -1
      for (
        let i = 0;
        i < state.searchObject.categories?.selectedTopic.id.length;
        i++
      ) {
        if (
          state.searchObject.categories?.selectedTopic.id[i] ==
          action.payload.remIndex
        ) {
          remTopicIndex = i
        }
      }
      let newTopicNameRem: string[] =
        state.searchObject.categories?.selectedTopic.name
      let newTopicIdRem: string[] =
        state.searchObject.categories?.selectedTopic.id
      if (remTopicIndex >= 0) {
        newTopicNameRem.splice(remTopicIndex, 1)
        newTopicIdRem.splice(remTopicIndex, 1)
      }
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedTopic: { name: newTopicNameRem, id: newTopicIdRem },
          },
        })
      )
      return {
        ...state,
        timers: newTimers,
        searchObject: {
          ...state.searchObject,
          categories: {
            ...state.searchObject.categories,
            selectedTopic: { name: newTopicNameRem, id: newTopicIdRem },
          },
        },
      }
    case 'resetCategories':
      localStorage.setItem(
        'searchObject',
        JSON.stringify({
          ...state.searchObject,
          categories: { ...initialSearchState.searchObject.categories },
        })
      )
      return {
        ...state,
        searchObject: {
          ...state.searchObject,
          categories: {
            selectedCategories: { name: [], id: [] },
            selectedSubCategories: { name: [], id: [] },
            selectedTopic: { name: [], id: [] },
          },
        },
      }
    case 'setDuration':
      newObj = {
        ...state.searchObject,
        filters: {
          ...state.searchObject.filters,
          duration: action.payload.duration || {},
        },
      }
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem('searchObject', JSON.stringify(newObj))
      return { ...state, searchObject: newObj, timers: newTimers }
    case 'setDifficulty':
      newObj = {
        ...state.searchObject,
        filters: {
          ...state.searchObject.filters,
          difficulty: action.payload.difficulty || [],
        },
      }
      newTimers = { ...state.timers, resultsLoader: true }
      localStorage.setItem('searchObject', JSON.stringify(newObj))
      return { ...state, searchObject: newObj, timers: newTimers }
    default:
      return state
  }
}

// Context Provider
interface SearchProviderProps {
  children: React.ReactNode
}

//Helpe functions

// const editSearchText = (searchText: string) => {
//     initialSearchState.searchObject.searchText = searchText;
//     initialSearchState.timers.resultsLoader = true;
//     localStorage.setItem('searchObject', JSON.stringify(initialSearchState.searchObject));
//     console.log("typing")

//     return initialSearchState.searchObject;
// }

//Api Calls
const getCourses = (): Promise<ShortCourse[]> => {
  //localStorage.setItem('searchObject', JSON.stringify(initialSearchState.searchObject))
  return new Promise((resolve, reject) => {
    const obj = JSON.parse(
      localStorage.getItem('searchObject') ||
        JSON.stringify(initialSearchState.searchObject)
    )
    //obj.filters.rating = 0;
    const URL = `http://localhost:4000/api/education/courses?search=${
      obj.searchText
    }&filters=${
      obj.filters ? JSON.stringify(obj.filters) : '{}'
    }&limit=20&page=0&sort=${JSON.stringify(obj.sortObject)}`
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
        console.log(res.data as ShortCourse[])
        resolve(res.data as ShortCourse[])
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getTopCourses = async (category: string) => {
  console.log(category)
  const URL = `http://localhost:4000/api/education/courses?search=&filters={"category": ["${category}"]}&limit=10&page=0&sort={ "meta.rating": 1 }`
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
        let ShortVersion: ShortCourse

        ShortVersion = {
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

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initialSearchState)

  //useEffects
  useEffect(() => {
    if (localStorage.getItem('searchObject')) {
      state.searchObject = JSON.parse(
        localStorage.getItem('searchObject') || ''
      )
    }
  }, [initialSearchState.searchObject])

  useEffect(() => {
    clearTimeout(state.timers.changeTimer)
    state.timers.changeTimer = setTimeout(async () => {
      state.searchObject.filters.category = []
      state.searchObject.filters.subCategory = []
      state.searchObject.filters.topic = []
      if (
        state.searchObject?.categories?.selectedCategories?.id.length > 0 &&
        state.searchObject?.categories?.selectedSubCategories?.id.length == 0
      )
        state.searchObject.filters.category =
          state.searchObject?.categories?.selectedCategories?.id
      if (
        state.searchObject?.categories?.selectedSubCategories?.id.length > 0 &&
        state.searchObject?.categories?.selectedTopic?.id.length == 0
      ) {
        state.searchObject.filters.category = []
        state.searchObject.filters.subCategory =
          state.searchObject?.categories?.selectedSubCategories?.id
      }
      if (state.searchObject?.categories?.selectedTopic?.id.length > 0) {
        state.searchObject.filters.subCategory = []
        state.searchObject.filters.topic =
          state.searchObject?.categories?.selectedTopic?.id
      }
      localStorage.setItem('searchObject', JSON.stringify(state.searchObject))
      const data = await getCourses()
      dispatch({ type: 'setResults', payload: { results: data } })
      clearTimeout(state.timers.changeTimer)
      state.timers.resultsLoader = false
      if (
        !state.searchObject.filters.category?.length &&
        !state.searchObject.filters.subCategory?.length &&
        !state.searchObject.filters.topic?.length
      ) {
        if (state.searchObject.searchText)
          dispatch({
            type: 'setBreadCrumbs',
            payload: {
              breadCrumbs: `Search: "${state.searchObject.searchText}" (${
                data?.length
              } result${data?.length == 1 ? '' : 's'})`,
            },
          })
        else
          dispatch({
            type: 'setBreadCrumbs',
            payload: { breadCrumbs: 'Courses' },
          })
      } else {
        if (state.searchObject.categories.selectedCategories.name.length == 1) {
          dispatch({
            type: 'setBreadCrumbs',
            payload: {
              breadCrumbs:
                state.searchObject.categories.selectedCategories.name[0],
            },
          })
          if (
            state.searchObject.categories.selectedSubCategories.name.length == 1
          ) {
            dispatch({
              type: 'setBreadCrumbs',
              payload: {
                breadCrumbs:
                  state.searchObject.categories.selectedCategories.name[0] +
                  ' / ' +
                  state.searchObject.categories.selectedSubCategories.name[0],
              },
            })
            if (state.searchObject.categories.selectedTopic.name.length == 1) {
              dispatch({
                type: 'setBreadCrumbs',
                payload: {
                  breadCrumbs:
                    state.searchObject.categories.selectedCategories.name[0] +
                    ' / ' +
                    state.searchObject.categories.selectedSubCategories
                      .name[0] +
                    ' / ' +
                    state.searchObject.categories.selectedTopic.name[0],
                },
              })
            }
          }
        } else {
          dispatch({
            type: 'setBreadCrumbs',
            payload: { breadCrumbs: 'Courses' },
          })
        }
      }
    }, 2000)
  }, [state.searchObject])

  useEffect(() => {
    const url = `http://localhost:4000/api/search/courses/suggestions?search=${state.searchObject.searchText}`
    const tokenId = localStorage.getItem('tokenId')
    const config = {
      headers: {
        Authorization: `Bearer ${tokenId}`,
      },
    }

    clearTimeout(state.timers.suggestinosTimer)
    state.timers.suggestinosTimer = setTimeout(async () => {
      dispatch({
        type: 'setSuggestions',
        payload: {
          searchSuggestions: await (await axios.get(url, config))?.data,
        },
      })
    }, 700)
  }, [state.searchObject.searchText])

  useEffect(() => {
    console.log('res', state.results)
  }, [state.results])

  useEffect(() => {
    getTopCourses(state.additional.categorySelected || '').then((data) => {
      dispatch({ type: 'setTopCourses', payload: { topCourses: data } })
    })
  }, [state.additional.categorySelected])

  useEffect(() => {
    if (
      state.searchObject?.categories?.selectedCategories?.id.length > 0 &&
      state.searchObject?.categories?.selectedSubCategories?.id.length == 0
    )
      state.searchObject.filters.category =
        state.searchObject?.categories?.selectedCategories?.id
    if (
      state.searchObject?.categories?.selectedSubCategories?.id.length > 0 &&
      state.searchObject?.categories?.selectedTopic?.id.length == 0
    ) {
      state.searchObject.filters.category = []
      state.searchObject.filters.subCategory =
        state.searchObject?.categories?.selectedSubCategories?.id
    }
    if (state.searchObject?.categories?.selectedTopic?.id.length > 0) {
      state.searchObject.filters.subCategory = []
      state.searchObject.filters.topic =
        state.searchObject?.categories?.selectedTopic?.id
    }
    localStorage.setItem('searchObject', JSON.stringify(state.searchObject))
  }, [state.searchObject.categories])

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  )
}
