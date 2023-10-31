import { CourseProgress, Lecture } from 'types/course'

export const getCourserProgress = (
  lectureArray: Lecture[],
  courseProgress: CourseProgress
) => {
  //calculate totalTime
  let totalTime = 0
  let totalWatchedTime = 0
  lectureArray?.forEach((lecture) => {
    totalTime += lecture.content?.duration
  })
  console.log('totalCourseTime: ', totalTime)

  //calculate totalWatchedTime for not finishedLectures
  const doneLectures = courseProgress?.lectures?.filter((lectureProgress) => {
    if (lectureProgress.done) {
      return lectureProgress
    } else {
      totalWatchedTime += lectureProgress.watchTime
    }
  })

  //calculate time for doneLectures
  doneLectures?.forEach((doneLecture) => {
    lectureArray.find((lecture) => {
      totalWatchedTime +=
        lecture._id === doneLecture.lectureId ? lecture.content.duration : 0
    })
  })

  //return progress in %
  return (totalWatchedTime / totalTime) * 100
}
