import React, { useEffect, useState } from 'react'
import { Button as NextButton } from '@nextui-org/react'
import { Text, Dropdown, Grid } from '@nextui-org/react'
import Price from '@components/atoms/CategorySidebarPrice'
import ReactSlider from 'react-slider'
import styled from '@emotion/styled'
import { fontFamilies } from '@configs/styles/config'
import Rating from '@components/atoms/Rating'
import Difficulty from '@components/atoms/CategorySidebarDifficulty'
import {
  setPrice as setFiltersPrice,
  setRating as setFiltersRating,
  addCategory,
  getSubCategories,
  addSubCategory,
  addDifficulty,
  removeDifficulty,
  setDuration,
} from '@helpers/searchHelper'
import getCategories from '@services/api/category/getCategories'
import { isEmpty, isUndefined } from 'lodash'
import { useRouter } from 'next/router'

const StarIcon = () => {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.8032 10.627C28.556 9.84024 28.0622 9.15392 27.3948 8.66952C26.7274 8.18513 25.9218 7.92838 25.0972 7.93723H19.818L18.2145 2.93957C17.9624 2.15289 17.4669 1.46663 16.7995 0.97973C16.1322 0.492834 15.3274 0.230469 14.5013 0.230469C13.6752 0.230469 12.8705 0.492834 12.2031 0.97973C11.5358 1.46663 11.0403 2.15289 10.7881 2.93957L9.18466 7.93723H3.90546C3.08348 7.93841 2.2829 8.1993 1.61806 8.68266C0.953218 9.16602 0.458131 9.84711 0.203512 10.6287C-0.0511075 11.4102 -0.0522344 12.2522 0.200292 13.0345C0.452818 13.8167 0.94608 14.4991 1.60962 14.9842L5.90646 18.1259L4.27279 23.1852C4.00878 23.9699 4.00544 24.8189 4.26326 25.6056C4.52107 26.3923 5.02624 27.0747 5.70346 27.5509C6.36907 28.0424 7.17568 28.3057 8.0031 28.3016C8.83052 28.2975 9.63446 28.0261 10.2951 27.5279L14.5013 24.4322L18.7087 27.5243C19.3732 28.013 20.1754 28.2785 21.0002 28.2825C21.825 28.2865 22.6298 28.0289 23.2989 27.5467C23.9681 27.0645 24.4671 26.3825 24.7242 25.5988C24.9813 24.8151 24.9833 23.9701 24.7299 23.1852L23.0962 18.1259L27.3979 14.9842C28.069 14.5052 28.568 13.8228 28.8211 13.038C29.0742 12.2533 29.0679 11.4079 28.8032 10.627ZM25.972 13.0328L20.9647 16.6928C20.759 16.8429 20.606 17.054 20.5275 17.2962C20.4489 17.5383 20.4488 17.7991 20.5273 18.0413L22.4304 23.9259C22.5267 24.2244 22.5259 24.5457 22.4281 24.8436C22.3302 25.1416 22.1404 25.4009 21.886 25.5842C21.6315 25.7675 21.3255 25.8654 21.0118 25.8638C20.6982 25.8622 20.3932 25.7612 20.1406 25.5753L15.2167 21.9503C15.0093 21.7979 14.7587 21.7158 14.5013 21.7158C14.244 21.7158 13.9934 21.7979 13.786 21.9503L8.86204 25.5753C8.6096 25.7637 8.30371 25.8668 7.98873 25.8696C7.67376 25.8725 7.36605 25.775 7.11023 25.5912C6.85441 25.4074 6.66378 25.1469 6.56596 24.8475C6.46814 24.5481 6.46823 24.2253 6.56621 23.9259L8.47537 18.0413C8.55381 17.7991 8.55376 17.5383 8.47521 17.2962C8.39666 17.054 8.24363 16.8429 8.03796 16.6928L3.03062 13.0328C2.77845 12.8481 2.59107 12.5885 2.49526 12.291C2.39945 11.9935 2.4001 11.6734 2.49713 11.3763C2.59415 11.0792 2.78258 10.8203 3.03551 10.6367C3.28843 10.4531 3.59291 10.3541 3.90546 10.3539H10.068C10.3238 10.3539 10.573 10.2727 10.7797 10.122C10.9864 9.97129 11.14 9.75887 11.2183 9.51532L13.0912 3.67786C13.1873 3.37914 13.3758 3.11863 13.6294 2.93383C13.883 2.74902 14.1887 2.64945 14.5025 2.64945C14.8163 2.64945 15.1221 2.74902 15.3757 2.93383C15.6293 3.11863 15.8177 3.37914 15.9139 3.67786L17.7868 9.51532C17.8651 9.75887 18.0186 9.97129 18.2254 10.122C18.4321 10.2727 18.6813 10.3539 18.9371 10.3539H25.0996C25.4122 10.3541 25.7166 10.4531 25.9696 10.6367C26.2225 10.8203 26.4109 11.0792 26.508 11.3763C26.605 11.6734 26.6056 11.9935 26.5098 12.291C26.414 12.5885 26.2266 12.8481 25.9745 13.0328H25.972Z"
        fill="black"
      />
    </svg>
  )
}

const CalendarIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2929_18443)">
        <path
          d="M22.1667 2.33333H21V1.16667C21 0.857247 20.8771 0.560501 20.6583 0.341709C20.4395 0.122916 20.1428 0 19.8333 0C19.5239 0 19.2272 0.122916 19.0084 0.341709C18.7896 0.560501 18.6667 0.857247 18.6667 1.16667V2.33333H9.33333V1.16667C9.33333 0.857247 9.21042 0.560501 8.99162 0.341709C8.77283 0.122916 8.47609 0 8.16667 0C7.85725 0 7.5605 0.122916 7.34171 0.341709C7.12292 0.560501 7 0.857247 7 1.16667V2.33333H5.83333C4.28681 2.33519 2.80415 2.95036 1.71059 4.04392C0.617029 5.13748 0.0018525 6.62014 0 8.16667L0 22.1667C0.0018525 23.7132 0.617029 25.1959 1.71059 26.2894C2.80415 27.383 4.28681 27.9981 5.83333 28H22.1667C23.7132 27.9981 25.1959 27.383 26.2894 26.2894C27.383 25.1959 27.9981 23.7132 28 22.1667V8.16667C27.9981 6.62014 27.383 5.13748 26.2894 4.04392C25.1959 2.95036 23.7132 2.33519 22.1667 2.33333ZM2.33333 8.16667C2.33333 7.23841 2.70208 6.34817 3.35846 5.69179C4.01484 5.03542 4.90508 4.66667 5.83333 4.66667H22.1667C23.0949 4.66667 23.9852 5.03542 24.6415 5.69179C25.2979 6.34817 25.6667 7.23841 25.6667 8.16667V9.33333H2.33333V8.16667ZM22.1667 25.6667H5.83333C4.90508 25.6667 4.01484 25.2979 3.35846 24.6415C2.70208 23.9852 2.33333 23.0949 2.33333 22.1667V11.6667H25.6667V22.1667C25.6667 23.0949 25.2979 23.9852 24.6415 24.6415C23.9852 25.2979 23.0949 25.6667 22.1667 25.6667Z"
          fill="black"
        />
        <path
          d="M14 19.25C14.9665 19.25 15.75 18.4665 15.75 17.5C15.75 16.5335 14.9665 15.75 14 15.75C13.0335 15.75 12.25 16.5335 12.25 17.5C12.25 18.4665 13.0335 19.25 14 19.25Z"
          fill="black"
        />
        <path
          d="M8.16797 19.25C9.13447 19.25 9.91797 18.4665 9.91797 17.5C9.91797 16.5335 9.13447 15.75 8.16797 15.75C7.20147 15.75 6.41797 16.5335 6.41797 17.5C6.41797 18.4665 7.20147 19.25 8.16797 19.25Z"
          fill="black"
        />
        <path
          d="M19.832 19.25C20.7985 19.25 21.582 18.4665 21.582 17.5C21.582 16.5335 20.7985 15.75 19.832 15.75C18.8655 15.75 18.082 16.5335 18.082 17.5C18.082 18.4665 18.8655 19.25 19.832 19.25Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_2929_18443">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const TimerIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 14C28 17.713 26.525 21.274 23.8995 23.8995C21.274 26.525 17.713 28 14 28C10.287 28 6.72601 26.525 4.1005 23.8995C1.475 21.274 0 17.713 0 14C0 13.6906 0.122916 13.3938 0.341709 13.175C0.560501 12.9562 0.857247 12.8333 1.16667 12.8333C1.47609 12.8333 1.77283 12.9562 1.99162 13.175C2.21042 13.3938 2.33333 13.6906 2.33333 14C2.33333 16.3074 3.01757 18.5631 4.29952 20.4817C5.58147 22.4002 7.40355 23.8956 9.53536 24.7786C11.6672 25.6616 14.0129 25.8927 16.2761 25.4425C18.5392 24.9923 20.618 23.8812 22.2496 22.2496C23.8812 20.618 24.9923 18.5392 25.4425 16.2761C25.8927 14.0129 25.6616 11.6672 24.7786 9.53536C23.8956 7.40355 22.4002 5.58147 20.4817 4.29952C18.5631 3.01757 16.3074 2.33333 14 2.33333C13.6906 2.33333 13.3938 2.21042 13.175 1.99162C12.9562 1.77283 12.8333 1.47609 12.8333 1.16667C12.8333 0.857247 12.9562 0.560501 13.175 0.341709C13.3938 0.122916 13.6906 0 14 0C17.7118 0.00401459 21.2704 1.4803 23.8951 4.10494C26.5197 6.72958 27.996 10.2882 28 14ZM11.9898 12.8333H9.33333C9.02391 12.8333 8.72717 12.9562 8.50838 13.175C8.28958 13.3938 8.16667 13.6906 8.16667 14C8.16667 14.3094 8.28958 14.6062 8.50838 14.825C8.72717 15.0437 9.02391 15.1667 9.33333 15.1667H11.9898C12.168 15.4761 12.415 15.7404 12.7117 15.939C13.0084 16.1376 13.3469 16.2653 13.7009 16.3121C14.0548 16.3589 14.4148 16.3236 14.753 16.2089C15.0911 16.0943 15.3983 15.9033 15.6508 15.6508C15.9033 15.3983 16.0943 15.0911 16.2089 14.753C16.3236 14.4148 16.3589 14.0548 16.3121 13.7009C16.2653 13.3469 16.1376 13.0084 15.939 12.7117C15.7404 12.415 15.4761 12.168 15.1667 11.9898V8.16667C15.1667 7.85725 15.0437 7.5605 14.825 7.34171C14.6062 7.12292 14.3094 7 14 7C13.6906 7 13.3938 7.12292 13.175 7.34171C12.9562 7.5605 12.8333 7.85725 12.8333 8.16667V11.9898C12.4838 12.1932 12.1932 12.4838 11.9898 12.8333ZM2.1315 10.248C2.36224 10.248 2.58781 10.1796 2.77967 10.0514C2.97152 9.92319 3.12106 9.74098 3.20936 9.5278C3.29766 9.31462 3.32077 9.08004 3.27575 8.85373C3.23073 8.62742 3.11962 8.41954 2.95646 8.25638C2.7933 8.09321 2.58542 7.9821 2.35911 7.93708C2.13279 7.89207 1.89822 7.91517 1.68504 8.00347C1.47186 8.09178 1.28965 8.24131 1.16145 8.43317C1.03326 8.62502 0.964833 8.85059 0.964833 9.08133C0.964833 9.39075 1.08775 9.6875 1.30654 9.90629C1.52533 10.1251 1.82208 10.248 2.1315 10.248ZM4.9245 6.07483C5.15524 6.07483 5.38081 6.00641 5.57267 5.87821C5.76452 5.75002 5.91406 5.56781 6.00236 5.35463C6.09066 5.14145 6.11377 4.90687 6.06875 4.68056C6.02373 4.45425 5.91262 4.24637 5.74946 4.08321C5.5863 3.92005 5.37842 3.80893 5.15211 3.76392C4.92579 3.7189 4.69122 3.742 4.47804 3.83031C4.26486 3.91861 4.08265 4.06814 3.95445 4.26C3.82626 4.45186 3.75783 4.67742 3.75783 4.90817C3.75783 5.21759 3.88075 5.51433 4.09954 5.73312C4.31833 5.95192 4.61508 6.07483 4.9245 6.07483ZM9.0755 3.3145C9.30624 3.3145 9.53181 3.24608 9.72366 3.11788C9.91552 2.98969 10.0651 2.80748 10.1534 2.5943C10.2417 2.38112 10.2648 2.14654 10.2197 1.92023C10.1747 1.69392 10.0636 1.48604 9.90046 1.32288C9.7373 1.15971 9.52942 1.0486 9.3031 1.00358C9.07679 0.958568 8.84222 0.981672 8.62904 1.06997C8.41586 1.15828 8.23365 1.30781 8.10545 1.49967C7.97726 1.69153 7.90883 1.91709 7.90883 2.14783C7.90883 2.45725 8.03175 2.754 8.25054 2.97279C8.46933 3.19158 8.76608 3.3145 9.0755 3.3145Z"
        fill="black"
      />
    </svg>
  )
}

const PeopleIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.69942 15.1667C7.66707 15.1667 6.65791 14.8588 5.79954 14.2819C4.94117 13.705 4.27215 12.8851 3.87709 11.9258C3.48203 10.9664 3.37866 9.91085 3.58006 8.89245C3.78146 7.87405 4.27859 6.93858 5.00857 6.20436C5.73855 5.47013 6.6686 4.97012 7.68112 4.76755C8.69363 4.56497 9.74313 4.66894 10.6969 5.0663C11.6507 5.46366 12.4659 6.13657 13.0394 6.99993C13.6129 7.86328 13.9191 8.87832 13.9191 9.91667C13.9175 11.3086 13.3671 12.643 12.3886 13.6273C11.41 14.6115 10.0833 15.1651 8.69942 15.1667ZM8.69942 7C8.12589 7 7.56525 7.17106 7.08838 7.49155C6.6115 7.81204 6.23983 8.26756 6.02035 8.80051C5.80087 9.33346 5.74344 9.91991 5.85533 10.4857C5.96722 11.0515 6.2434 11.5712 6.64895 11.9791C7.05449 12.387 7.57119 12.6648 8.1337 12.7773C8.69621 12.8898 9.27926 12.8321 9.80913 12.6113C10.339 12.3906 10.7919 12.0167 11.1105 11.5371C11.4292 11.0574 11.5992 10.4935 11.5992 9.91667C11.5992 9.14312 11.2937 8.40126 10.7499 7.85427C10.2061 7.30729 9.4685 7 8.69942 7ZM17.3988 26.8333V26.25C17.3988 23.9294 16.4823 21.7038 14.8508 20.0628C13.2194 18.4219 11.0067 17.5 8.69942 17.5C6.39219 17.5 4.17946 18.4219 2.548 20.0628C0.916544 21.7038 0 23.9294 0 26.25L0 26.8333C0 27.1428 0.122206 27.4395 0.339734 27.6583C0.557261 27.8771 0.852292 28 1.15992 28C1.46755 28 1.76258 27.8771 1.98011 27.6583C2.19764 27.4395 2.31985 27.1428 2.31985 26.8333V26.25C2.31985 24.5482 2.99198 22.9161 4.18838 21.7127C5.38478 20.5094 7.00745 19.8333 8.69942 19.8333C10.3914 19.8333 12.0141 20.5094 13.2105 21.7127C14.4069 22.9161 15.079 24.5482 15.079 26.25V26.8333C15.079 27.1428 15.2012 27.4395 15.4187 27.6583C15.6363 27.8771 15.9313 28 16.2389 28C16.5466 28 16.8416 27.8771 17.0591 27.6583C17.2766 27.4395 17.3988 27.1428 17.3988 26.8333ZM27.8382 21C27.8381 19.4235 27.3844 17.8806 26.5317 16.5578C25.6791 15.2349 24.464 14.1885 23.0331 13.545C21.6022 12.9014 20.0167 12.6882 18.468 12.931C16.9193 13.1739 15.4736 13.8624 14.3053 14.9135C14.1902 15.0152 14.0963 15.1389 14.029 15.2773C13.9617 15.4158 13.9223 15.5663 13.9131 15.7201C13.904 15.874 13.9252 16.0281 13.9756 16.1737C14.026 16.3192 14.1046 16.4533 14.2068 16.5681C14.309 16.6829 14.4328 16.7762 14.5711 16.8426C14.7094 16.9091 14.8593 16.9473 15.0124 16.9551C15.1654 16.9629 15.3185 16.9401 15.4627 16.888C15.6069 16.836 15.7395 16.7557 15.8527 16.6518C16.6872 15.9012 17.7198 15.4096 18.826 15.2363C19.9322 15.063 21.0646 15.2154 22.0866 15.6751C23.1085 16.1348 23.9764 16.8823 24.5853 17.8271C25.1943 18.772 25.5183 19.874 25.5183 21C25.5183 21.3094 25.6405 21.6062 25.858 21.825C26.0756 22.0438 26.3706 22.1667 26.6782 22.1667C26.9859 22.1667 27.2809 22.0438 27.4984 21.825C27.7159 21.6062 27.8382 21.3094 27.8382 21ZM20.2987 10.5C19.2663 10.5 18.2571 10.1921 17.3988 9.61522C16.5404 9.03834 15.8714 8.2184 15.4763 7.25909C15.0813 6.29978 14.9779 5.24418 15.1793 4.22578C15.3807 3.20738 15.8778 2.27192 16.6078 1.53769C17.3378 0.803466 18.2678 0.303452 19.2803 0.10088C20.2929 -0.101693 21.3424 0.00227475 22.2961 0.399635C23.2499 0.796995 24.0651 1.4699 24.6386 2.33326C25.2122 3.19662 25.5183 4.21165 25.5183 5.25C25.5168 6.64192 24.9664 7.97638 23.9878 8.96061C23.0093 9.94484 21.6825 10.4985 20.2987 10.5ZM20.2987 2.33334C19.7251 2.33334 19.1645 2.5044 18.6876 2.82488C18.2107 3.14537 17.8391 3.60089 17.6196 4.13384C17.4001 4.66679 17.3427 5.25324 17.4546 5.81902C17.5665 6.38479 17.8426 6.90449 18.2482 7.3124C18.6537 7.7203 19.1704 7.99809 19.7329 8.11063C20.2954 8.22317 20.8785 8.16541 21.4084 7.94465C21.9382 7.7239 22.3911 7.35006 22.7098 6.87042C23.0284 6.39077 23.1985 5.82686 23.1985 5.25C23.1985 4.47645 22.8929 3.73459 22.3491 3.18761C21.8053 2.64063 21.0677 2.33334 20.2987 2.33334Z"
        fill="black"
      />
    </svg>
  )
}

interface TrackProps {
  index: number
}

const StyledThumb = styled.div`
  cursor: pointer;
  width: 19px;
  height: 19px;
  position: absolute;
  background-color: #1a1e3d;
  border: 1px solid #1a1e3d;
  border-radius: 100%;
  margin-top: -7px;
  outline: none;
  :focus {
    outline: none;
  }
`

const StyledTrack = styled.div<TrackProps>`
  top: 0;
  bottom: 0;
  background: ${(props) =>
    props.index === 2 ? '#D9D9D9' : props.index === 1 ? '#1A1E3D' : '#D9D9D9'};
  border-radius: 3px;

  position: relative;
`

const StyledSlider = styled(ReactSlider)<{}>`
  height: 5px;
  margin: auto;
  width: 100%;
  text-align: center;
  outline: none;
  display: flex;
  justify-content: space-evenly;
  :focus {
    outline: none;
  }
`

const StyledContainer = styled.div`
  width: 100%;
  margin: 0.5rem 0 -0.5rem 0;
  text-align: center;
  padding: 1rem 4rem;
  @media (max-width: 550px) {
    padding: 0;
  }
`

const HeaderFilters = (props: {
  filters: any
  setFilters: any
  sort: any
  setSort: any
}) => {
  const [selectedCat, setSelectedCat] = useState<Set<string>>(new Set([]))
  const selectedCategory = React.useMemo(
    () => 'Categories ' + (selectedCat.size > 0 ? `(${selectedCat.size})` : ''),
    [selectedCat]
  )

  const [selectedSubCat, setSelectedSubCat] = useState<Set<string>>(new Set([]))
  const selectedSubCategory = React.useMemo(
    () =>
      'Sub Categories ' +
      (selectedSubCat.size > 0 ? `(${selectedSubCat.size})` : ''),
    [selectedSubCat]
  )
  const [price, setPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1300,
  })

  const [duration, setDurationS] = useState({
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  })

  const Thumb = (props: { [key: string]: any }) => (
    <StyledThumb {...props}></StyledThumb>
  )

  const Track = (props: any, state: any) => (
    <StyledTrack index={state.index} {...props} />
  )

  const [_min, setMin] = useState(0)
  const [max, setMax] = useState(1300)

  const [rating, setRating] = useState(0)
  const [categories, setCategories] = useState<any[]>([])

  const getCategoriesAPI = async () => {
    setCategories(await getCategories())
  }

  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    getCategoriesAPI()
  }, [])

  const selectCategory = (a: any) => {
    let tempFilters = JSON.parse(JSON.stringify(props.filters))
    tempFilters.category = []
    categories?.map((category) => {
      if (Array.from(a).includes(category?.name?.en)) {
        tempFilters = addCategory(tempFilters, category?._id)
      }
    })
    props.setFilters(tempFilters)
  }

  const selectSubCategory = (a: any) => {
    let tempFilters = JSON.parse(JSON.stringify(props.filters))
    tempFilters.subCategory = []
    getSubCategories(categories, props.filters.category)?.map((category) => {
      if (Array.from(a).includes(category?.name?.en)) {
        tempFilters = addSubCategory(tempFilters, category?._id)
      }
    })
    props.setFilters(tempFilters)
  }

  useEffect(() => {
    setQuery(decodeURIComponent((router.query.search || '')?.toString()).trim())
    console.log(query, rating, price)
    let newFilters = JSON.parse(JSON.stringify(props.filters))
    if (!isUndefined(router.query.filters)) {
      newFilters = JSON.parse(router.query.filters?.toString())
    }
    props.setFilters(newFilters)

    const categoriesParsed: string[] = []
    const subCategoriesParsed: string[] = []
    newFilters.category.map((category: any) => {
      if (!isEmpty(categories?.find((item) => item._id == category))) {
        categories?.map((item) => {
          if (item._id == category) {
            categoriesParsed.push(item?.name?.en)
          }
        })
      }
    })
    newFilters.subCategory.map((category: any) => {
      if (
        !isEmpty(
          getSubCategories(categories, newFilters.category)?.find(
            (item) => item._id == category
          )
        )
      ) {
        getSubCategories(categories, newFilters.category)?.map((item) => {
          if (item._id == category) {
            subCategoriesParsed.push(item?.name?.en)
          }
        })
      }
    })
    setSelectedCat(new Set(categoriesParsed))
    setSelectedSubCat(new Set(subCategoriesParsed))

    setPrice(newFilters.price)
    setRating(newFilters.rating)
  }, [router.isReady, categories])

  useEffect(() => {
    setDurationS(props?.filters.duration)
  }, [props?.filters.duration])

  useEffect(() => {
    setMin(0)
    setMax(1300)

    const newFilters = JSON.parse(JSON.stringify(props.filters))
    const categoriesParsed: string[] = []
    const subCategoriesParsed: string[] = []
    const categoriesParsedId: string[] = []

    newFilters.category.map((category: any) => {
      if (!isEmpty(categories?.find((item) => item._id == category))) {
        categories?.map((item) => {
          if (item._id == category) {
            categoriesParsed.push(item?.name?.en)
            categoriesParsedId.push(item._id)
          }
        })
      }
    })
    newFilters.subCategory.map((category: any) => {
      if (
        !isEmpty(
          getSubCategories(categories, newFilters.category)?.find(
            (item) => item._id == category
          )
        )
      ) {
        getSubCategories(categories, newFilters.category)?.map((item) => {
          if (
            item._id == category &&
            categoriesParsedId.includes(item.parent)
          ) {
            subCategoriesParsed.push(item?.name?.en)
          }
        })
      }
    })
    setSelectedCat(new Set(categoriesParsed))
    setSelectedSubCat(new Set(subCategoriesParsed))
  }, [props.filters.category, props.filters.subCategory])

  const getCategoriesBlock = () => {
    return (
      <Dropdown.Menu
        aria-label="Category selection"
        color="primary"
        selectionMode="multiple"
        selectedKeys={selectedCat}
        onSelectionChange={(a: any) => {
          setSelectedCat(a)
          selectCategory(a)
        }}
        placeholder={'Select category'}
      >
        {categories?.map((category) => {
          return (
            <Dropdown.Item
              key={category?.name?.en}
              dividerWeight="light"
              withDivider
            >
              <div style={{ minWidth: 'max-content' }}>
                {category?.name?.en}
              </div>
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    )
  }

  const getSubCategoriesBlock = () => {
    return (
      <Dropdown.Menu
        aria-label="Category selection"
        color="primary"
        selectionMode="multiple"
        selectedKeys={selectedSubCat}
        onSelectionChange={(a: any) => {
          setSelectedSubCat(a)
          selectSubCategory(a)
        }}
        placeholder={'Select category'}
      >
        {getSubCategories(categories, props.filters.category)?.map(
          (category) => {
            return (
              <Dropdown.Item
                key={category?.name?.en}
                description=" "
                dividerWeight="light"
                withDivider
              >
                <div style={{ minHeight: 'max-content' }}>
                  {category?.name?.en}
                </div>
              </Dropdown.Item>
            )
          }
        )}
      </Dropdown.Menu>
    )
  }

  const priceSetFunction = (newPrice: { min: number; max: number }) => {
    if (newPrice.max > max - 1) {
      newPrice.max = Number.MAX_VALUE
    }
    const oldFilters = JSON.parse(JSON.stringify(props.filters))
    props.setFilters(setFiltersPrice(oldFilters, newPrice))
  }

  const ratingSetFunction = (newRating: number) => {
    setRating(newRating)
    if (newRating == 1) {
      newRating = 0
    }
    const oldFilters = JSON.parse(JSON.stringify(props.filters))
    props.setFilters(setFiltersRating(oldFilters, newRating))
  }

  const addDifficultyHandler = (difficulty: string) => {
    const oldFilters = JSON.parse(JSON.stringify(props.filters))
    const newFilters = addDifficulty(oldFilters, difficulty)
    props.setFilters(newFilters)
  }

  const removeDifficultyHandler = (difficulty: string) => {
    const oldFilters = JSON.parse(JSON.stringify(props.filters))
    const newFilters = removeDifficulty(oldFilters, difficulty)
    props.setFilters(newFilters)
  }

  return (
    <>
      <Text b size={18}>
        Select course categories
      </Text>
      <Grid.Container
        gap={1}
        justify="center"
        alignContent="stretch"
        style={{ padding: 0 }}
      >
        <Grid style={{ flex: 1 }}>
          <Dropdown placement="bottom-left">
            <Dropdown.Button
              flat
              color="primary"
              css={{ tt: 'capitalize', flex: 1, width: '100% !important' }}
            >
              {selectedCategory || 'Select category'}
            </Dropdown.Button>

            {getCategoriesBlock()}
          </Dropdown>
        </Grid>
        <Grid style={{ flex: 1 }}>
          <Dropdown placement="bottom-left">
            <Dropdown.Button
              flat
              color="primary"
              css={{
                tt: 'capitalize',
                flex: 1,
                width: '100% !important',
              }}
              disabled={selectedCat.size == 0}
            >
              {selectedSubCategory || 'Select sub category'}
            </Dropdown.Button>
            {getSubCategoriesBlock()}
          </Dropdown>
        </Grid>
      </Grid.Container>
      <div
        style={{
          borderTop: '1px solid #ddd',
          width: '100%',
          marginTop: 15,
        }}
      ></div>
      <Text b size={18}>
        Sort By
      </Text>
      <Grid.Container
        gap={1}
        justify="center"
        alignContent="stretch"
        style={{ padding: 0 }}
      >
        <Grid style={{ flex: 1 }}>
          <NextButton
            color="primary"
            bordered
            auto
            style={{
              width: '100%',
              height: 125,
              padding: '5px 20px',
              paddingTop: 15,
              justifyContent: 'flex-start',
              borderColor:
                props.sort == "{ 'meta.rating': 1 }"
                  ? '#1a1e3d'
                  : 'rgba(26, 30, 61, 0.25)',
            }}
            onPress={() => {
              props.setSort("{ 'meta.rating': 1 }")
            }}
          >
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: 110,
                height: 100,
              }}
            >
              <StarIcon />
              <Text b size={16}>
                Most Popular
              </Text>
            </div>
          </NextButton>
        </Grid>
        <Grid style={{ flex: 1 }}>
          <NextButton
            color="primary"
            bordered
            auto
            style={{
              width: '100%',
              height: 125,
              padding: '5px 20px',
              paddingTop: 15,
              justifyContent: 'flex-start',
              borderColor:
                props.sort == "{ 'meta.price': 1 }"
                  ? '#1a1e3d'
                  : 'rgba(26, 30, 61, 0.25)',
            }}
            onPress={() => {
              props.setSort("{ 'meta.price': 1 }")
            }}
          >
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: 110,
                height: 100,
              }}
            >
              <CalendarIcon />
              <Text b size={16}>
                Date Modified
              </Text>
            </div>
          </NextButton>
        </Grid>
        <Grid style={{ flex: 1 }}>
          <NextButton
            color="primary"
            bordered
            auto
            style={{
              width: '100%',
              height: 125,
              padding: '5px 20px',
              paddingTop: 15,
              justifyContent: 'flex-start',
              borderColor:
                props.sort == "{ 'meta.totalTime': -1 }"
                  ? '#1a1e3d'
                  : 'rgba(26, 30, 61, 0.25)',
            }}
            onPress={() => {
              props.setSort("{ 'meta.totalTime': -1 }")
            }}
          >
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: 110,
                height: 100,
              }}
            >
              <TimerIcon />
              <Text b size={16}>
                Duration
              </Text>
            </div>
          </NextButton>
        </Grid>
        <Grid style={{ flex: 1 }}>
          <NextButton
            color="primary"
            bordered
            auto
            style={{
              width: '100%',
              height: 125,
              padding: '5px 20px',
              paddingTop: 15,
              justifyContent: 'flex-start',
              borderColor:
                props.sort == "{ 'meta.totalLectures': 1 }"
                  ? '#1a1e3d'
                  : 'rgba(26, 30, 61, 0.25)',
            }}
            onPress={() => {
              props.setSort("{ 'meta.totalLectures': 1 }")
            }}
          >
            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: 110,
                height: 100,
              }}
            >
              <PeopleIcon />
              <Text b size={16}>
                Students Qty
              </Text>
            </div>
          </NextButton>
        </Grid>
      </Grid.Container>
      <div
        style={{
          borderTop: '1px solid #ddd',
          width: '100%',
          marginTop: 15,
        }}
      ></div>
      <Text b size={18}>
        Price Range
      </Text>
      <Price
        changePrice={priceSetFunction}
        limits={{ min: 0, max: 1300 }}
        price={
          props.filters.price.max > 1299
            ? { min: props.filters.price.min, max: 1300 }
            : props.filters.price
        }
      />
      <div
        style={{
          borderTop: '1px solid #ddd',
          width: '100%',
          marginTop: 15,
        }}
      ></div>
      <Text b size={18}>
        Duration (in Hours)
      </Text>
      <StyledContainer>
        <StyledSlider
          onChange={(newValue: number | readonly number[]) => {
            props?.setFilters(
              setDuration(props.filters, {
                min: newValue[0] * 60 * 60,
                max: newValue[1] * 60 * 60,
              })
            )
            setDurationS({
              min: newValue[0] * 60 * 60,
              max: newValue[1] * 60 * 60,
            })
            console.log(
              setDuration(props.filters, {
                min: newValue[0] * 60 * 60,
                max: newValue[1] * 60 * 60,
              })
            )
            //dispatch({type: "setPrice", payload: {price: {"min": JSON.parse(JSON.stringify(newValue))[0], "max": JSON.parse(JSON.stringify(newValue))[1]}}})
          }}
          marks={16}
          value={[
            duration.min / 3600,
            (duration.max || Number.MAX_SAFE_INTEGER) / 3600,
          ]}
          defaultValue={[0, 50]}
          renderTrack={Track}
          renderThumb={Thumb}
          renderMark={() => (
            <span
              style={{
                width: 0,
                height: 10,
                marginTop: -2,
                border: '1px solid #000',
                backgroundColor: '#fff',
                cursor: 'pointer',
                borderRadius: 5,
                zIndex: 1,
              }}
            ></span>
          )}
          step={10}
          max={50}
          min={0}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 15,
            fontFamily: fontFamilies.medium,
            fontSize: 20,
          }}
        >
          <div
            style={{
              width: 0,
              display: 'flex',
              justifyContent: 'space-around',
              marginLeft: 10,
            }}
          >
            0
          </div>
          <div
            style={{
              width: 0,
              display: 'flex',
              justifyContent: 'space-around',
              marginLeft: -10,
            }}
          >
            10
          </div>
          <div
            style={{
              width: 0,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            20
          </div>
          <div
            style={{
              width: 0,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            30
          </div>
          <div
            style={{
              width: 0,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            40
          </div>
          <div
            style={{
              width: 0,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            50+
          </div>
        </div>
      </StyledContainer>
      <div
        style={{
          borderTop: '1px solid #ddd',
          width: '100%',
          marginTop: 15,
        }}
      ></div>
      <Text b size={18}>
        Rating
      </Text>
      <Rating
        value={props.filters.rating || 0}
        iconMargin={'0.5rem'}
        onValueChange={ratingSetFunction}
        showNumber={true}
        readOnly={false}
      />
      <div
        style={{
          borderTop: '1px solid #ddd',
          width: '100%',
          marginTop: 15,
        }}
      ></div>
      <Text b size={18}>
        Expertise
      </Text>
      <Difficulty
        selectedDifficulties={props.filters.difficulty}
        addDifficultyHandler={addDifficultyHandler}
        removeDifficultyHandler={removeDifficultyHandler}
      />
    </>
  )
}

export default HeaderFilters
