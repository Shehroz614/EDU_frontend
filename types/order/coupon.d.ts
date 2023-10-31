import Course from '../course'
import User from '../user'

interface Coupon {
  code: string
  discount: number
  type: 'fixed' | 'percentage'
  expiry?: Date
  course?: Course[_id][]
  users?: User[_id][]
  createdAt: Date
  updatedAt: Date
}
export default Coupon
