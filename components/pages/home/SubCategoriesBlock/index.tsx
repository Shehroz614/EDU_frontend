import { useCategoriesState } from '@contexts/categoriesContext'
import styled from '@emotion/styled'
import {
  addSubCategory,
  removeCategory,
  removeSubCategory,
} from '@helpers/searchHelper'
import { Filters } from '@type/index'
import { useRouter } from 'next/router'

type SubCategoriesBlockProps = {
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

const GroupedButtonsContainer = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  height: 60px;
  margin-top: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`

/***********************************************
  This component is displayed when Category or/and
  subCategory is selected from Category drop down.

  It has two parts:
   1. Category. Selected category. When deselected,
   Category and subCategories are cleared.
   2. subCategories. One sub Category may be selected
   if user clicked on it in category drop down.
   Also user may select more sub categories, as
   well as deselect them.

  This component works separately from search and
  filters. Once user enters search query or applies
  filters to it, this component will be replaced with 
  more fitting one.
  Ex. Text that shows how many search results were
  found.
  ***********************************************/

const SubCategoriesBlock: React.FC<SubCategoriesBlockProps> = (props) => {
  const router = useRouter()
  const { categories } = useCategoriesState()

  const { filters, setFilters } = props

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <div
        style={{
          border: '1px solid black',
          borderRadius: 20,
          padding: '7px 16px',
          fontSize: 16,
          minWidth: 'max-content',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {categories.find((item) => item._id == filters.category[0])?.name.en ||
          ''}
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
            setFilters(removeCategory(filters, filters.category[0]))
            router.push('/')
          }}
        >
          &#215;
        </div>
      </div>
      <div
        style={{
          borderLeft: '1px solid #A4A4A4',
          height: '32px',
          margin: '0 32px',
        }}
      ></div>
      <GroupedButtonsContainer>
        {categories
          .find((item) => item._id == filters.category[0])
          ?.children.map((child) => {
            const selected = filters.subCategory.includes(child._id)
            return (
              <div
                key={child._id}
                style={{
                  border: selected ? '1px solid black' : 0,
                  borderRadius: 20,
                  padding: '7px 16px',
                  paddingRight: 10,
                  fontSize: 16,
                  minWidth: 'max-content',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: selected
                    ? 'rgba(26, 30, 61, 1)'
                    : 'rgba(26, 30, 61, 0.50)',
                  order: selected ? 0 : 1,
                  marginRight: 10,
                }}
                onClick={(e) => {
                  if (!selected) {
                    e.stopPropagation()
                    const newFilters = addSubCategory(filters, child._id)
                    router.push({
                      pathname: '/',
                      query: {
                        category: JSON.stringify(newFilters.category),
                        subCategory: JSON.stringify(newFilters.subCategory),
                      },
                    })
                  }
                }}
              >
                {child?.name.en || ''}
                {selected && (
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
                      const newFilters = removeSubCategory(filters, child._id)
                      router.push({
                        pathname: '/',
                        query: {
                          category: JSON.stringify(newFilters.category),
                          subCategory: JSON.stringify(newFilters.subCategory),
                        },
                      })
                    }}
                  >
                    &#215;
                  </div>
                )}
              </div>
            )
          })}
      </GroupedButtonsContainer>
    </div>
  )
}

export default SubCategoriesBlock
