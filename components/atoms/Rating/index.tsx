import { colors } from '@configs/styles/config'
import StarIcon from '@public/static/icons/empty-star'
import React, { useCallback, useEffect, useState } from 'react'
import {
  EmptyIconWrapper,
  FilledIconWrapper,
  IconsWrapper,
  IconWrapper,
  PercentFilledIconWrapper,
  RatingWrapper,
  ReviewsNumber,
  TextWrapper,
} from './styled.components'

type RatingProps = {
  /**
   * A value of the rating
   */
  value: number
  /**
   * If true - rating will not be editable
   */
  readOnly?: boolean
  /**
   * Returns a new value whenever rating value has been changed
   */
  onValueChange?: (newValue: number) => void
  /**
   * Margin between rating icons
   */
  iconMargin?: string
  /**
   * Margin right of the Rating component
   */
  marginRight?: string
  /**
   * Margin left of the Rating component
   */
  marginLeft?: string
  /**
   * If true - show rating number on the left
   */
  showNumber?: boolean
  /**
   * If true - rating number is editable
   */
  numberEditable?: boolean // is rating number editable
  /**
   * If true - show rating text
   */
  showText?: boolean // show text on the right
  /**
   * The text to show on the right
   */
  text?: string // text to show on the right
  /**
   * Styles applied to the rating number on the right
   */
  numberStyle?: React.CSSProperties | undefined
  /**
   * Styles applied to the text on the right
   */
  textStyle?: React.CSSProperties | undefined
  /**
   * Rating icon width that will determine its size
   */
  iconWidth?: string
  iconStyle?: React.CSSProperties | undefined
  style?: React.CSSProperties | undefined
}

//TODO -
//1. Rating

//NOTE - Rating component can:
// 1. Be read-only - display the rating
// 2. Have text on the right(usually used for number of reviews)
// 3. Have a number on the left(editable or not) - represents rating value

const Rating: React.FC<RatingProps> = (props) => {
  const {
    value = 3.2,
    onValueChange = () => {},
    iconMargin,
    readOnly = true,
    showNumber = false,
    //numberEditable = false,
    showText = false,
    text,
    textStyle,
    numberStyle,
    iconWidth = '23px',
    marginLeft = '',
    marginRight = '',
    iconStyle,
    style,
  } = props
  const [ratingValue, setRatingValue] = useState<number>(value)
  const [highlightedValue, setHighlightedValue] = useState<number>(0) //used to highlight stars

  useEffect(() => {
    setHighlightedValue(value)
    setRatingValue(value)
  }, [value])

  const onValueChangeHandler = useCallback(
    (newValue: number) => {
      if (!readOnly) {
        setHighlightedValue(newValue)
        //onValueChange(newValue)
        setRatingValue(newValue)
      }
    },
    [readOnly]
  )

  //This function is being called whenever the rating number is being updated
  const onRatingNumberChange = useCallback(
    (newValue: string) => {
      //check if the number is valid
      const isValid = /^(?:[1-4](?:\.\d)?|5(?:\.0)?)$/.test(newValue)

      //check if valid or if empty(to allow deletion)
      if (isValid || newValue === '') {
        setRatingValue(parseFloat(newValue))

        //check if valid and set the value
        if (isValid) {
          onValueChange(parseFloat(newValue))
        }
      }
    },
    [onValueChange]
  )

  const getIcons = useCallback(() => {
    let remainingValue =
      highlightedValue > ratingValue ? highlightedValue : ratingValue //rating value
    const dummyArray = Array(5).fill('')
    return dummyArray.map((_, index) => {
      //logic to get icons filled to some percent
      const remainingIconWidth =
        remainingValue > 1 ? 100 : remainingValue > 0 ? remainingValue * 100 : 0

      //subtract 1 point from the value
      if (remainingValue > 0) {
        remainingValue--
      }

      return (
        <IconWrapper
          key={'ratingIcon' + index}
          onMouseEnter={() => onValueChangeHandler(index + 1)}
          onMouseLeave={() => onValueChangeHandler(value)}
          iconWidth={iconWidth}
          onClick={() => {
            if (!readOnly) {
              setRatingValue(index + 1)
              onValueChange(index + 1)
            }
          }}
          marginRight={index < dummyArray.length ? iconMargin : ''}
          style={iconStyle}
        >
          <EmptyIconWrapper>
            <StarIcon
              width={iconWidth}
              color={colors.uguLighterGrey}
              fill={true}
            />
          </EmptyIconWrapper>
          <PercentFilledIconWrapper width={remainingIconWidth}>
            <FilledIconWrapper>
              <StarIcon width={iconWidth} fill={true} />
            </FilledIconWrapper>
          </PercentFilledIconWrapper>
        </IconWrapper>
      )
    })
  }, [
    highlightedValue,
    ratingValue,
    iconWidth,
    iconMargin,
    onValueChangeHandler,
    value,
    readOnly,
    onValueChange,
  ])

  return (
    <RatingWrapper
      marginLeft={marginLeft}
      marginRight={marginRight}
      style={style}
    >
      {showNumber && (
        <ReviewsNumber
          type="number"
          step="0.1"
          min="0"
          max="5"
          style={numberStyle}
          value={ratingValue.toFixed(1)}
          onChange={(event) => {
            onRatingNumberChange(event.target.value)
          }}
          disabled={readOnly}
        />
      )}
      <IconsWrapper>{getIcons()}</IconsWrapper>
      {showText && text && (
        <TextWrapper style={textStyle}>{parseInt(text)}</TextWrapper>
      )}
    </RatingWrapper>
  )
}

export default React.memo(Rating)
