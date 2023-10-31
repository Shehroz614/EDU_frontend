import * as React from 'react'
import { Category } from '@ugu/types'
import getCategories from '@services/api/category/getCategories'

type Action = {
  type: 'setCategories'
  categories: Category[]
}
type Dispatch = (action: Action) => void
type State = { categories: Category[] }
type CountProviderProps = { children: React.ReactNode }

const CountStateContext = React.createContext<State | undefined>(undefined)
const CountDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
)

const defaultCategories: Category[] = []

//TODO: localhost should be updated with new categories once a day

const setCategoriesToLocalStorage = (categories: Category[]) => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  localStorage.setItem('categories', JSON.stringify(categories))
  localStorage.setItem('categoriesExpireTime', JSON.stringify(tomorrow))
}

const getCategoriesFromLocalStorage = () => {
  const categoriesExpiredTime = localStorage.getItem('categoriesExpireTime')
  const today = new Date().toISOString()

  const isCategoriesExpired = categoriesExpiredTime
    ? today > JSON.parse(categoriesExpiredTime)
    : true

  const categoriesFromLocalStorage = localStorage.getItem('categories')
  const categories: Category[] =
    categoriesFromLocalStorage && JSON.parse(categoriesFromLocalStorage)

  return !isCategoriesExpired && categories.length > 0 ? categories : undefined
}

const categoriesReducer = (state: State, action: Action) => {
  console.log('action.type', action.type, state)
  switch (action.type) {
    case 'setCategories':
      setCategoriesToLocalStorage(action.categories)
      const categories = action.categories
      return { categories: categories }
    default: {
      throw new Error('Unhandled action type!')
    }
  }
}

const CategoriesProvider = ({ children }: CountProviderProps) => {
  const [state, dispatch] = React.useReducer(categoriesReducer, {
    categories: defaultCategories,
  })

  const fetchCategories = React.useCallback(async () => {
    const categoriesFromLocalStorage = getCategoriesFromLocalStorage()
    if (categoriesFromLocalStorage) {
      console.log('Fetching Categories from localstorage...')
      dispatch({
        type: 'setCategories',
        categories: categoriesFromLocalStorage,
      })
    } else {
      console.log('Fetching Categories from backend...')
      try {
        console.log('in try block')
        const categories = await getCategories()
        dispatch({ type: 'setCategories', categories: categories })
      } catch (error) {
        throw new Error('Error fetching the Course: ' + error)
      }
    }
  }, [])

  React.useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  React.useEffect(() => {
    console.log('new category state: ', state)
  }, [state])

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

const useCategoriesState = () => {
  const context = React.useContext(CountStateContext)

  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

const useCategoriesDispatch = () => {
  const context = React.useContext(CountDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

export { CategoriesProvider, useCategoriesState, useCategoriesDispatch }
