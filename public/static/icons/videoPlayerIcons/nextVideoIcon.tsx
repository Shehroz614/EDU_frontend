import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const ButtonArrow: React.FunctionComponent<Props> = (props) => {
  const { width, height, rotate } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 13 26"
      transform={rotate ? 'rotate(' + rotate + ')' : ''}
    >
      <g id="fi-sr-angle-right" fill="#D8D8D8" fillRule="nonzero">
        <path
          d="M0.349599789,24.1374129 C0.0519355263,24.4094099 -0.0674432126,24.8121965 0.0373468864,25.1909614 C0.142136985,25.5697262 0.454788142,25.8655246 0.855132636,25.9646662 C1.25547713,26.0638078 1.68121203,25.9508639 1.9687058,25.6692446 L11.3260851,16.8162538 C13.5579716,14.6998133 13.5579716,11.2735357 11.3260851,9.15709515 L1.9687058,0.304104372 C1.51941088,-0.106448427 0.80523411,-0.100576944 0.363548175,0.317300902 C-0.0781377589,0.735178748 -0.084343762,1.41085942 0.349599789,1.83593611 L9.70697907,10.6889269 C11.048004,11.9580501 11.048004,14.0152989 9.70697907,15.2844221 L0.349599789,24.1374129 Z"
          id="Path"
        />
      </g>
    </svg>
  )
}

export default ButtonArrow
