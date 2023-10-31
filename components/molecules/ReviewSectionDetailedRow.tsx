import React from 'react'
import styled from '@emotion/styled'
import { Progress } from '@nextui-org/react'
import Rating from '@components/atoms/Rating'
import { fontFamilies } from '@configs/styles/config'
import CloseIcon from '@public/static/icons/close-icon'
import RoundButton from '@components/atoms/RoundButton'

type Props = {
  value: number
  progress?: number
  onClick?: () => void
  onClear?: () => void
  isSelected?: boolean
  selected?: boolean
}
const RatingRowWrapper = styled.div`
  display: flex;
`

const DetailedStatisticRow = styled.div<{
  selected: boolean
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  :hover {
    cursor: pointer;
  }
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
`

const ReviewProgressBarWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-right: 1rem;
`

const RatingWrapper = styled.div`
  display: flex;
  min-width: 10rem;
`

const ClearBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
`

// TODO - migrate progressbar to native
const ReviewSectionDetailedRow: React.FunctionComponent<Props> = (props) => {
  const {
    progress = 0,
    onClick,
    value,
    selected = false,
    isSelected = false,
    onClear,
  } = props

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <RatingRowWrapper>
      <DetailedStatisticRow onClick={handleClick} selected={selected}>
        <ReviewProgressBarWrapper>
          <Progress color="warning" value={progress} size="md" />
        </ReviewProgressBarWrapper>
        <RatingWrapper>
          <Rating
            value={value}
            showText={true}
            textStyle={{
              fontFamily: fontFamilies.regular,
            }}
            text={String(progress) + '%'}
            iconMargin={'0.5rem'}
          />
        </RatingWrapper>
      </DetailedStatisticRow>

      <ClearBtn>
        {isSelected && selected && (
          <RoundButton
            onClick={isSelected ? onClear : () => {}}
            width="1rem"
            height="1rem"
          >
            <CloseIcon width="0.5rem" height="0.5rem" />
          </RoundButton>
        )}
      </ClearBtn>
    </RatingRowWrapper>
  )
}

export default ReviewSectionDetailedRow
