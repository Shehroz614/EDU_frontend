import styled from '@emotion/styled'
import { keyframes } from '@emotion/css'

const LoaderWrapper = styled.div<{ size: string }>`
  width: ${(props) =>
    props.size === 'large'
      ? '70px'
      : props.size === 'medium'
      ? '40px'
      : '20px'};
  height: ${(props) =>
    props.size === 'large'
      ? '70px'
      : props.size === 'medium'
      ? '40px'
      : '20px'};
`
const load = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`
const ReactLoader = styled.div<{ size: string; color?: string }>`
  position: relative;
  text-indent: -9999em;
  border-top: 4px solid rgba(0, 0, 0, 0.2);
  border-right: 4px solid rgba(0, 0, 0, 0.2);
  border-bottom: 4px solid rgba(0, 0, 0, 0.2);
  border-left: 4px solid #2962ff;
  transform: translateZ(0);
  animation: ${load} 1.1s infinite linear;
  border-radius: 50%;
  border-width: ${(props) =>
    props.size === 'large' ? '10px' : props.size === 'medium' ? '7px' : '4px'};
  width: 100%;
  height: 100%;
  &:after {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`

export { LoaderWrapper, ReactLoader }
