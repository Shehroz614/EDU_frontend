interface Category {
  name: { [_key: string]: string }
  parent: this[_id]
  children: this[_id][]
  createdAt: Date
  updatedAt: Date
}
export default Category
