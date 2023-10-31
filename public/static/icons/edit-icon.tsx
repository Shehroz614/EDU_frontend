import React, { SVGProps } from 'react'

const EditIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  const { color } = props
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="0.5"
        width="25"
        height="25"
        rx="4.5"
        stroke={color ? color : '#1A1E3D'}
      />
      <path
        d="M19.206 6.79516C18.8188 6.40855 18.294 6.19141 17.7469 6.19141C17.1997 6.19141 16.6749 6.40855 16.2877 6.79516L7.02481 16.0583C6.75955 16.322 6.54922 16.6358 6.40601 16.9814C6.26279 17.327 6.18952 17.6975 6.19044 18.0716V19.2409C6.19044 19.3919 6.25044 19.5368 6.35725 19.6436C6.46406 19.7504 6.60892 19.8104 6.75997 19.8104H7.92923C8.30328 19.8115 8.67382 19.7383 9.01941 19.5952C9.36499 19.4521 9.67876 19.2418 9.94253 18.9766L19.206 9.71295C19.5924 9.32577 19.8095 8.80109 19.8095 8.25406C19.8095 7.70703 19.5924 7.18234 19.206 6.79516V6.79516ZM9.13721 18.1713C8.816 18.4904 8.38199 18.67 7.92923 18.6713H7.32951V18.0716C7.32893 17.8472 7.37288 17.6248 7.45881 17.4175C7.54475 17.2101 7.67095 17.0219 7.83013 16.8636L14.8599 9.83369L16.1698 11.1437L9.13721 18.1713ZM18.4001 8.90761L16.9729 10.3355L15.6629 9.02835L17.0908 7.6005C17.1768 7.51467 17.2788 7.44663 17.3912 7.40025C17.5035 7.35388 17.6238 7.33007 17.7453 7.33021C17.8668 7.33034 17.9871 7.3544 18.0993 7.40102C18.2115 7.44765 18.3134 7.51591 18.3993 7.60192C18.4851 7.68794 18.5531 7.79001 18.5995 7.90232C18.6459 8.01463 18.6697 8.13498 18.6696 8.25649C18.6694 8.37799 18.6454 8.49829 18.5987 8.6105C18.5521 8.72271 18.4839 8.82463 18.3978 8.91046L18.4001 8.90761Z"
        fill={color ? color : '#1A1E3D'}
      />
    </svg>
  )
}

export default EditIcon