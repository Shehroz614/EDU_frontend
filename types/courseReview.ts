export type AuthorType = {
  _id: string
  first_name: string
  last_name: string
  id: string
}

export type ReviewType = {
  _id: string
  title: string
  review: string
  likes: string[]
  dislikes: string[]
  rating: number
  author: AuthorType
  responses: string[]
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}
