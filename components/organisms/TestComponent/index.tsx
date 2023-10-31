import styled from '@emotion/styled'
import React from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import TextViewer from '../TextViewer'

const TextContentWrapper = styled.div`
  width: '100%';
  height: '50rem';

  .fullscreen-enabled {
    background-color: white;
    justify-content: center;
    display: flex;
  }
`

function TestComponent() {
  const handle = useFullScreenHandle()
  return (
    <TextContentWrapper>
      <FullScreen handle={handle}>
        <div
          style={{
            // backgroundColor: 'yellow',
            position: 'relative',
            display: 'flex',
            height: '100%',
            // width: '100%',
          }}
        >
          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: !handle.active ? '100%' : '40rem',
            }}
          > */}
          <div
            style={{
              display: 'flex',
              position: 'relative',
              paddingTop: '56.25%',
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              //   backgroundColor: 'green',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: !handle.active ? '100%' : '40rem',
                alignSelf: 'center',
              }}
            >
              <TextViewer value={'<p>sadada</p>'} />
            </div>
            {/* </div> */}
            <div
              onClick={() => {
                if (!handle.active) {
                  handle.enter()
                } else {
                  handle.exit()
                }
              }}
            >
              Full Screen
            </div>
          </div>
        </div>
      </FullScreen>
    </TextContentWrapper>
  )
}

export default TestComponent
