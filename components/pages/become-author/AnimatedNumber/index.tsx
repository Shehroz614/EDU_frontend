import styled from '@emotion/styled'
import { formatNumber } from '@utils/formatNumber'
import { useState, useEffect } from 'react'

type AnimatedNumberProps = {
  value: number
}

const AnimatedNumberWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Column = styled.div`
  display: inline-block;
  overflow: hidden;
  height: 3.5rem; // This should match Digit's height
  line-height: 3.5rem; // Added for vertical alignment
  vertical-align: top; // Added to ensure numbers align at the top
`

const NumberWrapper = styled.div<{ offset: number }>`
  transform: translateY(${(props) => props.offset * -3.5}rem);
  transition: transform 0.8s ease-in-out;
`

const Digit = styled.div`
  height: 3.5rem; // Ensuring each digit has the correct height
`

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const formattedValue = formatNumber(value)
  const [offsets, setOffsets] = useState<number[]>(
    formattedValue.split('').map(() => 9)
  )

  useEffect(() => {
    const newFormattedValue = formatNumber(value)
    const newOffsets = newFormattedValue
      .split('')
      .map((digit) => (digit !== ',' ? 9 - parseInt(digit, 10) : 0))
    setOffsets(newOffsets)
  }, [value])

  return (
    <AnimatedNumberWrapper>
      $
      {formattedValue.split('').map((char, index) => {
        if (char === ',') return <span key={index}>,</span>

        return (
          <Column key={index}>
            <NumberWrapper offset={offsets[index]}>
              {Array.from({ length: 10 }).map((_, num) => (
                <Digit key={num}>{9 - num}</Digit>
              ))}
            </NumberWrapper>
          </Column>
        )
      })}
    </AnimatedNumberWrapper>
  )
}

export default AnimatedNumber
