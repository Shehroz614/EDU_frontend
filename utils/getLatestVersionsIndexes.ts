import { CourseVersion } from '@type/course'

//NOTE - Returns array of latest indexes

export const getLatestVersionIndexes = (
  versions: CourseVersion[]
): {
  lastLiveIndex: number
  lastReviewIndex: number
  lastDraftIndex: number
} => {
  let lastLiveIndex = -1
  let lastReviewIndex = -1
  let lastDraftIndex = -1

  versions.forEach((version, index) => {
    if (version.status === 'online') {
      lastLiveIndex = index
      // Reset the draft and review indexes when a new live version is found
      lastReviewIndex = -1
      lastDraftIndex = -1
    } else if (index > lastLiveIndex) {
      // Only update the draft and review indexes if they come after the last live version
      switch (version.status) {
        case 'inReview':
        case 'approved':
        case 'rejected':
          lastReviewIndex = index
          break
        case 'draft':
          lastDraftIndex = index
          break
      }
    }
  })

  return {
    lastLiveIndex: lastLiveIndex,
    lastReviewIndex: lastReviewIndex,
    lastDraftIndex: lastDraftIndex,
  }
}
