export type ShortCourse = {
  _id: string
  title: string
  status: 'offline' | 'inReview' | 'rejected' | 'approved' | 'online' | 'draft'
  author: Author
  ratingQty: number
  rating: number
  shortCourseDescription: string
  price: number
  salePrice?: number
  whatYouWillLearn: string[]
  presentationalImage: string
  keywords: string[]
  totalTime: string
  totalLectures: number
}

//indicates difficulty of the course
export type CoursePrice = 'smart' | 'custom'
export type CourseLevel = 'all' | 'beginner' | 'intermediate' | 'expert'
export type CourseAgeLimit =
  | 'noLimit'
  | 'over4'
  | 'over7'
  | 'over12'
  | 'over16'
  | 'over18'

export type CourseAgeLimitObject = { value: CourseAgeLimit; label: string }

export type CourseParent = {
  _id: string
  liveVersion: number | null
  draftVersion: number
  author: Author
  versions: CourseVersion[]
}

export type LiveCourse = Course & CourseVersion

export type Course = {
  _id?: string
  liveVersion: number | null
  draftVersion: number
  author: Author
  ratingQty: number
  rating: number
  studentsQty: number
  courseReviews: string[]
  selectedReview: string
  ratingBrakeDown: number[]
  timestamps: string[]
  QA: string[]
  announcements: string[]
  createdAt: string
  updatedAt: string
  reviewRecord: string
  versions: { [key: number]: CourseVersion }
}

export type CourseVersion = {
  title: string
  version: number
  status: 'draft' | 'inReview' | 'rejected' | 'approved' | 'online'
  level: CourseLevel
  ageLimit: CourseAgeLimit
  category: string
  subCategory: string | null
  subSubCategory: string | null
  languages: string[]
  subtitles: string[]
  shortCourseDescription: string
  description: string
  price: number
  minPrice?: number
  salePrice?: number
  priceType: 'smart' | 'custom'
  whatYouWillLearn: string[]
  requirements: string[]
  difficulty: number
  presentationalVideo: Content
  presentationalImage: string
  aboutAuthor: string
  keywords: string[]
  course_materials: {
    sections: Section[]
  }
  coupons: CouponType[]
  totalTime: string
  totalLectures: number
  reviewRecord: ReviewRecord //not sure if this will be coming to us from backend
  _id: string
}

export type ReviewRecord = {
  course: string
  version: number
  reviewNote: string
  contactEmail: string
  authorId: string
  completed?: boolean
  status:
    | 'pendingReview'
    | 'inReview'
    | 'rejected'
    | 'approved'
    | 'released'
    | 'cancelled'
  comment?: string
  reviewerId?: string
}

export type Author = {
  _id: string
  first_name: string
  last_name: string
}

export type CouponType = {
  _id?: string
  code: string
  discount: number
  type: 'fixed' | 'percentage'
  expiry?: Date
  course?: string
  users?: string[]
}

export type Section = {
  _id: string
  title: string
  description?: string
  lectures: Lecture[]
  // totalTime?: string
  // totalLectures?: number
  course_id?: string
  author_id?: string
}

export type Lecture = {
  _id: string
  title: string
  content: Content // should be content in the future
  preview: boolean
  course_id?: string
  section_id?: string
  author_id?: string
  resources?: Resource[]
}

export type Resource = {
  _id: string
  key: string
  name: string
  course: string
  author: string
  public?: {
    url: string
  }
}

export type CombinedResource = {
  resource: Resource
  link: string //to download that resource
}

//this type is for temporary use while uploading file to AWS
//once it is linked it becomes a Resource
export type UploadedFile = {
  _id: string // this id will be generated
  file: File
  uploaded: boolean
  uploadedPercent: number
  resource?: Resource
}

//content object will come with lecture
//based on id we can get actual content object
export type ShortContent = {
  _id: string
  type: 'video' | 'text' | 'test'
  duration: number
}

export type Content = {
  _id: string
  author: string
  content: string
  type: 'video' | 'text' | 'test'
  courseId: string
  public: {
    url?: string
    urls?: {
      360: {
        thumbnail: string | null
        video: string | null
      }
      480: {
        thumbnail: string | null
        video: string | null
      }
      720: {
        thumbnail: string | null
        video: string | null
      }
      1080: {
        thumbnail: string | null
        video: string | null
      }
      original: {
        thumbnail: null
        video: string
      }
    }
  }
  name: string
  duration: number
}

export type VideoContent = {
  content: Content
  url: string
}

//NOTE
// We use it to track internal state and store data
// that was changed but haven't saved yet.
export type UpdateOutline = {
  updated: boolean
  sectionsUpdated: boolean
  sections: string[] //new order of section ids
  sectionsBeforeUpdate: Section[] //order of section ids before update
}

export type SimpleSection = {
  _id: string
  lectures: { _id: string }[]
}

export type ContentType = 'video' | 'text' | 'test'

export type LectureProgress = {
  lectureId: string //id
  watchTime: number
  done: boolean
}

export type CourseProgress = {
  lectures: LectureProgress[]
  lastLectureId: string
}
