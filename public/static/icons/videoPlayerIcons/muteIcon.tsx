import React from 'react'

type PlayIconProps = {
  color?: string
  width?: string
  height?: string
}

const MuteIcon: React.FunctionComponent<PlayIconProps> = (props) => {
  const { width, height, color } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 24 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Symbols"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Group-4" fill={color ? color : '#D8D8D8'}>
          <g id="Group-2" transform="translate(0.000000, 1.201160)">
            <g id="speaker-filled-audio-tool" fillRule="nonzero">
              <path
                d="M12.0072227,15.7541191 C12.0072227,16.175454 11.7629354,16.5582288 11.38064,16.7368912 C11.2328294,16.8065567 11.0744425,16.8402327 10.9170875,16.8402327 C10.667899,16.8402327 10.4210321,16.754886 10.2216297,16.5901052 L4.26329021,11.6698178 L1.08987724,11.6698178 C0.488058636,11.670332 0,11.1837017 0,10.5839613 L0,6.2567305 C0,5.65673307 0.488058636,5.17035984 1.08987724,5.17035984 L4.26354817,5.17035984 L10.2218877,0.250072445 C10.5474321,-0.0188210043 10.9988605,-0.0761472367 11.380898,0.103800578 C11.7629354,0.282463051 12.0074806,0.665494828 12.0074806,1.08657271 L12.0072227,15.7541191 L12.0072227,15.7541191"
                id="Shape"
              ></path>
            </g>
            <rect
              id="Rectangle"
              stroke={color ? color : '#D8D8D8'}
              transform="translate(19.000000, 8.798840) rotate(-45.000000) translate(-19.000000, -8.798840) "
              x="14.5"
              y="8.29884041"
              width="9"
              height="1"
              rx="0.5"
            ></rect>
            <rect
              id="Rectangle"
              stroke={color ? color : '#D8D8D8'}
              transform="translate(19.000000, 8.798840) rotate(225.000000) translate(-19.000000, -8.798840) "
              x="14.5"
              y="8.29884041"
              width="9"
              height="1"
              rx="0.5"
            ></rect>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default MuteIcon
