import User from '@edugram/types/user'

interface Announcement {
  description: string
  actionLink?: string
  isClosable: boolean
  isActive: boolean
  createdBy: User[_id]
  createdAt: Date
  updatedAt: Date
}
export default Announcement
