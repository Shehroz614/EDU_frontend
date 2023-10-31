import { CourseAgeLimitObject } from '@ugu/types'

export const minimumUserAge = 4

const ageLimits: CourseAgeLimitObject[] = [
  { value: 'noLimit', label: 'No Limit' },
  { value: 'over4', label: '4 & over' },
  { value: 'over7', label: '7 & over' },
  { value: 'over12', label: '12 & over' },
  { value: 'over16', label: '16 & over' },
  { value: 'over18', label: '18 & over' },
]

export default ageLimits
