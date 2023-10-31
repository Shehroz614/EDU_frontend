import { fontFamilies } from '@configs/styles/config'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ReactSlider from 'react-slider'
//import { useSearchContext } from "@contexts/Search";

interface TrackProps {
  index: number
}

const StyledContainer = styled.div`
  width: 100%;
  margin: 0.5rem 0 -0.5rem 0;
  text-align: center;
  padding: 1rem 4rem;
  @media (max-width: 550px) {
    padding: 0;
  }
`

const StyledSlider = styled(ReactSlider)<{}>`
  height: 5px;
  margin: auto;
  text-align: center;
  outline: none;
  :focus {
    outline: none;
  }
`

const StyledThumb = styled.div`
  cursor: pointer;
  width: 19px;
  height: 19px;
  position: absolute;
  background-color: #1a1e3d;
  border: 1px solid #1a1e3d;
  border-radius: 100%;
  margin-top: -7px;
  outline: none;
  :focus {
    outline: none;
  }
`

const StyledTrack = styled.div<TrackProps>`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? '#D9D9D9' : props.index === 1 ? '#1A1E3D' : '#D9D9D9'};
  border-radius: 3px;
`

const PriceWrapper = styled.div`
  font-family: ${fontFamilies.light};
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`

const PriceNumber = styled.div`
  border: 1px solid black;
  border-radius: 0.35rem;
  margin: 1rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  height: 60px;
  flex-grow: 1;
  padding: 0.3rem 0.5rem;
`

const DollarSign = styled.div`
  margin-right: 0.3rem;
  font-size: 20px;
  font-family: ${fontFamilies.regular};
`

const PriceInput = styled.input<{ valueLength: number }>`
  font-family: ${fontFamilies.regular};
  font-size: 15px;
  /* width: ${({ valueLength }) => `${valueLength * 8.5 + 5}px`}; */
  border-radius: 0.35rem;
  text-align: left;
  border: none;
  width: 100%;
  font-size: 20px;
  -webkit-appearance: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const Thumb = (props: { [key: string]: any }) => (
  <StyledThumb {...props}></StyledThumb>
)

const Track = (props: any, state: any) => (
  <StyledTrack index={state.index} {...props} />
)

const RangeSlider = (props: {
  changePrice: Function
  limits: { min: number; max: number }
  price: { min: number; max: number }
}) => {
  const { changePrice, limits, price } = props

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1300)
  //const [cnt, setCnt] = useState(0)

  const [value, setValue] = useState<number | readonly number[]>([min, max])
  //const { state, dispatch } = useSearchContext();

  //const [prevPrice, setPrevPrice] = useState(state.searchObject.filters.price)

  useEffect(() => {
    //console.log("diff",isEmpty(difference(state.searchObject.filters.price, prevPrice)), state.searchObject.filters.price, prevPrice)
    // if(isEmpty(difference(state.searchObject.filters.price, prevPrice))){
    //   setCnt(cnt+1)
    //   //console.log("diff res", state.results)
    //   let tempMin = 100, tempMax = 0;
    //   state.results.map(async (result) => {
    //     if((result?.price || 0) < tempMin){
    //       tempMin = result?.price || 0
    //     }
    //     else if((result?.price || 0) > tempMax){
    //       tempMax = result?.price
    //     }
    //     console.log([tempMin, tempMax], result?.price, (result?.price || 0) < min, (result?.price || 0) > max)
    //     setMin(tempMin)
    //     setMax(tempMax)
    //   })
    // }
    // else{
    //   setPrevPrice(state.searchObject.filters.price)
    // }
    setMin(limits.min)
    setMax(limits.max)
  }, [limits])

  useEffect(() => {
    setValue([min, max])
    //console.log([min, max])
  }, [min, max])

  useEffect(() => {
    if (price.max != Number.MAX_SAFE_INTEGER) setValue([price.min, price.max])
    else setValue([limits.min, limits.max])
  }, [price])

  return (
    <StyledContainer>
      <StyledSlider
        onChange={(newValue: number | readonly number[]) => {
          setValue(newValue)
          //dispatch({type: "setPrice", payload: {price: {"min": JSON.parse(JSON.stringify(newValue))[0], "max": JSON.parse(JSON.stringify(newValue))[1]}}})
          changePrice({
            min: JSON.parse(JSON.stringify(newValue))[0],
            max: JSON.parse(JSON.stringify(newValue))[1],
          })
        }}
        value={value}
        defaultValue={[min, max]}
        renderTrack={Track}
        renderThumb={Thumb}
        max={max}
        min={min}
      />
      <PriceWrapper>
        <PriceNumber>
          <div
            style={{
              fontSize: 12,
              fontFamily: fontFamilies.light,
              width: 'max-content',
            }}
          >
            min price
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DollarSign>$</DollarSign>
            <PriceInput
              type="number"
              valueLength={
                JSON.stringify(JSON.parse(JSON.stringify(value))[0]).length
              }
              value={parseInt(JSON.parse(JSON.stringify(value))[0])}
              onChange={(event) => {
                let minValue = parseInt(event.target.value)
                if (minValue > value[1]) [(minValue = value[1])]
                setValue([minValue, JSON.parse(JSON.stringify(value))[1]])
                //dispatch({type: "setPrice", payload: {price: {"min": parseInt(event.target.value), "max": JSON.parse(JSON.stringify(value))[1]}}})
                changePrice({
                  min: JSON.parse(JSON.stringify(minValue)),
                  max: JSON.parse(JSON.stringify(value))[1],
                })
              }}
            />
          </div>
        </PriceNumber>
        <div
          style={{
            borderTop: '1px solid black',
            width: '14px',
            height: 0,
            margin: '0 1rem',
          }}
        ></div>
        <PriceNumber>
          <div
            style={{
              fontSize: 12,
              fontFamily: fontFamilies.light,
              width: 'max-content',
            }}
          >
            max price
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DollarSign>$</DollarSign>
            <PriceInput
              type="number"
              valueLength={
                JSON.stringify(JSON.parse(JSON.stringify(value))[1]).length
              }
              value={
                parseInt(JSON.parse(JSON.stringify(value))[1]) > 1299
                  ? 1300
                  : parseInt(JSON.parse(JSON.stringify(value))[1])
              }
              onChange={(event) => {
                setValue([
                  JSON.parse(JSON.stringify(value))[0],
                  parseInt(event.target.value),
                ])
                //dispatch({type: "setPrice", payload: {price: {"min": event.target.value, "max": parseInt(event.target.value)}}})
                changePrice({
                  min: JSON.parse(JSON.stringify(value))[0],
                  max: JSON.parse(JSON.stringify(event.target.value)) || 0,
                })
              }}
            />
          </div>
        </PriceNumber>
      </PriceWrapper>
    </StyledContainer>
  )
}

export default RangeSlider
