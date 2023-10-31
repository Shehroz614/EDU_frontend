import { colors } from '@configs/styles/config'
import React, { SVGProps } from 'react'

export const BundledCoursesIcon: React.FC<SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="58"
    height="58"
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3789_25763)">
      <path
        d="M58 10.6008V11.1638C57.7349 16.3702 54.0929 20.4529 48.9749 21.4146C48.9311 21.4222 48.9092 21.4483 48.9092 21.4928V43.5838C48.9092 43.62 48.9273 43.6382 48.9636 43.6382C50.1224 43.6484 51.2598 43.3799 52.1683 44.285C53.9506 46.059 55.728 47.8375 57.5004 49.6205C57.8233 49.9457 57.9456 50.3002 58 50.7284V50.8972C57.9517 51.3443 57.7508 51.7457 57.3973 52.1014C55.6256 53.8792 53.8501 55.6532 52.0709 57.4234C51.7378 57.7541 51.287 57.9705 50.8565 57.9705C34.6792 57.9614 18.5015 57.9607 2.3234 57.9682C1.0841 57.9694 0.231094 57.727 0 56.4061V45.1641C0.234492 43.9735 1.00707 43.6438 2.14215 43.6427C4.44629 43.6412 6.74325 43.6408 9.03305 43.6416C9.04837 43.6416 9.06306 43.6355 9.0739 43.6246C9.08473 43.6138 9.09082 43.5991 9.09082 43.5838V21.5189C9.09077 21.4921 9.08145 21.4663 9.06448 21.4458C9.04751 21.4253 9.02397 21.4115 8.99793 21.4067C3.95125 20.4891 0.286602 16.3884 0 11.2069V10.5872C0.306992 5.49184 3.23758 1.42731 8.37488 0.292228C11.0211 -0.292303 14.0401 0.117775 16.402 1.52586C19.2393 3.21677 20.9257 5.7758 21.4611 9.20293C22.381 15.089 18.2836 20.3985 12.5482 21.426C12.5317 21.4289 12.5167 21.4375 12.5059 21.4504C12.4952 21.4632 12.4893 21.4795 12.4893 21.4962V43.5849C12.4893 43.5999 12.4952 43.6144 12.5058 43.625C12.5165 43.6356 12.5309 43.6416 12.5459 43.6416H27.2441C27.2592 43.6416 27.2736 43.6356 27.2842 43.625C27.2948 43.6144 27.3008 43.5999 27.3008 43.5849V39.6779C27.3007 39.6628 27.2953 39.6484 27.2856 39.637C27.2758 39.6255 27.2623 39.618 27.2475 39.6155C21.8882 38.6595 17.912 33.973 18.2326 28.4551C18.3263 26.8525 18.7073 25.3742 19.3756 24.0201C22.006 18.6959 28.5525 16.8709 33.7952 19.3031C40.37 22.3538 41.7793 31.4185 36.6975 36.5264C35.0836 38.1478 33.0944 39.1862 30.7298 39.6416C30.7212 39.6434 30.7134 39.6482 30.7078 39.6552C30.7023 39.6623 30.6992 39.671 30.6992 39.6801V43.5849C30.6992 43.5999 30.7052 43.6144 30.7158 43.625C30.7264 43.6356 30.7408 43.6416 30.7559 43.6416H45.4258C45.4483 43.6416 45.4699 43.6326 45.4859 43.6167C45.5018 43.6007 45.5107 43.5791 45.5107 43.5566V21.4951C45.5108 21.4782 45.5049 21.4618 45.4942 21.4488C45.4834 21.4357 45.4684 21.4269 45.4518 21.4237C39.0911 20.2988 35.1161 14.1284 36.8187 7.92965C37.3292 6.06882 38.1977 4.49836 39.4241 3.21828C42.5167 -0.0102327 47.6155 -0.797537 51.6596 0.948127C55.6687 2.67906 57.7236 6.27574 58 10.6008ZM12.9843 17.8066C19.9216 15.7279 19.848 5.60512 12.8574 3.6816C10.844 3.12804 8.95337 3.34554 7.18543 4.3341C2.36871 7.02906 2.10816 13.8441 6.69719 16.897C8.6275 18.1808 10.7232 18.4841 12.9843 17.8066ZM41.0123 6.71981C38.1225 11.0415 40.66 16.9548 45.6637 17.9981C47.1873 18.3153 48.8254 18.117 50.2459 17.5076C53.3589 16.1731 55.0139 12.7951 54.4418 9.48274C53.292 2.8082 44.711 1.19055 41.0123 6.71981ZM24.0938 34.4726C26.111 36.2262 28.434 36.7461 31.0629 36.0325C35.4072 34.8521 37.4259 30.1747 35.7889 26.0818C34.2778 22.305 29.776 20.5299 26.0354 22.185C21.1904 24.3294 19.9805 30.894 24.0938 34.4726ZM31.8615 47.04H18.6359C18.6273 47.0402 18.6191 47.043 18.612 47.0478C18.605 47.0527 18.5995 47.0595 18.5963 47.0674C18.593 47.0754 18.5922 47.084 18.5938 47.0924C18.5954 47.1008 18.5994 47.1086 18.6053 47.1148C19.4058 47.9032 20.1999 48.6988 20.9876 49.5016C21.528 50.0522 21.7511 50.6786 21.4793 51.3957C21.3841 51.6464 21.1371 51.9711 20.7384 52.3699C20.0255 53.0828 19.3148 53.7938 18.6064 54.503C18.6005 54.5087 18.5964 54.5161 18.5947 54.5241C18.593 54.5322 18.5938 54.5406 18.597 54.5482C18.6002 54.5558 18.6056 54.5623 18.6126 54.5667C18.6195 54.5712 18.6277 54.5735 18.6359 54.5732H31.8026C31.8846 54.5732 31.9635 54.5406 32.0223 54.4826L35.6122 50.8916C35.6696 50.8349 35.6696 50.7783 35.6122 50.7216L31.9816 47.0898C31.9497 47.058 31.9065 47.04 31.8615 47.04ZM17.4498 50.8451C17.4549 50.8401 17.4589 50.8341 17.4617 50.8275C17.4644 50.8208 17.4658 50.8138 17.4658 50.8066C17.4658 50.7994 17.4644 50.7924 17.4617 50.7858C17.4589 50.7791 17.4549 50.7731 17.4498 50.7681L13.7376 47.0559C13.7326 47.0508 13.7265 47.0468 13.7199 47.0441C13.7133 47.0414 13.7062 47.04 13.6991 47.04H3.45281C3.43839 47.04 3.42456 47.0457 3.41436 47.0559C3.40417 47.0661 3.39844 47.08 3.39844 47.0944V54.5188C3.39844 54.5332 3.40417 54.5471 3.41436 54.5573C3.42456 54.5675 3.43839 54.5732 3.45281 54.5732H13.698C13.7051 54.5732 13.7122 54.5718 13.7188 54.5691C13.7254 54.5664 13.7314 54.5624 13.7365 54.5573L17.4498 50.8451ZM39.2452 52.0742C38.4303 52.8929 37.6116 53.7081 36.7892 54.52C36.7846 54.5242 36.7813 54.5297 36.7799 54.5358C36.7785 54.5419 36.779 54.5483 36.7814 54.5541C36.7837 54.5599 36.7878 54.5649 36.7931 54.5683C36.7983 54.5717 36.8045 54.5734 36.8107 54.5732C41.1502 54.574 45.4949 54.5736 49.8449 54.5721C50.0533 54.5721 50.1927 54.52 50.3309 54.3818C51.5105 53.2044 52.6818 52.0334 53.8448 50.8689C53.8615 50.8524 53.8709 50.8299 53.8709 50.8064C53.8709 50.7828 53.8615 50.7601 53.8448 50.7432L50.1915 47.0898C50.1589 47.0579 50.1154 47.04 50.0703 47.04H36.8436C36.8345 47.0399 36.8256 47.0425 36.818 47.0476C36.8104 47.0526 36.8045 47.0598 36.8011 47.0683C36.7977 47.0767 36.7969 47.086 36.7988 47.0949C36.8007 47.1038 36.8053 47.1119 36.8119 47.1182C37.5988 47.8862 38.3812 48.6679 39.1591 49.4631C39.9146 50.2357 40.0574 51.2575 39.2452 52.0742Z"
        fill={props.color ? props.color : colors.uguPurple}
      />
      <path
        d="M8.48329 13.5802C7.90102 13.0104 6.68098 11.9806 6.44536 11.2522C5.97524 9.80224 7.57137 8.59352 8.90469 9.29927C9.24454 9.47938 9.5368 9.85208 9.84606 10.1364C9.87854 10.1659 9.91025 10.1651 9.94122 10.1341C11.1888 8.86842 11.9803 8.07583 12.3156 7.75638C13.6591 6.47856 15.8081 7.89911 15.0932 9.56434C14.9777 9.8332 14.7066 10.1795 14.2799 10.6031C13.3744 11.5049 12.4708 12.4077 11.5691 13.3117C11.1212 13.7603 10.7761 14.0374 10.5337 14.1432C9.73278 14.4909 9.06895 14.1534 8.48329 13.5802Z"
        fill={props.color ? props.color : colors.uguPurple}
      />
      <path
        d="M46.3544 10.1252C47.17 9.31264 47.969 8.51891 48.7514 7.74407C50.0156 6.49005 52.1181 7.85282 51.5427 9.48747C51.4619 9.71781 51.2674 9.98893 50.9593 10.3008C49.9254 11.3475 48.887 12.3897 47.844 13.4274C46.7645 14.5002 45.9171 14.6032 44.8115 13.5033C44.2813 12.9762 43.7531 12.4464 43.2267 11.914C42.3102 10.9873 42.8789 9.34926 44.1295 9.10005C45.0551 8.9154 45.6634 9.4954 46.2196 10.1218C46.228 10.1312 46.2383 10.1388 46.2498 10.144C46.2612 10.1493 46.2736 10.1522 46.2863 10.1525C46.2989 10.1528 46.3114 10.1506 46.3231 10.1459C46.3348 10.1412 46.3455 10.1342 46.3544 10.1252Z"
        fill={props.color ? props.color : colors.uguPurple}
      />
      <path
        d="M25.5643 30.6606C24.9933 30.0568 24.4621 29.6376 24.5787 28.7212C24.7033 27.7356 25.8781 26.9846 26.8512 27.3686C27.2816 27.5385 27.6713 27.9373 27.9896 28.2964C28.0018 28.3101 28.0167 28.3212 28.0334 28.3289C28.05 28.3367 28.068 28.3409 28.0864 28.3415C28.1047 28.342 28.123 28.3388 28.1401 28.332C28.1571 28.3252 28.1726 28.315 28.1856 28.302C28.9582 27.5234 29.7228 26.7595 30.4796 26.0104C31.8786 24.6249 34.0422 26.1406 33.2776 27.8251C33.1862 28.0253 32.988 28.2786 32.6829 28.5852C31.6377 29.6335 30.5909 30.6813 29.5427 31.7288C27.8537 33.4167 26.6994 31.8591 25.5643 30.6606Z"
        fill={props.color ? props.color : colors.uguPurple}
      />
    </g>
    <defs>
      <clipPath id="clip0_3789_25763">
        <rect width="58" height="58" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
