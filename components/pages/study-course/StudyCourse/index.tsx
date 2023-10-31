// @ts-nocheck
import React, { useState, useCallback } from 'react'
import CourseSectionRowIconOpen from '@public/static/icons/course-section-row-icon-open'
import CourseSectionRowIcon from '@public/static/icons/course-section-row-icon'
import { colors, fontFamilies } from '@configs/styles/config'
import {
  announcementsLabel,
  bookmarksLabel,
  courseMaterialsLabel,
  notesLabel,
  progressLabel,
  QALabel,
} from '@configs/constants/labels/study-course-labels'
import { CircularProgressbar } from 'react-circular-progressbar'
import VideoPlayer from '@components/organisms/VideoPlayer'
import TestComponent from '@components/organisms/TestComponent'
import NextLectureLoader from '@pages_components/course-study/NextLectureLoader'
import Button from '@components/atoms/Button'
import ProgressBar from '@components/molecules/ProgressBar'
import QASection from '@components/atoms/CourseStudyQASection/CourseStudyQASection'
import Question from '@components/molecules/CourseStudyQuestion'
import {
  StudyCourseWrapper,
  PlayerBlockWrapper,
  TopBlockWrapper,
  BottomBlockWrapper,
  RightSide,
  TitleWrapper,
  CourseMaterialsWrapper,
  CourseMaterialsBtnWrapper,
  CourseMaterialsTextWrapper,
  CourseMaterialsBottomWrapper,
  CourseMaterialsSmallScreenWrapper,
  CoursePlayerWrapper,
  BelowPlayerArea,
  BelowMenuWrapper,
  ButtonsWrapper,
  ProgressWrapper,
  ProgressText,
  SmallProgressText,
  ProgressWrapperForSmallScreens,
  CircularProgressBarWrapper,
  QuestionsWrapper,
  SectionIcon,
  LoaderWrapper,
} from '@styled_components/StudyCourse/styled.components'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { useStudyCourse as useStudyCourseContext } from '@contexts/CourseStudy'
import { Lecture } from '@type/course'
// import StudyCourseSectionRow from '../../../course-study/components/StudyCourseSectionRow'
import StudyCourseSectionRow from '@components/pages/course-study/StudyCourseSectionRow'
import Loader from '@components/organisms/Loader'

const StudyCourse = (): JSX.Element => {
  const { width } = useWindowDimensions()
  const {
    course_id,
    course,
    lectureProgresses,
    loadedContent,
    currentLecture,
    currentProgress,
    nextLecture,
    nextLectureHandler,
    isNextLectureCountdown,
    countDown,
    previousLecture,
    previousLectureHandler,
    onLecturePressHandler,
    changeLectureProgressStatusHandler,
    onVideoProgressHandler,
    onVideoEndHandler,
  } = useStudyCourseContext()
  // const courseContext = useStudyCourseContext()
  // console.log(courseContext)

  //TODO - Move to the Hook all the states
  const [selectedTab, setSelectedTab] = useState<
    'materials' | 'announcements' | 'qa' | 'notes' | 'bookmarks'
  >(width && width < 1200 ? 'materials' : 'announcements')
  const [courseMaterialsOpen, setCourseMaterialsOpen] = useState(true)

  const onWideScreenPressed = () => {
    courseMaterialsOpen && window.scrollBy(0, 150)
    !courseMaterialsOpen && window.scrollBy(0, -150)
    setCourseMaterialsOpen(!courseMaterialsOpen)
  }

  const calculateCompletionPercentage = () => {
    if (!lectureProgresses || lectureProgresses.length === 0) {
      return 0
    }
    const totalLectures = lectureProgresses?.length
    const completedLectures = lectureProgresses?.filter(
      (progress) => progress?.done
    )?.length
    const completionPercentage = Math.floor(
      (completedLectures / totalLectures) * 100
    )
    return completionPercentage
  }

  const getSections = useCallback(() => {
    if (course) {
      return course.course_materials.sections.map((section) => {
        return (
          <StudyCourseSectionRow
            key={'section' + section._id}
            courseId={course_id}
            fontSize="12px"
            section={section}
            lectureProgresses={lectureProgresses ? lectureProgresses : []}
            onLecturePress={onLecturePressHandler || (() => {})}
            onDoneChange={changeLectureProgressStatusHandler || (() => {})}
            currentLecture={currentLecture || ({} as Lecture)}
          />
        )
      })
    }
  }, [
    changeLectureProgressStatusHandler,
    course,
    course_id,
    currentLecture,
    lectureProgresses,
    onLecturePressHandler,
  ])

  return (
    <StudyCourseWrapper>
      <PlayerBlockWrapper>
        <TopBlockWrapper>
          <RightSide>
            <TitleWrapper>{course?.title}</TitleWrapper>
          </RightSide>
          <CourseMaterialsBtnWrapper
            onClick={() => setCourseMaterialsOpen(!courseMaterialsOpen)}
          >
            <SectionIcon>
              {courseMaterialsOpen ? (
                <CourseSectionRowIconOpen />
              ) : (
                <CourseSectionRowIcon fillColor={colors.uguPurple} />
              )}
            </SectionIcon>
            <CourseMaterialsTextWrapper>
              {courseMaterialsLabel}
            </CourseMaterialsTextWrapper>
          </CourseMaterialsBtnWrapper>
          <ProgressWrapperForSmallScreens>
            <CircularProgressBarWrapper>
              <CircularProgressbar
                value={30}
                text={`${30}%`}
                circleRatio={0.75}
                strokeWidth={9}
                styles={{
                  path: {
                    stroke: colors.uguRed,
                    transform: 'rotate(0.625turn)',
                    transformOrigin: 'center center',
                  },
                  trail: {
                    transform: 'rotate(0.625turn)',
                    transformOrigin: 'center center',
                  },
                  text: {
                    fill: colors.uguPurple,
                    fontFamily: fontFamilies.bold,
                    fontSize: '26px',
                  },
                }}
              />
            </CircularProgressBarWrapper>
            <SmallProgressText>{progressLabel}</SmallProgressText>
          </ProgressWrapperForSmallScreens>
        </TopBlockWrapper>
        <BottomBlockWrapper>
          <CoursePlayerWrapper>
            {loadedContent && currentLecture && currentProgress ? (
              <>
                {loadedContent.type === 'video' && (
                  <VideoPlayer
                    autoplay={true}
                    videoURL={loadedContent.public.urls}
                    videoName={loadedContent.name}
                    isMultipleVideos={true}
                    nextVideoHandler={nextLectureHandler}
                    previousVideoHandler={previousLectureHandler}
                    nextLectureTitle={nextLecture?.title || undefined}
                    previousLectureTitle={previousLecture?.title || undefined}
                    onVideoProgress={onVideoProgressHandler}
                    onVideoEndHandler={onVideoEndHandler}
                    secPlayed={currentProgress?.watchTime}
                    isWideScreen={!!(width && width < 1200)}
                    onWideScreenPressed={onWideScreenPressed}
                  />
                )}
                {loadedContent.type === 'text' && (
                  <div style={{ height: '30rem' }}>
                    {/* <TextViewer value={loadedContent.content} /> */}
                    <TestComponent />
                  </div>
                )}
                {nextLecture && isNextLectureCountdown && (
                  <NextLectureLoader
                    seconds={countDown || 0}
                    nextLectureTitle={nextLecture?.title}
                    onPlayPress={nextLectureHandler}
                    onCancelPress={() => console.log('Play next lecture')}
                  />
                )}
              </>
            ) : (
              <LoaderWrapper>
                <Loader size="medium" />
              </LoaderWrapper>
            )}
          </CoursePlayerWrapper>
          {courseMaterialsOpen && width && width > 1200 && (
            <CourseMaterialsWrapper>{getSections()}</CourseMaterialsWrapper>
          )}
        </BottomBlockWrapper>
      </PlayerBlockWrapper>
      <BelowPlayerArea>
        <BelowMenuWrapper>
          <ButtonsWrapper>
            {width && width < 1200 && (
              <Button
                text={courseMaterialsLabel}
                borderRadius="4px"
                backgroundColor={
                  selectedTab === 'materials' ? colors.uguBlue : 'none'
                }
                height={'3rem'}
                width={'10rem'}
                fontWeight="bold"
                marginRight="0.5rem"
                onClick={() => setSelectedTab('materials')}
              />
            )}
            <Button
              text={announcementsLabel}
              borderRadius="4px"
              // marginLeft={'0'}
              backgroundColor={
                selectedTab === 'announcements'
                  ? colors.uguBlue
                  : selectedTab === 'materials' && width && width > 1200
                  ? colors.uguBlue // to make sure at least one option is selected
                  : 'none'
              }
              height={'3rem'}
              width={'10rem'}
              marginRight="0.5rem"
              fontWeight="bold"
              opacity={0.5}
              onClick={() => setSelectedTab('announcements')}
            />
            <Button
              text={QALabel}
              borderRadius="4px"
              backgroundColor={selectedTab === 'qa' ? '#6BB5C9' : 'none'}
              height={'3rem'}
              width={'10rem'}
              marginRight="0.5rem"
              fontWeight="bold"
              // marginLeft="3rem"
              onClick={() => setSelectedTab('qa')}
            />
            <Button
              text={bookmarksLabel}
              borderRadius="4px"
              backgroundColor={selectedTab === 'bookmarks' ? '#6BB5C9' : 'none'}
              height={'3rem'}
              width={'10rem'}
              marginRight="0.5rem"
              fontWeight="bold"
              opacity={0.5}
              // marginLeft="3rem"
              onClick={() => setSelectedTab('bookmarks')}
            />
            <Button
              text={notesLabel}
              borderRadius="4px"
              backgroundColor={selectedTab === 'notes' ? '#6BB5C9' : 'none'}
              height={'3rem'}
              width={'10rem'}
              marginRight="0.5rem"
              fontWeight="bold"
              opacity={0.5}
              // marginLeft="3rem"
              onClick={() => setSelectedTab('notes')}
            />
          </ButtonsWrapper>
          <ProgressWrapper>
            <ProgressText>
              {progressLabel + ': ' + calculateCompletionPercentage()}
            </ProgressText>
            <ProgressBar width="8rem" value={calculateCompletionPercentage()} />
          </ProgressWrapper>
        </BelowMenuWrapper>

        {selectedTab === 'materials' && (
          <CourseMaterialsBottomWrapper>
            <CourseMaterialsSmallScreenWrapper>
              {getSections()}
            </CourseMaterialsSmallScreenWrapper>
          </CourseMaterialsBottomWrapper>
        )}

        <QASection />
        <QuestionsWrapper>
          <Question />
          <Question />
          <Question />
          <Question />
        </QuestionsWrapper>
      </BelowPlayerArea>
    </StudyCourseWrapper>
  )
}

export default StudyCourse
