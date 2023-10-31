import React, { useEffect, useRef, useState } from 'react'
import useKeyPress from 'hooks/useKeyPress'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import NextVideoIcon from 'public/static/icons/videoPlayerIcons/nextVideoIcon'
import PreviousVideoIcon from 'public/static/icons/videoPlayerIcons/nextVideoIcon'

import { FullScreen, useFullScreenHandle } from 'react-full-screen'

import ScrollBar from './ScrollBar'
import BottomControls from './BottomControls'
import { colors } from 'configs/styles/config'
import Loader from '@components/organisms/Loader'
import XIcon from '@public/static/icons/x-icon'

//TODO:
//All this features is for v2.0:
//1. Will need to set time played rounded to 0.5sec instead of 1sec
//To make the slider change smoother
//2. Make proper marks as in Apple presentation
// white color - if they are ahead,
// grey color - if they are behind
// when hover over them present the view above
//3. Make small indicator when user hovers on the progress bar,
//it must have indicator that will move and will show the time
//if this indicator enters a range of -3+3sec where marks are located
//the value will became the one of the mark - to make it easier to select the mark

const StyledFullScreen = styled(FullScreen)`
  width: 100%;
`

const ContentWrapper = styled.div<{
  isModal: boolean
  fullscreen: boolean
  showControls: boolean
}>`
  display: flex;
  position: relative;
  flex-direction: column;
  height: ${(props) => (props.fullscreen ? '100vh' : '100%')};
  width: ${(props) =>
    props.isModal ? (props.fullscreen ? '100vw' : '100%') : '100%'};
  max-width: ${(props) =>
    props.isModal ? (props.fullscreen ? '100vw' : '40rem') : ''};
  margin: ${(props) => (props.fullscreen ? '' : '0rem')};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: 0;
  cursor: ${(props) => (props.showControls ? '' : 'none')};
  background-color: black;
  border-radius: ${(props) => (props.fullscreen ? '0' : '0.5rem')};
`
const ReactPlayerWrapper = styled.div`
  /* position: absolute;
  width: 100%;
  height: 100%; */
  z-index: 1;
  display: flex;
  position: relative;
  padding-top: 56.25%;
`

const ControlsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  outline: 0;
`

const VideoTitle = styled.div`
  margin: 1rem 2rem;
  font-size: 1.2rem;
  color: white;
`
const TopControls = styled.div`
  display: flex;
  width: 100%;
  height: 2.5rem;
`
const CenterControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const NextVideoIconWrapper = styled.div<{
  show: boolean
}>`
  display: flex;
  border-radius: 35px;
  background-color: rgba(31, 26, 26, 0.8);
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.8rem 1rem;
  margin: 0 0.5rem;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 0;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  visibility: ${(props) => (props.show ? '' : 'hidden')};
`
// const LectureTitle = styled.div`
//   display: flex;
//   color: ${colors.uguLightGrey};
//   font-size: 0.875rem;
//   margin: 0 0.5rem;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `

const BottomPart = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding: 40px 8px 0 8px;

  background-color: transparent;
  /* box-shadow: rgba(0, 0, 0, 0.3) 0px -60px 90px 0px inset; */
  /* -webkit-box-shadow: inset 0px -50px 10px -5px rgba(0, 0, 0, 0.45); */
  /* box-shadow: inset 0px -50px 80px -35px rgba(0, 0, 0, 0.65); */
  box-shadow: inset 0 -6.5rem 30px -40px rgba(0, 0, 0, 0.5),
    inset 0 -40px 30px -30px rgba(0, 0, 0, 0.4);
  /* box-shadow: 0px -51px 58px -23px rgba(0,0,0,0.37) inset; */
  /* -webkit-box-shadow: 0px -51px 58px -23px rgba(0,0,0,0.37) inset; */
  /* -moz-box-shadow: 0px -51px 58px -23px rgba(0,0,0,0.37) inset; */
  /* box-shadow: -1px -19px 42px 51px rgba(0, 0, 0, 0.36) inset;
  -webkit-box-shadow: -1px -19px 42px 51px rgba(0, 0, 0, 0.36) inset;
  -moz-box-shadow: -1px -19px 42px 51px rgba(0, 0, 0, 0.36) inset; */
`

const LoaderWrapper = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const ErrorWrapper = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: black;
  display: flex;
  flex-direction: column;
`
const ErrorIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
`
const ErrorText = styled.h4`
  color: ${colors.uguWhite};
  font-size: 1rem;
`

type VideoPlayerProps = {
  videoURL: any
  videoName: string
  isMultipleVideos?: boolean //to show/hide previous/next buttons(if false - hidden)
  showNextVideoLoader?: boolean //to show/hide nextVideoLoaderBlock
  autoPlay?: boolean //is autoPlay turned on/off
  nextVideoHandler?: () => void
  previousVideoHandler?: () => void
  nextLectureTitle: string | undefined
  previousLectureTitle: string | undefined
  onVideoProgress?: (progress: number) => void //return how many seconds played
  onVideoEndHandler?: () => void
  secPlayed?: number //seconds that were already played
  onWideScreenPressed: () => void // to switch between wide/narrow player views
  isWideScreen: boolean
  autoplay?: boolean
  showWideScreen?: boolean
  isModal?: boolean //if video player is used in the modal
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const {
    videoURL,
    videoName,
    isMultipleVideos = false,
    nextLectureTitle,
    previousLectureTitle,
    nextVideoHandler,
    previousVideoHandler,
    onVideoProgress,
    onVideoEndHandler,
    onWideScreenPressed,
    //showNextVideoLoader = false,
    secPlayed = 0,
    isWideScreen = false,
    autoplay = false,
    showWideScreen = true,
    isModal = false,
  } = props
  const [activeSource, setActiveSource] = useState<any>(null)
  const [showControls, setShowControls] = useState(false)
  // const [showNextVideoLoader, setShowNextVideoLoader] = useState(false)
  const [soundValue, setSoundValue] = useState<number | number[]>(20)
  const handle = useFullScreenHandle()

  const [played, setPlayed] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [secondsPlayed, setSecondsPlayed] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMediaError] = useState<boolean>(false)
  const [isMediaLoaded, setIsMediaLoaded] = useState<boolean>(false)
  //states for showing control buttons pop-ups

  //states for video
  // const [videoLink, setVideoLink] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState<boolean>(false) //indicates if video is playing
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [seeking, setSeeking] = useState<boolean>(false)
  const [playback, setPlayback] = useState<number>(1)

  useEffect(() => {
    console.log(videoURL)
    if (typeof videoURL === 'object') {
      setActiveSource(videoURL.original)
    } else {
      setActiveSource({
        thumbnail: null,
        video: videoURL,
      })
    }
  }, [videoURL])

  const spacePressedHandler = () => {
    setIsPlaying(!isPlaying)
  }

  const arrowLeftHandler = () => {
    const ratio = played / secondsPlayed
    setPlayed(played - ratio * 5)
    setSecondsPlayed(secondsPlayed - 5)
    seekMouseUpHandler(played - ratio * 5)
  }

  const arrowRightHandler = () => {
    const ratio = played / secondsPlayed
    setPlayed(played + ratio * 5)
    setSecondsPlayed(secondsPlayed + 5)
    seekMouseUpHandler(played + ratio * 5)
  }
  const arrowDownHandler = () => {
    changeSoundValue(undefined, (soundValue as number) - 5)
  }

  const arrowUpHandler = () => {
    changeSoundValue(undefined, (soundValue as number) + 5)
  }

  useKeyPress(' ', 'Space', spacePressedHandler)
  useKeyPress('ArrowDown', 'ArrowDown', arrowDownHandler)
  useKeyPress('ArrowUp', 'ArrowUp', arrowUpHandler)
  useKeyPress('ArrowLeft', 'ArrowLeft', arrowLeftHandler)
  useKeyPress('ArrowRight', 'ArrowRight', arrowRightHandler)
  // const [isFullscreen, setIsFullscreen] = useState<boolean>(handle.active)
  const count = useRef(0) //ranges from 0-5 representing the second, when 5 tools will be hidden
  //show/hide tools functionality
  useEffect(() => {
    const timer = setInterval(() => {
      //turn off the timer
      if (count.current > 4) {
        console.log('Clearing interval inside timer')
        if (showControls) {
          setShowControls(false)
        }
        window.clearTimeout(timer)
      } else {
        count.current = count.current + 1
        // console.log('Count in timer: ', count)
      }
    }, 1000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [showControls])

  //set initial played time from current lecture progress
  // useEffect(() => {
  //   if (secPlayed > 0) {
  //     setPlayed(secPlayed)
  //     setSecondsPlayed(secPlayed)
  //     setSeeking(true)

  //     // playerRef?.current?.seekTo((secPlayed / duration)
  //   }
  // }, [])

  const setInitialPlayedSeconds = (duration: number) => {
    if (secPlayed > 0) {
      // setPlayed(secPlayed)
      // setSecondsPlayed(secPlayed)
      // setSeeking(true)
      console.log('secPlayed / duration ', secPlayed / duration)
      playerRef?.current?.seekTo(secPlayed / duration)
    }
  }

  const onMouseMove = () => {
    count.current = 0
    if (!showControls) {
      setShowControls(true)
    }
  }

  const changeSoundValue = (_event: any, newValue: number | number[]) => {
    if (newValue <= 0 && !isMuted) {
      setIsMuted(true)
      setSoundValue(0)
    } else if (newValue > 0 && newValue <= 100) {
      if (isMuted) {
        setIsMuted(false)
      }
      setSoundValue(newValue)
    }
  }

  const durationHandler = (duration: any) => {
    console.log('onDuration', duration)
    setDuration(duration)
    setInitialPlayedSeconds(duration)
  }

  const controlsRef = useRef(null)
  const playerRef = useRef<ReactPlayer>(null)

  const onVideoProgressHandler = (changeEvent: {
    played: number
    loaded: number
    playedSeconds: number
    loadedSeconds: number
  }) => {
    // console.log(changeEvent)
    // console.log('seconds played: ' + Math.floor(changeEvent.playedSeconds))
    if (!seeking) {
      setPlayed(changeEvent.played * 100)
      setSecondsPlayed(Math.floor(changeEvent.playedSeconds))

      //call Parent method if exists
      onVideoProgress && onVideoProgress(Math.floor(changeEvent.playedSeconds))
    }
    // console.log('seconds loaded: ' + changeEvent.loaded * 100)
    setLoaded(changeEvent.loaded * 100)
  }

  const seekMouseUpHandler = (newValue: number | number[]) => {
    setSeeking(false)
    console.log('New value from hover?: ', newValue)
    if (playerRef && playerRef !== null) {
      playerRef?.current?.seekTo((newValue as number) / 100)
    }
    setIsPlaying(true)
  }

  const onSeekHandler = (seconds: number) => {
    console.log('Seeked Seconds: ', seconds)
  }

  const onReady = () => {
    console.log('============= On Ready')
    setIsMediaLoaded(true)
    if (autoplay) setIsPlaying(true)
  }

  //const onError = () => {}

  const errorHandler = (error: any) => {
    //ReactPlayer.canPlay(url)
    console.log(error)
    const autoplayErrorMsg =
      "NotAllowedError: play() failed because the user didn't interact with the document first."
    const errorMessage: string = error.toString()
    if (errorMessage.includes(autoplayErrorMsg)) {
      console.log('Autoplay was blocked due to Chrome autoplay policy')
      // Handle autoplay block, for example show a play button
      setIsMuted(false)
      setIsPlaying(false)
    } else {
      console.log('ReactPlayer onError:', errorMessage)
      // setIsMediaError(true)
    }
  }

  const onChangeQuality = async (e: number | string) => {
    if (typeof e === 'number') {
      if (videoURL[e].video) {
        const secs = secondsPlayed
        await setActiveSource(videoURL[e])
        playerRef?.current?.seekTo(secs)
      } else {
        // handle null urls
      }
    }
  }

  return (
    <StyledFullScreen handle={handle}>
      <ContentWrapper
        onMouseMove={() => onMouseMove()}
        fullscreen={handle.active}
        showControls={showControls || isPlaying}
        isModal={isModal}
      >
        {/* allows click to play/pause */}
        {activeSource && activeSource.video !== undefined && (
          <>
            {!isMediaLoaded && (
              <LoaderWrapper>
                <Loader size="medium" />
              </LoaderWrapper>
            )}
            {isMediaError && (
              <ErrorWrapper>
                <ErrorIconWrapper>
                  <XIcon color={colors.uguRed} />
                </ErrorIconWrapper>
                <ErrorText>Unable to load Video</ErrorText>
              </ErrorWrapper>
            )}
            <ReactPlayerWrapper
              onClick={() => {
                setIsPlaying(!isPlaying)
              }}
            />
            <ReactPlayer
              url={activeSource.video}
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={isMuted}
              volume={(soundValue as number) / 100}
              ref={playerRef}
              onProgress={onVideoProgressHandler}
              onDuration={durationHandler}
              onEnded={onVideoEndHandler}
              onReady={onReady}
              onError={errorHandler}
              playbackRate={playback}
              onSeek={onSeekHandler}
              autoPlay={autoplay}
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            {(showControls || !isPlaying) && duration > 0 && (
              <ControlsWrapper ref={controlsRef}>
                <TopControls>
                  <VideoTitle>{videoName}</VideoTitle>
                </TopControls>

                {isMultipleVideos && (
                  <CenterControls>
                    <NextVideoIconWrapper
                      onClick={previousVideoHandler}
                      show={!!previousLectureTitle}
                    >
                      <PreviousVideoIcon width="1rem" rotate="180" />
                      {/* <LectureTitle>{previousLectureTitle}</LectureTitle> */}
                    </NextVideoIconWrapper>
                    {nextLectureTitle && (
                      <NextVideoIconWrapper
                        onClick={nextVideoHandler}
                        show={!!nextLectureTitle}
                      >
                        {/* <LectureTitle>{nextLectureTitle}</LectureTitle> */}
                        <NextVideoIcon width="0.5rem" />
                      </NextVideoIconWrapper>
                    )}
                    {/* {
                      isMultipleVideos && {
                        showNextVideoLoader && {
                          autoPlay && {

                          }
                        }

                      }
                    } */}
                  </CenterControls>
                )}

                <BottomPart>
                  <ScrollBar
                    played={played}
                    loaded={loaded}
                    duration={duration}
                    setPlayed={setPlayed}
                    setSecondsPlayed={setSecondsPlayed}
                    setSeeking={setSeeking}
                    seekMouseUpHandler={seekMouseUpHandler}
                  />
                  <BottomControls
                    secondsPlayed={secondsPlayed}
                    duration={duration}
                    changeSoundValue={changeSoundValue}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    soundValue={soundValue}
                    setSoundValue={setSoundValue}
                    playback={playback}
                    setPlayback={setPlayback}
                    playerRef={playerRef}
                    fullscreenHandler={handle}
                    isWideScreen={isWideScreen}
                    onWideScreenPressed={onWideScreenPressed}
                    showWideScreen={showWideScreen}
                    changeQuality={onChangeQuality}
                  />
                </BottomPart>
              </ControlsWrapper>
            )}
          </>
        )}
      </ContentWrapper>
    </StyledFullScreen>
  )
}

export default VideoPlayer
