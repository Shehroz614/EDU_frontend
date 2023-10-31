import React, { useState, useEffect } from 'react'
import CategoriesDropdownRow from 'components/atoms/CategoriesDropdownRow'
import { Category } from 'types/main'
import { useCategoriesState } from 'contexts/categoriesContext'
import {
  CategoriesDropdownWrapper,
  DropdownWrapper,
  DropdownSeparator,
} from './styled.components'
//import { useSearchContext } from '@contexts/Search';
import {
  addCategory,
  addSubCategory,
  addTopic,
  getEmptyFilters,
  getSubCategory,
  getTopic,
} from '@helpers/searchHelper'
import { useRouter } from 'next/router'

//Testing Object

type Props = {
  setShowCategoriesDropdown: any
  text?: string
  progress?: number
  value?: number
}

const CategoryOnClickHandle = (
  categories: Category[],
  id: string,
  type: string,
  router: any,
  setShowCategoriesDropdown: any
) => {
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
  //window.location.replace(convertToURL(' ', filters, { 'meta.rating': 1 }))
  setShowCategoriesDropdown(false)
  router.push({
    pathname: '/',
    query: {
      category: JSON.stringify(filters.category),
      subCategory: JSON.stringify(filters.subCategory),
    },
  })
}

const getNewCategoryRows = (
  categories: Category[],
  router: any,
  setShowCategoriesDropdown: any,
  setActiveCategory?: Function,
  showSubSubCategories?: Function,
  type?: string,
  categoriesFull?: Category[]
) => {
  return categories?.map((category, index) => {
    const notLastElement = index != categories.length - 1
    return (
      <>
        <CategoriesDropdownRow
          key={category._id}
          categoryName={JSON.parse(JSON.stringify(category.name))}
          onMouseEnter={() => {
            setActiveCategory && setActiveCategory(category)
            showSubSubCategories &&
              (category?.children?.length > 0
                ? showSubSubCategories(true)
                : showSubSubCategories(false))
          }}
          onClick={() => {
            CategoryOnClickHandle(
              categoriesFull || [],
              category._id,
              type || '',
              router,
              setShowCategoriesDropdown
            )
          }}
        />
        {notLastElement && <DropdownSeparator></DropdownSeparator>}
      </>
    )
  })
}

const CategoriesDropdown: React.FunctionComponent<Props> = ({
  setShowCategoriesDropdown,
}) => {
  const { categories } = useCategoriesState()
  const [activeCategory, setActiveCategory] = useState<Category>()
  const [activeSubCategory, setActiveSubCategory] = useState<Category>()
  const [showSubSubCategory, setShowSubSubCategory] = useState(false)

  useEffect(() => {
    setActiveCategory(categories[0])
  }, [categories])
  const router = useRouter()
  return (
    <>
      {categories && categories.length >= 0 && (
        <CategoriesDropdownWrapper>
          <DropdownWrapper
            key="CategoriesDropdown"
            onMouseEnter={() => setShowSubSubCategory(false)}
          >
            {getNewCategoryRows(
              categories,
              router,
              setShowCategoriesDropdown,
              setActiveCategory,
              () => {},
              'category'
            )}
          </DropdownWrapper>
          <DropdownWrapper
            key="SubCategoriesDropdown"
            backgroundColor="#F5FAFB"
          >
            {activeCategory &&
              getNewCategoryRows(
                activeCategory?.children as Category[],
                router,
                setShowCategoriesDropdown,
                setActiveSubCategory,
                setShowSubSubCategory,
                'subCategory',
                categories
              )}
          </DropdownWrapper>
          {activeSubCategory?.children && showSubSubCategory && (
            <DropdownWrapper
              key="SubSubCategoriesDropdown"
              backgroundColor="#FBF5F5"
            >
              {getNewCategoryRows(
                activeSubCategory?.children as Category[],
                router,
                setShowCategoriesDropdown,
                () => {},
                () => {},
                'topic',
                categories
              )}
            </DropdownWrapper>
          )}
        </CategoriesDropdownWrapper>
      )}
    </>
  )
}

export default CategoriesDropdown
