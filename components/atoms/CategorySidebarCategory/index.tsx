import React from 'react'
import styled from '@emotion/styled'
import { colors, fontFamilies } from '@configs/styles/config'
import Checkmark from '@components/atoms/Checkmark'
import { Category } from '@type/main'

const CategoryContainer = styled.label`
  font-family: ${fontFamilies.light};
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  margin: 0.25rem 1rem 0.25rem 0.5rem;
`
const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: center;
`
const CheckboxLabel = styled.label`
  color: ${colors.uguPurple};
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  margin-left: 0.8rem;
`
const CategorySidebarCategory = (props: {
  addCategory: Function
  removeCategory: Function
  categories: Category[]
  selectedCategories: string[]
}) => {
  //const [categories, setCategories] = useState<any[]>([]);
  //const [checked, setChecked] = useState<boolean[]>([]);

  const { addCategory, removeCategory, categories, selectedCategories } = props

  // const { state, dispatch } = useSearchContext();

  // const getCategoriesAPI = async () => {
  //   setCategories(await getCategories())
  // }

  // useEffect(() => {
  //   getCategoriesAPI();
  // }, [])

  // useEffect(() => {
  //   categories.map((item) => {
  //       //console.log(state.searchObject.categories.selectedCategories.id.filter((el) => (el == item._id)).length)
  //       let newChecked = checked;
  //       newChecked.push(state.searchObject.categories.selectedCategories.id.filter((el: any) => (el == item._id)).length !== 0)
  //       setChecked(newChecked);
  //   })
  //   state.searchObject.categories.selectedSubCategories.id?.map((item: any) => {
  //       if(categories.filter((item) => (item.children?.filter((sub: any) => (sub._id == item)))).length == 0)
  //           dispatch({type: "removeSubCategory", payload: {remIndex: item}})
  //     })
  // }, [categories])

  const handleOnClick = (id: string) => {
    if (selectedCategories.includes(id)) {
      removeCategory(id)
    } else {
      addCategory(id)
    }
  }

  return (
    <CategoryContainer>
      {categories?.map((category) => {
        return (
          <CheckboxWrapper key={category._id}>
            <Checkmark
              width="1rem"
              height="1rem"
              onClick={() => handleOnClick(category._id)}
              value={selectedCategories.includes(category._id)}
              borderRadius="0.2rem"
            />
            <CheckboxLabel>{category.name.en}</CheckboxLabel>
          </CheckboxWrapper>
        )
      })}
    </CategoryContainer>
  )
}

export default CategorySidebarCategory
