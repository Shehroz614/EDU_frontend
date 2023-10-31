import React from 'react'

const ReviewIcon = ({ height = '100%', width = '100%', color = '#000000' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 19C8.21998 19 7.01754 18.4395 6.19428 17.48C4.93801 17.5782 3.68807 17.123 2.78248 16.2173C1.87689 15.3108 1.4233 14.0647 1.51987 12.8052C0.560453 11.9827 0 10.7801 0 9.5C0 8.21988 0.560453 7.01733 1.51987 6.19479C1.4233 4.93525 1.87689 3.68837 2.78248 2.78271C3.68807 1.87783 4.93801 1.42737 6.19428 1.52C7.01754 0.5605 8.21998 0 9.5 0C10.78 0 11.9825 0.5605 12.8057 1.52C14.062 1.42579 15.3127 1.87783 16.2175 2.78271C17.1231 3.68917 17.5767 4.93525 17.4801 6.19479C18.4395 7.01733 19 8.21988 19 9.5C19 10.7801 18.4395 11.9827 17.4801 12.8052C17.5767 14.0647 17.1231 15.3116 16.2175 16.2173C15.3127 17.123 14.0628 17.5782 12.8057 17.48C11.9825 18.4395 10.78 19 9.5 19ZM6.9083 15.7581L7.20119 16.1928C7.71811 16.9591 8.57779 17.4167 9.5 17.4167C10.4222 17.4167 11.2819 16.9591 11.7988 16.1928L12.0917 15.7581L12.6055 15.8579C13.5142 16.0344 14.4443 15.7502 15.0966 15.0979C15.7489 14.4447 16.0331 13.5138 15.8566 12.6073L15.756 12.0927L16.1914 11.7998C16.9577 11.2828 17.4152 10.4231 17.4152 9.50079C17.4152 8.5785 16.9577 7.71875 16.1914 7.20179L15.756 6.90888L15.8566 6.39429C16.0331 5.48783 15.7489 4.55604 15.0966 3.90371C14.4443 3.25138 13.5134 2.96796 12.6055 3.14371L12.0917 3.24346L11.7988 2.80883C11.2819 2.0425 10.4222 1.58492 9.5 1.58492C8.57779 1.58492 7.71811 2.0425 7.20119 2.80883L6.9083 3.24346L6.39455 3.14371C5.48658 2.96954 4.55566 3.25138 3.90338 3.90371C3.2511 4.55683 2.96692 5.48783 3.14345 6.39429L3.24398 6.90888L2.8086 7.20179C2.04233 7.71875 1.58478 8.5785 1.58478 9.50079C1.58478 10.4231 2.04233 11.2828 2.8086 11.7998L3.24398 12.0927L3.14345 12.6073C2.96692 13.5138 3.2511 14.4455 3.90338 15.0979C4.55566 15.7494 5.485 16.0336 6.39455 15.8579L6.9083 15.7581ZM9.42876 12.2075L14.0145 7.68946L12.9031 6.56133L8.30468 11.0746L6.09374 8.93158L4.99104 10.0692L7.19328 12.2035C7.50279 12.5131 7.90809 12.6667 8.31418 12.6667C8.72027 12.6667 9.1232 12.5139 9.42876 12.2075Z"
        fill={color}
      />
    </svg>
  )
}

export default ReviewIcon