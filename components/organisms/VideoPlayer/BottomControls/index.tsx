import React, { useEffect, useRef, useState } from 'react'
import Zoom from '@material-ui/core/Zoom'
import styled from '@emotion/styled'
import { withStyles } from '@material-ui/styles'
import { Slider, Tooltip } from '@material-ui/core'

//icons
import PlayIcon from 'public/static/icons/videoPlayerIcons/playIcon'
import PauseIcon from 'public/static/icons/videoPlayerIcons/pauseIcon'
import SoundIcon from 'public/static/icons/videoPlayerIcons/soundIcon'
import LowSoundIcon from 'public/static/icons/videoPlayerIcons/lowSoundIcon'
import MuteIcon from 'public/static/icons/videoPlayerIcons/muteIcon'
import FullScreenIcon from 'public/static/icons/videoPlayerIcons/fullScreenIcon'
import SettingIcon from 'public/static/icons/videoPlayerIcons/settingsIcon'
import SubtitlesIcon from 'public/static/icons/videoPlayerIcons/subtitlesIcon'
import WideScreenIcon from 'public/static/icons/videoPlayerIcons/wideScreenIcon'
import SettingsDropdown from '../SettingsDropdown'
import { secondsToHms } from 'helpers/secondsToHms'
import ReactPlayer from 'react-player'
import { FullScreenHandle } from 'react-full-screen'

const BottomControlsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.5rem;
  height: 2.5rem;
  /* background-color: rgba(29, 29, 29, 0.8); */
  bottom: 0;
  justify-content: space-between;
  align-items: center;
`

const LeftControls = styled.div`
  display: flex;
  align-items: center;
`

const RightControls = styled.div`
  display: flex;
  align-items: center;
`

const PlayIconWrapper = styled.div`
  display: flex;
  height: 1rem;
  width: 1rem;
  /* margin-left: 0.rem; */
  cursor: pointer;
`
const SoundIconWrapper = styled.div`
  display: flex;
  height: 1rem;
  width: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`
const SoundProgressWrapper = styled.div`
  display: flex;
  height: 1rem;
  width: 4rem;
  margin-left: 1rem;
  align-items: center;
  cursor: pointer;
`
const SoundBarStyles = {
  root: {
    height: '4px',
    width: '4rem',
    borderRadius: 10,
    color: 'white',
  },
  thumb: {
    height: '9px',
    width: '9px',
    marginTop: '-3px',
    marginLeft: '-3px',
    '&:focus': {
      boxShadow: 'inherit',
    },
    '&:hover, &$active': {
      boxShadow: '0 0px 14px 5px',
    },
  },
  track: {
    height: '3px',
    borderRadius: '10px',
  },
  rail: {
    height: '3px',
  },
}

//RightControls
const SettingIconWrapper = styled.div`
  display: flex;
  height: 1.1rem;
  width: 1.1rem;
  margin-right: 1rem;
  fill: 'white';
  cursor: pointer;
`
const FullScreenIconWrapper = styled.div`
  display: flex;
  height: 1.1rem;
  width: 1.1rem;
  /* margin-right: 1.5rem; */
  fill: 'white';
  cursor: pointer;
`
const WideScreenIconWrapper = styled.div`
  display: flex;
  height: 1rem;
  width: 1.3rem;
  margin-right: 1rem;
  cursor: pointer;
`
const SubtitlesIconWrapper = styled.div`
  display: flex;
  height: 1.1rem;
  width: 1.2rem;
  margin-right: 1rem;
  cursor: pointer;
`
const TooltipStyles = {
  tooltip: {
    marginBottom: '1.5rem',
  },
}

const SettingsDropdowns = styled.div`
  display: flex;
`

const TimeLabelWrapper = styled.div`
  display: flex;
  height: 1rem;
  width: 8rem;
  margin-left: 1rem;
  align-items: center;
  color: white;
  font-size: 0.8rem;
`

const CustomTooltip = withStyles(TooltipStyles)(Tooltip)

const SoundBar = withStyles(SoundBarStyles)(Slider)

type BottomControlsProps = {
  secondsPlayed: number
  duration: number
  changeSoundValue: (_event: any, newValue: number | number[]) => void
  isPlaying: boolean
  setIsPlaying: Function
  isMuted: boolean
  isWideScreen: boolean
  setIsMuted: Function
  soundValue: number | number[]
  setSoundValue: Function
  playback: number
  setPlayback: Function
  playerRef: React.RefObject<ReactPlayer>
  // settingsButtonDivRef: React.RefObject<HTMLDivElement> //?
  // settingsDivRef: React.RefObject<HTMLDivElement> //?
  onWideScreenPressed: () => void
  fullscreenHandler: FullScreenHandle
  showWideScreen?: boolean
  changeQuality: (e: number | string) => void
}

const BottomControls: React.FC<BottomControlsProps> = (props) => {
  const {
    secondsPlayed, //must be in parent
    duration, //must be in parent
    changeSoundValue, //must be in parent
    isPlaying, //must be in parent
    setIsPlaying, //must be in parent
    isMuted, //must be in parent
    setIsMuted, //must be in parent
    soundValue, //must be in parent
    setSoundValue, //must be in parent
    playback, //must be in parent
    setPlayback, //must be in parent
    playerRef, //must be in parent
    // settingsButtonDivRef, //?
    // settingsDivRef, //?
    onWideScreenPressed, //must be in parent
    fullscreenHandler, //must be in parent
    showWideScreen = true,
    changeQuality,
  } = props

  //hover states
  const [hoverOnPlay, setHoverOnPlay] = useState<boolean>(false)
  const [hoverOnFullscreen, setHoverOnFullscreen] = useState<boolean>(false)
  const [hoverOnSettings, setHoverOnSettings] = useState<boolean>(false)
  const [hoverOnSound, setHoverOnSound] = useState<boolean>(false)
  const [hoverOnSubtitles, setHoverOnSubtitles] = useState<boolean>(false)
  const [hoverOnWidescreen, setHoverOnWidescreen] = useState<boolean>(false)

  //show states
  const [showSettings, setShowSettings] = useState(false)

  //methods
  const changePlaybackHandler = (newPlayback: number) => {
    if (newPlayback !== playback) {
      setPlayback(newPlayback)
    }
  }

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick)
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const settingsDivRef = useRef<HTMLDivElement>(null)
  const settingsButtonDivRef = useRef<HTMLDivElement>(null)

  const handleClick = (e: MouseEvent): void => {
    if (
      settingsDivRef!.current!.contains(e.target as Node) ||
      settingsButtonDivRef!.current!.contains(e.target as Node)
    ) {
      // inside click
      return
    }
    // outside click
    setShowSettings(false)
  }

  return (
    <BottomControlsWrapper>
      <LeftControls>
        <CustomTooltip
          title={!isPlaying ? 'Play' : 'Pause'}
          placement="top"
          TransitionComponent={Zoom}
          PopperProps={{ container: playerRef.current }}
          ref={settingsButtonDivRef}
        >
          <PlayIconWrapper
            onMouseOver={() => {
              setHoverOnPlay(true)
            }}
            onMouseOut={() => {
              setHoverOnPlay(false)
            }}
            onClick={() => {
              setIsPlaying(!isPlaying)
            }}
          >
            {!isPlaying ? (
              <PlayIcon color={hoverOnPlay ? 'white' : 'white'} />
            ) : (
              <PauseIcon color={hoverOnPlay ? 'white' : 'white'} />
            )}
          </PlayIconWrapper>
        </CustomTooltip>
        <CustomTooltip
          title={isMuted ? 'Unmute' : 'Mute'}
          placement="top"
          TransitionComponent={Zoom}
          PopperProps={{ container: playerRef.current }}
        >
          <SoundIconWrapper
            onMouseOver={() => {
              setHoverOnSound(true)
            }}
            onMouseOut={() => {
              setHoverOnSound(false)
            }}
            onClick={() => {
              setIsMuted(!isMuted)
              if (soundValue === 0) {
                setSoundValue(10)
              }
            }}
          >
            {isMuted ? (
              <MuteIcon
                color={hoverOnSound ? 'white' : 'white'}
                height="1rem"
              />
            ) : soundValue < 30 ? (
              <LowSoundIcon
                color={hoverOnSound ? 'white' : 'white'}
                height="1rem"
              />
            ) : (
              <SoundIcon
                color={hoverOnSound ? 'white' : 'white'}
                height="1rem"
              />
            )}
          </SoundIconWrapper>
        </CustomTooltip>
        <SoundProgressWrapper>
          <SoundBar
            value={isMuted ? 0 : soundValue}
            onChange={changeSoundValue}
          />
        </SoundProgressWrapper>
        <TimeLabelWrapper>
          {secondsToHms(secondsPlayed)} / {secondsToHms(duration)}
        </TimeLabelWrapper>
      </LeftControls>
      <RightControls>
        <SubtitlesIconWrapper
          onMouseOver={() => {
            setHoverOnSubtitles(true)
          }}
          onMouseOut={() => {
            setHoverOnSubtitles(false)
          }}
        >
          <SubtitlesIcon color={hoverOnSubtitles ? 'white' : 'white'} />
        </SubtitlesIconWrapper>
        <CustomTooltip
          title={!showSettings ? 'Settings' : ''}
          placement="top"
          TransitionComponent={Zoom}
          PopperProps={{ container: playerRef.current }}
          leaveDelay={0}
          // disableHoverListener={showSettings}
        >
          <SettingIconWrapper
            ref={settingsButtonDivRef}
            onMouseOver={() => {
              setHoverOnSettings(true)
            }}
            onMouseOut={() => {
              setHoverOnSettings(false)
            }}
            onClick={() => {
              setShowSettings(!showSettings)
            }}
          >
            <SettingIcon
              color={hoverOnSettings || showSettings ? 'white' : 'white'}
            />
          </SettingIconWrapper>
        </CustomTooltip>
        <CustomTooltip
          title="Wide screen"
          placement="top"
          TransitionComponent={Zoom}
          PopperProps={{ container: playerRef.current }}
        >
          {showWideScreen ? (
            <WideScreenIconWrapper
              onMouseOver={() => {
                setHoverOnWidescreen(true)
              }}
              onMouseOut={() => {
                setHoverOnWidescreen(false)
              }}
              onClick={() => {
                onWideScreenPressed()
              }}
            >
              <WideScreenIcon color={hoverOnWidescreen ? 'white' : 'white'} />
            </WideScreenIconWrapper>
          ) : (
            <></>
          )}
        </CustomTooltip>
        <CustomTooltip
          title="Fullscreen"
          placement="top"
          TransitionComponent={Zoom}
          PopperProps={{ container: playerRef.current }}
        >
          <FullScreenIconWrapper
            onMouseOver={() => {
              setHoverOnFullscreen(true)
            }}
            onMouseOut={() => {
              setHoverOnFullscreen(false)
            }}
            onClick={() => {
              if (!fullscreenHandler.active) {
                fullscreenHandler.enter()
              } else {
                fullscreenHandler.exit()
              }
            }}
          >
            <FullScreenIcon color={hoverOnFullscreen ? 'white' : 'white'} />
          </FullScreenIconWrapper>
        </CustomTooltip>
        <SettingsDropdowns ref={settingsDivRef}>
          {showSettings && (
            <SettingsDropdown
              playback={playback}
              setPlayback={changePlaybackHandler}
              quality={0}
              setQuality={(arg0: number) => changeQuality(arg0)}
            />
          )}
        </SettingsDropdowns>
      </RightControls>
    </BottomControlsWrapper>
  )
}

export default BottomControls
