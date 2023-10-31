import React, { useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { withStyles } from '@material-ui/core/styles'
import { colors } from 'configs/styles/config'
import Slider from '@material-ui/core/Slider'
import { secondsToHms } from 'helpers/secondsToHms'

type Props = {
  played: number
  loaded: number
  duration: number
  seekMouseUpHandler: Function
  setPlayed: Function
  setSecondsPlayed: Function
  setSeeking: Function
}

const scrollBarColors = {
  main: '#b0b0b0',
  loaded: '#cecece',
  played: '#ffffff',
}

const zIndexes = {
  zRail: 0,
  zThumb: 20,
  zMark: 9,
  hoverDiv: 10,
  zVideoSlider: 15,
  zVideoBarWrapper: 15,
}

const VideoBarStyles = {
  root: {
    display: 'flex',
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    position: 'absolute' as 'absolute', //workaraund for Typescipt error with Material UI
    height: '2rem',
    alignItems: 'center',
    padding: 0,
    color: colors.uguBlue,
    marginBottom: 0,
    zIndex: zIndexes.zVideoSlider,
  },
  thumb: {
    display: 'none',
  },

  track: {
    backgroundColor: 'transparent',
    height: '5px',
  },
  rail: {
    backgroundColor: 'transparent',
    // backgroundColor: scrollBarColors.main,
    height: '5px',
  },
}

const ScrollBarWrapper = styled.div`
  display: flex;
  align-self: center;
  background-color: transparent;
  width: 100%;
  z-index: ${zIndexes.hoverDiv};
  position: relative;
  align-items: center;
  margin-bottom: 0.55rem;
`
//small mark that indicates
//current place on the progress bar
//moves when user move the mouse on progress bar
const MarkMovable = styled.div<{
  left?: number
  passed?: boolean
  show?: boolean
}>`
  z-index: ${zIndexes.zMark};
  position: absolute;
  height: 5px;

  width: 1px;
  left: ${(props) => props.left + '%'};
  background-color: ${(props) => (props.passed ? 'white' : 'black')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: opacity 0.3 ease-in;
`

const MarkDiv = styled.div<{
  left?: number
  passed?: boolean
  hovered?: boolean
}>`
  left: ${(props) => (props.left ? props.left + '%' : '')};
  background-color: ${(props) => (props.passed ? 'black' : 'white')};
  position: absolute;
  z-index: ${zIndexes.zMark};

  height: 5px;
  width: 5px;

  -webkit-transition: opacity 0.4s ease, border-radius 0.25s ease,
    -webkit-transform 0.25s ease;
  transition: opacity 0.4s ease, border-radius 0.25s ease,
    -webkit-transform 0.25s ease;
  transition: transform 0.25s ease, opacity 0.4s ease, border-radius 0.25s ease;
  transition: transform 0.25s ease, opacity 0.4s ease, border-radius 0.25s ease,
    -webkit-transform 0.25s ease;
  -webkit-transform: ${(props) =>
    props.hovered ? 'scaleX(1)' : 'scaleX(0.25)'};
  transform: ${(props) => (props.hovered ? 'scaleX(1)' : 'scaleX(0.25)')};
  /* border-radius: 0; */
  -webkit-backdrop-filter: blur(0);
  backdrop-filter: blur(0);

  opacity: ${(props) => (props.hovered ? 1 : 0.7)};
  border-radius: ${(props) => (props.hovered ? '100%' : 0)};
`

const ProgressTextWrapper = styled.div<{
  left?: number
  show?: boolean
}>`
  display: flex;
  height: 30px;
  padding: 0 1rem;
  transform: translateX(-50%); // align tooltip in the middle
  /* width: 4rem; */
  bottom: 1rem;
  border-radius: 15px;
  left: ${(props) => props.left + '%'};
  background-color: rgba(29, 29, 29, 0.8);
  color: white;
  position: absolute;
  pointer-events: none;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: opacity 0.3 ease-in;
`

const VideoBarWrapper = styled.div`
  display: flex;
  position: relative;
  /* height: 16px; */
  flex-direction: column;
  width: 100%;
  justify-content: center;
`

//this is wrapper of the line with progress bar
//that shows how many was played and how many was loaded
const VideoProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
`

const VideoBar = withStyles(VideoBarStyles)(Slider)

const SliderWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  z-index: 1;
  align-items: center;
`

const ThumbDiv = styled.div<{
  left: number
}>`
  left: ${(props) => (props.left ? props.left - 0.5 + '%' : '')};
  height: 13px;
  width: 13px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  z-index: 10;
`

const TrackDiv = styled.div<{
  width: number
  color?: string
  buffer?: boolean
}>`
  height: 5px;
  width: ${(props) => (props.width ? props.width + '%' : '1px')};
  background-color: ${(props) => (props.color ? props.color : 'white')};
  z-index: ${(props) => (props.buffer ? 1 : 8)};
  border-radius: 10px;
`

const SliderBar = styled.div<{}>`
  position: absolute;
  height: 5px;
  width: 100%;
  border-radius: 10px;
  z-index: 0;
  background-color: ${scrollBarColors.main};
`

const marks = [
  {
    label: 'React',
    value: 30,
  },
  {
    label: 'Getting started with CSS',
    value: 15,
  },
]

//component should work based on the value from 0 to 100.
//That's it. We will only pass one param here
const TestHover: React.FC<Props> = (props) => {
  const {
    played, // from 0 - 100
    loaded, // from 0 - 100
    duration, // need this to show proper seconds
    setPlayed,
    setSecondsPlayed,
    setSeeking,
    seekMouseUpHandler,
  } = props
  //test
  const [left, setLeft] = useState(0) //position of the indicator on the scrollBar
  const [showTooltip, setShowTooltip] = useState(false) //show tooltip with selected point time/mark
  const [showIndicator, setShowIndicator] = useState(false) //show indicator on the scrollBar
  const [tooltipValue, setTooltipValue] = useState<string>('') //tooltip text(might be time or mark)

  const hoverDivRef = useRef<HTMLDivElement>(null)

  //handlers:
  const handleSliderChange = (_event: any, newValue: number | number[]) => {
    setSecondsPlayed(Math.floor(((newValue as number) / 100) * duration))
    setPlayed(newValue)
  }

  const currentSecHovered = (left: number) => {
    if (duration > 0) {
      return secondsToHms((duration * left) / 100)
    } else {
      return '00:00'
    }
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  //we will just have a listener, but logic from this function will move higher in hierarchy
  const handleSeekMouseUp = (_event: any, newValue: number | number[]) => {
    seekMouseUpHandler(newValue)
  }

  const mouseMoveHandler = useCallback(
    (e: { clientX: number; clientY: number }) => {
      const bonds = hoverDivRef.current?.getBoundingClientRect()
      if (bonds) {
        const x = ((e.clientX - bonds.left) / bonds.width) * 100

        if (0 < x && x !== left) {
          const xMin = x - 2
          const xMax = x + 2
          let markTouched = false
          marks.forEach((mark) => {
            if (xMin <= mark.value && mark.value <= xMax) {
              //might be redundent - do not need to set it
              //if the value is the same
              //our mouse will move and will trigger the function many times
              //each time this will reload
              if (left !== mark.value) {
                setLeft(mark.value)
                setTooltipValue(mark.label)
                markTouched = true
                setShowIndicator(false)
              }
            }
          })
          if (!markTouched) {
            setLeft(x)
            setTooltipValue(currentSecHovered(x))
            if (!showIndicator) {
              setShowIndicator(true)
            }
            if (!showTooltip) {
              setShowTooltip(true)
            }
          }
        }
      }
    },
    []
  )

  return (
    <>
      {duration && duration > 0 && (
        <ScrollBarWrapper ref={hoverDivRef} onMouseMove={mouseMoveHandler}>
          <VideoBarWrapper>
            <SliderBar />
            <VideoProgressBarWrapper>
              <TrackDiv
                width={loaded}
                color={scrollBarColors.loaded}
                buffer={true}
              />
            </VideoProgressBarWrapper>
            <SliderWrapper
              onMouseEnter={() => {
                setShowIndicator(true)
                setShowTooltip(true)
              }}
              onMouseLeave={() => {
                setShowIndicator(false)
                setShowTooltip(false)
              }}
            >
              <VideoBar
                value={played}
                onChange={handleSliderChange}
                onMouseDown={handleSeekMouseDown}
                onChangeCommitted={handleSeekMouseUp}
                step={1}
              />
              <TrackDiv width={played} />

              {/* <TrackDiv width={loaded} color="red" /> */}
              <ThumbDiv left={played} />
              <MarkMovable
                left={left}
                show={showIndicator}
                passed={left > played}
              />
              <MarkDiv
                left={marks[0].value}
                passed={marks[0].value < played}
                hovered={marks[0].value === left}
              />
              <MarkDiv
                left={marks[1].value}
                passed={marks[1].value < played}
                hovered={marks[1].value === left}
              />
            </SliderWrapper>
          </VideoBarWrapper>

          <ProgressTextWrapper left={left} show={showTooltip}>
            {tooltipValue}
          </ProgressTextWrapper>
        </ScrollBarWrapper>
      )}
    </>
  )
}

export default TestHover
