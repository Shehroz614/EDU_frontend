import { ShortCourse } from './course'

export type User = {
  signedIn: boolean
  _id?: string
  email?: string
  avatar?: string
  first_name?: string
  last_name?: string
  date_of_birth?: Date
  city?: string
  country?: string
  website?: string
  email_subscription?: boolean
  socials?: { name: string; url: string }[]
  rank?: string
  wishlist?: ShortCourse[] | string[]
  my_courses?: ShortCourse[] | string[]
  in_cart?: ShortCourse[] | string[]
  purchased_courses?: ShortCourse[] | string[]
  completed_courses?: ShortCourse[] | string[]
  transactions?: string[]
  reviews?: any[]
  search_history?: string[]
  visited_courses?: ShortCourse[] | string[]
  notifications?: any[]
  messages?: string[]
  payment_methods?: any[]
  website_preferences?: any[]
  stripeConnectedAccountId?: string | null
  wishlisted_courses?: ShortCourse[] | []
  updatedAt?: Date
  createdAt?: Date
  isAuthor?: boolean
  isAuthorVerified?: boolean
  introduction?: string | null
  introductoryVideo?: string | null
}

export type RawUser = Omit<
  User,
  'date_of_birth' | 'updatedAt' | 'createdAt'
> & {
  date_of_birth?: string
  updatedAt?: string
  createdAt?: string
}

// Fields that user can modify using a PATCH request to /api/user/profile
export type UserProfileUpdate = {
  first_name?: string
  last_name?: string
  email?: string
  date_of_birth?: Date | string
  city?: string
  country?: string
  website?: string
  socials?: { name: string; url: string }[]
  introduction?: string

  //New fields from last merge. Not sure if this modifiable by /api/user/profile end point or not.

  _id?: string
  email_subscription?: Boolean
  avatar?: string
  //level
  rank?: number
  wishlisted_courses?: [ShortCourse] | []
  in_cart?: [ShortCourse] | []
  search_history?: [string]
  visited_courses?: [ShortCourse] | []
  isAuthor?: boolean
  isVerifiedAuthor?: boolean
}
