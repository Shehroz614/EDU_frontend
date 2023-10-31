import React, { useRef } from 'react'
import styled from '@emotion/styled'

const GroupedCoursesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14.5rem, 1fr));

  flex-direction: row;
  align-items: flex-start;
  margin: 0px 0 30px 0;
  margin-top: 1rem;
  width: 100%;
  flex-wrap: wrap;
  position: relative;
  column-gap: 2rem;
  row-gap: 2rem;
  //cross browser commands to hide scrollbar, but allow scrolling
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent Chrome */
  }
`

// const HorizontalScrollButton = styled.button`
//   background-color: #eeeeee;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   position: absolute;
//   top: 37%;
//   -webkit-box-shadow: 5px 5px 15px -7px rgba(0, 0, 0, 0.4);
//   box-shadow: 5px 5px 15px -7px rgba(0, 0, 0, 0.4);
//   z-index: 11;
// `

const GroupedCourses: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const containerRef = useRef<any>(null)

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <GroupedCoursesContainer ref={containerRef}>
        {children}
      </GroupedCoursesContainer>
    </div>
  )
}

export default GroupedCourses
