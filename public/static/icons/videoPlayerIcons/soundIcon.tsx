import React from 'react'

type PlayIconProps = {
  color?: string
  width?: string
  height?: string
}

const SoundIcon: React.FunctionComponent<PlayIconProps> = (props) => {
  const { width, height, color } = props
  return (
    // <svg
    //   width={width ? width : '100%'}
    //   height={height ? height : '100%'}
    //   version="1.1"
    // >
    //   <g
    //     id="speaker-filled-audio-tool"
    //     fill={color ? color : '#D8D8D8'}
    //     fillRule="nonzero"
    //   >
    //     <path
    //       d="M11.9997422,14.9680774 C11.9997422,15.3683901 11.7556071,15.7320665 11.3735499,15.9018147 C11.2258314,15.9680043 11.0675432,16 10.9102862,16 C10.6612529,16 10.4145398,15.9189116 10.2152617,15.7623525 L4.26063418,11.0875597 L1.08919825,11.0875597 C0.487754576,11.0880482 -3.63797881e-12,10.625698 -3.63797881e-12,10.0558813 L-3.63797881e-12,5.94455492 C-3.63797881e-12,5.37449398 0.487754576,4.91238802 1.08919825,4.91238802 L4.26089198,4.91238802 L10.2155195,0.237595239 C10.540861,-0.0178819422 10.9920082,-0.0723479188 11.3738077,0.0986215143 C11.7556071,0.268369737 12,0.632290388 12,1.03235886 L11.9997422,14.9680774 L11.9997422,14.9680774 Z M16.496218,12.9973032 C16.4699215,12.9990193 16.4446463,13 16.4186051,13 C16.133684,13 15.8589752,12.8918818 15.6560073,12.6967296 L15.5117596,12.5577204 C15.1333967,12.1951198 15.0889735,11.6206957 15.4075949,11.2083264 C16.2153818,10.162448 16.6417422,8.92264317 16.6417422,7.62203719 C16.6417422,6.22311962 16.1576828,4.91099084 15.2416463,3.82735683 C14.8928988,3.41547784 14.9250673,2.81727264 15.3159402,2.44216856 L15.4599326,2.30364973 C15.6754105,2.09672957 15.9641611,1.98395318 16.2766552,2.0018503 C16.5809795,2.01656027 16.8651346,2.15409843 17.0581456,2.38063187 C18.3288016,3.87369321 19,5.6864511 19,7.62228235 C19,9.4252336 18.4064145,11.1413961 17.2830699,12.5844435 C17.0954202,12.8249514 16.8084567,12.9759737 16.496218,12.9973032 Z M20.450259,15.6754986 C20.2381518,15.8709788 19.9313738,15.9883102 19.6029409,15.9991341 C19.5868385,15.999567 19.5704585,16 19.5538009,16 C19.2431361,16 18.9449645,15.9043165 18.7242509,15.732216 L18.5701678,15.6120704 C18.1395681,15.2765286 18.1104173,14.7398782 18.5018716,14.3766272 C20.393623,12.6222848 21.4358354,10.3942873 21.4358354,8.10264514 C21.4358354,5.71899956 20.3200518,3.42432667 18.2947617,1.64140914 C17.8841511,1.27945696 17.9049732,0.731549689 18.3419583,0.389513542 L18.4957638,0.269367934 C18.7239733,0.0905566314 19.0204791,-0.00794111986 19.3605724,0.000501544527 C19.6834527,0.00764533747 19.9888426,0.118915325 20.2034484,0.307251684 C22.6515647,2.45645097 24,5.22521193 24,8.10264514 C24.0005551,10.8711896 22.7398501,13.5607194 20.450259,15.6754986 Z"
    //       id="Shape"
    //     ></path>
    //   </g>
    // </svg>

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
        <g
          id="speaker-filled-audio-tool"
          fill={color ? color : '#D8D8D8'}
          fillRule="nonzero"
        >
          <path
            d="M12.0072227,16.9552787 C12.0072227,17.3766136 11.7629354,17.7593884 11.38064,17.9380508 C11.2328294,18.0077163 11.0744425,18.0413923 10.9170875,18.0413923 C10.667899,18.0413923 10.4210321,17.9560456 10.2216297,17.7912648 L4.26329021,12.8709774 L1.08987724,12.8709774 C0.488058636,12.8714916 0,12.3848613 0,11.7851209 L0,7.45789009 C0,6.85789267 0.488058636,6.37151943 1.08987724,6.37151943 L4.26354817,6.37151943 L10.2218877,1.45123204 C10.5474321,1.18233859 10.9988605,1.12501236 11.380898,1.30496017 C11.7629354,1.48362265 12.0074806,1.86665442 12.0074806,2.28773231 L12.0072227,16.9552787 L12.0072227,16.9552787 Z M16.1957048,15.2581137 C16.169135,15.2599132 16.143597,15.2609415 16.1172852,15.2609415 C15.8294028,15.2609415 15.5518388,15.1475744 15.3467613,14.942948 L15.2010144,14.7971903 C14.818719,14.4169862 14.7738341,13.8146752 15.0957671,13.3822863 C15.9119497,12.2856329 16.3427414,10.9856385 16.3427414,9.6218911 C16.3427414,8.15505934 15.853651,6.77922977 14.9280937,5.64298785 C14.5757215,5.21111309 14.6082244,4.58386643 15.0031598,4.19055192 L15.1486487,4.04530832 C15.3663662,3.82834267 15.658118,3.71009125 15.9738599,3.72885724 C16.2813472,3.74428134 16.5684557,3.88849666 16.7634728,4.12602777 C18.0473352,5.69157376 18.7255097,7.59233682 18.7255097,9.62214817 C18.7255097,11.5126285 18.1257548,13.3121066 16.9907347,14.8252107 C16.8011348,15.0773947 16.5111887,15.2357488 16.1957048,15.2581137 Z M20.7017345,18.6146546 C20.5046537,18.8467873 20.2196089,18.9861183 19.9144433,18.9989717 C19.8994816,18.9994859 19.8842621,19 19.8687845,19 C19.5801283,19 19.3030802,18.8863758 19.0980027,18.6820065 L18.9548354,18.5393336 C18.5547408,18.1408777 18.5276551,17.5036054 18.8913774,17.0722448 C20.6491108,14.9889632 21.6174893,12.3432162 21.6174893,9.6218911 C21.6174893,6.79131198 20.5807517,4.06638792 18.69894,1.94917335 C18.3174184,1.51935514 18.3367654,0.868715256 18.742793,0.462547331 L18.8857023,0.319874421 C19.0977447,0.107536 19.3732451,-0.00943007984 19.689245,0.000595584126 C19.9892514,0.00907883825 20.2730064,0.141211948 20.4724088,0.364861375 C22.7470923,2.91703552 23.9999998,6.20493917 23.9999998,9.6218911 C24.0005156,12.9095377 22.8291233,16.1033543 20.7017345,18.6146546 Z"
            id="Shape"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export default SoundIcon