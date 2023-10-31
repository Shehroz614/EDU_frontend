import { Category } from '@type/main'

const getCategory = (categories: Category[], categoryId: string) => {
  return categories.filter((category) => {
    return category._id === categoryId
  })[0]
}
export default getCategory
