import React from 'react'
import styled from '@emotion/styled'
//import { colors } from '@configs/styles/config'
import { Progress } from '@nextui-org/react'

type Props = {
  withPercentage?: boolean
  value: number //percentages loaded
  height?: string
  width?: string
  percentOnLeft?: boolean //if true show percentage on the left side
}

// type ProgressBarProps = {
//   height: string
//   width?: string
// }

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Percentages = styled.div<{ percentOnLeft: boolean }>`
  font-size: 0.875rem;
  margin-right: ${(props) => (props.percentOnLeft ? '0.5rem' : '')};
  margin-left: ${(props) => (!props.percentOnLeft ? '0.5rem' : '')};
`

// const styles = {
//   root: {
//     height: (props: ProgressBarProps) => (props.height ? props.height : '4px'),
//     width: (props: ProgressBarProps) => (props.width ? props.width : '9.5rem'),
//     borderRadius: 10,
//   },
//   colorPrimary: {
//     backgroundColor: '#d8d8d8',
//   },
//   bar: {
//     borderRadius: 10,
//     backgroundColor: colors.uguRed,
//   },
// }

//const ReviewProgressBar = withStyles(styles)(LinearProgress)

const ProgressBar: React.FC<Props> = (props) => {
  const {
    withPercentage = true,
    value,
    height = '',
    width = '',
    percentOnLeft = true,
  } = props
  return (
    <ProgressBarWrapper>
      {/* {withPercentage && percentOnLeft && (
        <Percentages percentOnLeft={percentOnLeft}>{value}%</Percentages>
      )} */}
      {/* <ReviewProgressBar
        variant="determinate"
        //-1 to improve the look of UI
        value={value}
        width={width}
        height={height}
      /> */}
      <Progress
        value={value}
        css={{ width: width, height: height }}
        size="sm"
        color={'primary'}
      />
      {withPercentage && !percentOnLeft && (
        <Percentages percentOnLeft={percentOnLeft}>{value}%</Percentages>
      )}
    </ProgressBarWrapper>
  )
}

export default ProgressBar
