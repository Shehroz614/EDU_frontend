import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  color?: string
  width?: string
  height?: string
  rotate?: string
}

const LanguagesIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '100%'}
      height={height ? height : '100%'}
      viewBox="0 0 23 23"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <rect id="path-1" x="0" y="0" width="1920" height="380"></rect>
      </defs>
      <g id="УГУ" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="course-page" transform="translate(-648.000000, -274.000000)">
          <g id="Group-5" transform="translate(1.000000, 93.000000)">
            <mask id="mask-2" fill="white">
              <use xlinkHref="#path-1"></use>
            </mask>
            <path
              d="M380.713623,90.2853932 L843.617557,-146.02911 C848.499849,-148.521541 854.284415,-148.506783 859.153925,-145.98947 L1183.62255,21.7458619 C1191.96287,26.057419 1195.22882,36.3137854 1190.91726,44.6540975 C1189.28776,47.8062245 1186.71275,50.3694454 1183.55317,51.9844682 L751.578361,272.789492 C735.310328,281.104939 716.075128,281.269126 699.667518,273.232592 L380.935748,117.116087 C373.49598,113.47205 370.418933,104.486851 374.062971,97.0470831 C375.490201,94.1332094 377.823778,91.7606716 380.713623,90.2853932 Z"
              id="Path-2-Copy"
              stroke="#979797"
              opacity="0.0933547247"
              strokeDasharray="5"
              mask="url(#mask-2)"
            ></path>
          </g>
          <g
            id="language"
            transform="translate(648.000000, 274.000000)"
            fillRule="nonzero"
          >
            <polygon
              id="Path"
              fill="#000000"
              points="6.711087 6 6.288913 6 5.5 9 7.5 9"
            ></polygon>
            <path
              d="M16.5,11.5 C16.8866712,12.3005613 17.4009791,13.4485932 17.9701504,14 C18.349598,13.6323955 18.8595479,12.7990621 19.5,11.5 L16.5,11.5 Z"
              id="Path"
              fill="#626479"
            ></path>
            <path
              d="M20.4950768,4 L12.1954522,4 L13.9260128,18.0662732 C13.9566213,18.6415986 13.8013511,19.1832565 13.4306631,19.607304 L10.5,23 L20.4950768,23 C21.600636,23 22.5,22.0889929 22.5,20.9691211 L22.5,6.0760095 C22.5,4.95613777 21.600636,4 20.4950768,4 Z M20.4950768,11.4916865 L20.3165941,11.4916865 C19.936327,12.7274988 19.3332906,13.6945131 18.7065962,14.4568599 C19.1975351,14.9115059 19.7225131,15.2844656 20.2444614,15.7021948 C20.5322793,15.9355653 20.5792836,16.3612827 20.3482273,16.6535036 C20.1182403,16.9452732 19.6963154,16.9925701 19.4090767,16.7586128 C18.8419508,16.3051853 18.3096214,15.9256366 17.777292,15.4308242 C17.2449626,15.9256366 16.7571871,16.3051853 16.1900612,16.7586128 C15.9028225,16.9925701 15.4808975,16.9452732 15.2509106,16.6535036 C15.0198543,16.3612827 15.0668586,15.9355653 15.3546765,15.7021948 C15.8766248,15.2844656 16.357049,14.9115059 16.8479878,14.4568599 C16.2212934,13.6945582 15.6627663,12.7275439 15.2825438,11.4916865 L15.1040611,11.4916865 C14.7346651,11.4916865 14.4357533,11.188905 14.4357533,10.8147268 C14.4357533,10.4405487 14.7346651,10.1377672 15.1040611,10.1377672 L17.1089843,10.1377672 L17.1089843,9.4608076 C17.1089843,9.08662945 17.4078961,8.78384798 17.777292,8.78384798 C18.146688,8.78384798 18.4455998,9.08662945 18.4455998,9.4608076 L18.4455998,10.1377672 L20.4950768,10.1377672 C20.8644728,10.1377672 21.1633845,10.4405487 21.1633845,10.8147268 C21.1633845,11.188905 20.8644728,11.4916865 20.4950768,11.4916865 Z"
              id="Shape"
              fill="#626479"
            ></path>
            <path
              d="M11.4547247,1.7747891 C11.3291889,0.763061611 10.4675773,0 9.45153606,0 L2.51898155,0 C1.40567026,0 0.5,0.908848341 0.5,2.02606635 L0.5,16.9739336 C0.5,18.0911517 1.40567026,19 2.51898155,19 C6.54213878,19 9.4363264,19 13.1321394,19 C13.3284742,18.7747915 13.4930436,18.6337773 13.5,18.3398175 C13.5017028,18.2661137 11.4638325,1.84790758 11.4547247,1.7747891 Z M8.75287871,12.908609 C8.39601251,12.9823128 8.03452508,12.7498104 7.96094442,12.3789953 L7.53081161,10.2203791 L5.6279888,10.2203791 L5.197856,12.3789953 C5.12557646,12.7443626 4.77458774,12.9844289 4.4059217,12.908609 C4.04183203,12.8354005 3.80520739,12.4799384 3.87815993,12.1138957 L5.22410276,5.36034123 C5.28718472,5.04508531 5.56324679,4.81753555 5.8839508,4.81753555 L7.27480475,4.81753555 C7.59550876,4.81753555 7.87157083,5.04508531 7.93465279,5.36034123 L9.28064049,12.1138957 C9.35359302,12.4799384 9.11701325,12.8354005 8.75287871,12.908609 Z"
              id="Shape"
              fill="#626479"
            ></path>
            <path
              d="M7.5,21 L7.63054228,21.7425005 C7.71757046,22.2397496 8.18202508,22.7468117 8.94600677,23 C10.3877534,21.8710067 9.51549365,22.5540163 11.5,21 L7.5,21 Z"
              id="Path"
              fill="#626479"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default LanguagesIcon