import React from 'react'

type Props = {
  width?: string
  height?: string
}

const SearchHistoryIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '18px'}
      height={height ? height : '18px'}
      viewBox="0 0 19 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g clip-path="url(#clip0_2914_14348)">
        <path
          d="M15.7746 8.83192C15.6431 8.82456 15.5114 8.84351 15.3872 8.88766C15.263 8.9318 15.1489 9.00026 15.0515 9.08902C14.9541 9.17779 14.8754 9.28508 14.82 9.40462C14.7645 9.52417 14.7335 9.65356 14.7286 9.78525C14.6679 11.1444 14.1484 12.4429 13.2548 13.4689C12.3613 14.4949 11.1464 15.1879 9.80845 15.4347C8.47048 15.6815 7.08836 15.4677 5.88752 14.8281C4.68669 14.1885 3.73803 13.1609 3.19629 11.9128C2.65454 10.6648 2.55169 9.26999 2.9045 7.95598C3.25732 6.64198 4.04498 5.4863 5.139 4.67747C6.23302 3.86863 7.56883 3.45438 8.92853 3.50229C10.2882 3.5502 11.5916 4.05743 12.626 4.94125L11.8733 5.69392C11.7801 5.78715 11.7166 5.90593 11.6909 6.03523C11.6652 6.16453 11.6784 6.29855 11.7289 6.42035C11.7793 6.54215 11.8647 6.64626 11.9743 6.71952C12.0839 6.79277 12.2128 6.83189 12.3446 6.83192H15.402C15.5788 6.83192 15.7484 6.76168 15.8734 6.63665C15.9984 6.51163 16.0686 6.34206 16.0686 6.16525V3.10792C16.0686 2.97608 16.0295 2.84722 15.9562 2.73761C15.883 2.628 15.7789 2.54258 15.6571 2.49213C15.5353 2.44168 15.4013 2.42848 15.2719 2.45419C15.1426 2.47991 15.0239 2.54338 14.9306 2.63658L14.0406 3.52658C12.6841 2.32579 10.9597 1.6217 9.15038 1.52982C7.34105 1.43794 5.55421 1.96373 4.083 3.02093C2.61179 4.07813 1.54358 5.60396 1.05361 7.34811C0.563631 9.09225 0.68099 10.9511 1.38643 12.6198C2.09187 14.2885 3.3435 15.6679 4.93598 16.5316C6.52847 17.3954 8.36724 17.6923 10.1507 17.3736C11.9341 17.0549 13.5562 16.1395 14.751 14.7777C15.9457 13.4158 16.6421 11.6883 16.726 9.87858C16.7322 9.74739 16.7126 9.61624 16.6682 9.49263C16.6238 9.36903 16.5555 9.25538 16.4671 9.15818C16.3788 9.06099 16.2721 8.98215 16.1533 8.92617C16.0345 8.87018 15.9058 8.83816 15.7746 8.83192Z"
          fill="#1A1E3D"
        />
        <path
          d="M8.40039 6.16797C8.13517 6.16797 7.88082 6.27333 7.69328 6.46086C7.50575 6.6484 7.40039 6.90275 7.40039 7.16797V10.03C7.40047 10.3836 7.54099 10.7226 7.79106 10.9726L8.98639 12.168C9.17499 12.3501 9.4276 12.4509 9.68979 12.4486C9.95199 12.4464 10.2028 12.3412 10.3882 12.1558C10.5736 11.9704 10.6788 11.7196 10.6811 11.4574C10.6833 11.1952 10.5825 10.9426 10.4004 10.754L9.40039 9.75397V7.16797C9.40039 6.90275 9.29503 6.6484 9.1075 6.46086C8.91996 6.27333 8.66561 6.16797 8.40039 6.16797Z"
          fill="#1A1E3D"
        />
      </g>
      <defs>
        <clipPath id="clip0_2914_14348">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0.00390625 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export const SearchResultIcon: React.FunctionComponent<Props> = (props) => {
  const { width, height } = props
  return (
    <svg
      width={width ? width : '17px'}
      height={height ? height : '17px'}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.3007 16.2067L11.2026 13.1099C8.10613 15.4271 3.71746 14.7953 1.40032 11.6987C-0.916829 8.60222 -0.285019 4.21356 2.8115 1.89641C5.90801 -0.420736 10.2967 0.211075 12.6138 3.30759C14.4752 5.79497 14.4752 9.21133 12.6138 11.6987L15.7119 14.7968C16.1012 15.1861 16.1012 15.8174 15.7119 16.2067C15.3226 16.596 14.6914 16.596 14.3021 16.2067L14.3007 16.2067ZM12.0159 7.52898C12.0159 4.77695 9.78493 2.54601 7.03289 2.54601C4.28085 2.54601 2.04991 4.77695 2.04991 7.52898C2.04991 10.281 4.28085 12.512 7.03289 12.512C9.78368 12.509 12.0129 10.2798 12.0159 7.52898Z"
        fill="#1A1E3D"
      />
    </svg>
  )
}

export default SearchHistoryIcon
