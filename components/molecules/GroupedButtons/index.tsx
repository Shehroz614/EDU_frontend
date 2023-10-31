import React from 'react'
import styled from '@emotion/styled'
import GroupedButton from '../../atoms/GroupButton'
import { useState, useRef, useEffect } from 'react'
import { useWindowSize } from 'react-use'
import getCategories from '@services/api/category/getCategories'
import { motion } from 'framer-motion'
import { Category } from '@type/main'

const GroupedButtonsContainer = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  height: 60px;
  //cross browser commands to hide scrollbar, but allow scrolling
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0;
    display: none;
    background: transparent; /* make scrollbar transparent Chrome */
  }
`
const GroupedButtonsContainerWrapper = styled.div`
  width: 100%;
  position: relative;
`
const HorizontalScrollButton = styled.button`
  background-color: #eeeeee;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  -webkit-box-shadow: 5px 5px 15px -7px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 15px -7px rgba(0, 0, 0, 0.4);
`

const GroupedButtons = (props: { setCategory?: Function }) => {
  const [activeButton, setActiveButton] = useState<number>(-1)
  const [prevButton, setPrevButton] = useState<number>(0)
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 })
  const [showBtns, setShowBtns] = useState<boolean>(false)
  const [buttonsLens, setButtonsLens] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { setCategory = () => {} } = props

  const { width: windowWidth } = useWindowSize()

  const containerRef = useRef<any>(null)

  const handleClickRight = () => {
    containerRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth',
    })
  }
  const handleClickLeft = () => {
    containerRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset({
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      })
    }

    containerRef?.current?.addEventListener('scroll', handleScroll)
    return () => {
      containerRef?.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setShowBtns(windowWidth - 16 != 700)
  }, [windowWidth])

  const [categories, setCategories] = useState<any[]>([])

  const getCategoriesAPI = async () => {
    setIsLoading(true)
    setCategories(await getCategories())
    setIsLoading(false)
  }

  useEffect(() => {
    getCategoriesAPI()
  }, [])

  useEffect(() => {
    // if (categories[0]?._id) {
    //   setCategory(categories[0]?._id)
    // }
  }, [categories])

  useEffect(() => {
    if (buttonsLens.length != categories?.length) setButtonsLens([])

    if (buttonsLens.length == 0) {
      categories?.forEach((element: any) => {
        const localArray = buttonsLens
        localArray.push(element.name.en.length * 7.75 + 32)
        setButtonsLens(localArray)
      })
    }
  }, [categories])

  return (
    <GroupedButtonsContainerWrapper>
      <GroupedButtonsContainer ref={containerRef}>
        {categories?.map((item: Category, index: number) => {
          return (
            <GroupedButton
              key={item._id}
              active={activeButton == index}
              current={activeButton}
              index={index}
              prevButton={prevButton}
              avgWidth={buttonsLens}
              onClick={() => {
                setCategory(item._id)
                setPrevButton(activeButton)
                setActiveButton(index)
              }}
            >
              {item.name.en}
            </GroupedButton>
          )
        })}
      </GroupedButtonsContainer>
      {!isLoading && (
        <motion.div
          initial={{
            opacity: scrollOffset.x != 0 && showBtns ? 0 : 1,
            scale: 0.5,
          }}
          animate={{
            opacity: scrollOffset.x != 0 && showBtns ? 1 : 0,
            scale: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,1) 70%, rgba(0,212,255,0) 96%)',
              position: 'absolute',
              top: '27%',
              paddingRight: 20,
            }}
          >
            <HorizontalScrollButton onClick={handleClickLeft}>
              <div>&#10094;</div>
            </HorizontalScrollButton>
          </div>
        </motion.div>
      )}
      {!isLoading && (
        <motion.div
          initial={{
            opacity:
              scrollOffset.x + containerRef?.current?.clientWidth != 700 &&
              showBtns
                ? 0
                : 1,
            scale: 0.5,
          }}
          animate={{
            opacity:
              scrollOffset.x + containerRef?.current?.clientWidth != 700 &&
              showBtns
                ? 1
                : 0,
            scale: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              background:
                'linear-gradient(270deg, rgba(255,255,255,1) 70%, rgba(0,212,255,0) 96%)',
              position: 'absolute',
              top: '27%',
              right: '-10px',
              paddingLeft: 20,
            }}
          >
            <HorizontalScrollButton
              onClick={handleClickRight}
              style={{ right: '-10px' }}
            >
              <div>&#10095;</div>
            </HorizontalScrollButton>
          </div>
        </motion.div>
      )}
    </GroupedButtonsContainerWrapper>
  )
}

export default GroupedButtons
