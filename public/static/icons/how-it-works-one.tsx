export const HowItWorksOne: React.FunctionComponent<{
  width?: string
  right?: string
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed'
}> = (props) => (
  <svg
    width={props.width ? props.width : '399'}
    style={{
      position: props.position ? props.position : 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      minWidth: '237px',
      zIndex: 2,
    }}
    viewBox="0 0 399 292"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M382.261 290.802H79.0746C70.5755 290.802 63.71 283.915 63.71 275.438V39.4713C63.71 30.9722 70.5976 24.1067 79.0746 24.1067H382.283C390.782 24.1067 397.648 30.9943 397.648 39.4713V275.438C397.648 283.937 390.76 290.802 382.261 290.802Z"
      fill="white"
    />
    <path
      d="M382.261 291.31H79.0745C70.3326 291.31 63.2021 284.201 63.2021 275.437V39.4712C63.2021 30.7293 70.3105 23.5989 79.0745 23.5989H382.283C391.025 23.5989 398.155 30.7072 398.155 39.4712V275.437C398.133 284.179 391.003 291.31 382.261 291.31ZM79.0745 24.5923C70.8624 24.5923 64.1956 31.2591 64.1956 39.4712V275.437C64.1956 283.65 70.8624 290.316 79.0745 290.316H382.283C390.495 290.316 397.162 283.65 397.162 275.437V39.4712C397.162 31.2591 390.495 24.5923 382.283 24.5923H79.0745Z"
      fill="black"
    />
    <path
      d="M397.713 57.4628H63.7757C63.5108 57.4628 63.29 57.242 63.29 56.9771V39.5153C63.29 30.7513 70.4205 23.6208 79.1845 23.6208H382.305C391.069 23.6208 398.199 30.7513 398.199 39.5153V56.955C398.199 57.242 397.978 57.4628 397.713 57.4628ZM64.2614 56.4694H397.228V39.5153C397.228 31.2811 390.539 24.5922 382.305 24.5922H79.1845C70.9503 24.5922 64.2614 31.2811 64.2614 39.5153V56.4694Z"
      fill="black"
    />
    <path
      d="M359.699 266.563H101.635C94.3504 266.563 88.4121 260.625 88.4121 253.34V93.0487C88.4121 85.7638 94.3504 79.8254 101.635 79.8254H359.699C366.984 79.8254 372.923 85.7638 372.923 93.0487V253.34C372.923 260.647 366.984 266.563 359.699 266.563ZM101.635 80.7968C94.8803 80.7968 89.3834 86.2936 89.3834 93.0487V253.34C89.3834 260.095 94.8803 265.592 101.635 265.592H359.699C366.454 265.592 371.951 260.095 371.951 253.34V93.0487C371.951 86.2936 366.454 80.7968 359.699 80.7968H101.635Z"
      fill="black"
    />
    <path
      d="M347.871 45.0772C350.061 42.8874 350.061 39.3372 347.871 37.1474C345.681 34.9577 342.131 34.9577 339.941 37.1474C337.752 39.3372 337.752 42.8874 339.941 45.0772C342.131 47.2669 345.681 47.2669 347.871 45.0772Z"
      fill="black"
    />
    <path
      d="M367.722 42.4212C368.434 39.4074 366.567 36.3873 363.554 35.6757C360.54 34.964 357.52 36.8303 356.808 39.8441C356.096 42.8579 357.963 45.8779 360.976 46.5896C363.99 47.3012 367.01 45.4349 367.722 42.4212Z"
      fill="black"
    />
    <path
      d="M386.065 42.419C386.776 39.4052 384.91 36.3851 381.896 35.6735C378.883 34.9619 375.862 36.8281 375.151 39.8419C374.439 42.8557 376.305 45.8757 379.319 46.5874C382.333 47.299 385.353 45.4327 386.065 42.419Z"
      fill="black"
    />
    <path
      d="M192.677 151.284H10.7956C5.10013 151.284 0.486328 146.67 0.486328 140.975V10.7949C0.486328 5.0994 5.10013 0.485596 10.7956 0.485596H192.677C198.372 0.485596 202.986 5.0994 202.986 10.7949V140.975C202.986 146.67 198.372 151.284 192.677 151.284Z"
      fill="white"
    />
    <path
      d="M192.676 151.77H10.795C4.83456 151.77 0 146.935 0 140.975V10.795C0 4.83456 4.83456 0 10.795 0H192.676C198.636 0 203.471 4.83456 203.471 10.795V140.975C203.471 146.935 198.636 151.77 192.676 151.77ZM10.795 0.971327C5.38645 0.971327 0.971327 5.38645 0.971327 10.795V140.975C0.971327 146.383 5.36437 150.799 10.795 150.799H192.676C198.084 150.799 202.5 146.405 202.5 140.975V10.795C202.5 5.38645 198.107 0.971327 192.676 0.971327H10.795Z"
      fill="black"
    />
    <path
      d="M183.404 19.5148H148.9C147.465 19.5148 146.317 18.3669 146.317 16.932C146.317 15.4971 147.465 14.3491 148.9 14.3491H183.382C184.817 14.3491 185.965 15.4971 185.965 16.932C185.987 18.3669 184.817 19.5148 183.404 19.5148Z"
      fill="black"
    />
    <path
      d="M190.799 30.5746H141.416C139.981 30.5746 138.833 29.4267 138.833 27.9918C138.833 26.5569 139.981 25.4089 141.416 25.4089H190.799C192.234 25.4089 193.382 26.5569 193.382 27.9918C193.382 29.4267 192.234 30.5746 190.799 30.5746Z"
      fill="black"
    />
    <path
      d="M190.932 51.3478H141.571C140.136 51.3478 138.988 50.1999 138.988 48.765C138.988 47.3301 140.136 46.1821 141.571 46.1821H190.932C192.367 46.1821 193.515 47.3301 193.515 48.765C193.515 50.1999 192.367 51.3478 190.932 51.3478Z"
      fill="black"
    />
    <path
      d="M190.777 61.3261H142.475C141.041 61.3261 139.893 60.1782 139.893 58.7432C139.893 57.3083 141.041 56.1604 142.475 56.1604H190.755C192.19 56.1604 193.338 57.3083 193.338 58.7432C193.338 60.1782 192.19 61.3261 190.777 61.3261Z"
      fill="black"
    />
    <path
      d="M191.087 71.4587H142.807C141.373 71.4587 140.225 70.3107 140.225 68.8758C140.225 67.4409 141.373 66.293 142.807 66.293H191.087C192.522 66.293 193.67 67.4409 193.67 68.8758C193.67 70.3107 192.522 71.4587 191.087 71.4587Z"
      fill="black"
    />
    <path
      d="M190.932 81.4369H141.571C140.136 81.4369 138.988 80.289 138.988 78.8541C138.988 77.4192 140.136 76.2712 141.571 76.2712H190.932C192.367 76.2712 193.515 77.4192 193.515 78.8541C193.515 80.289 192.345 81.4369 190.932 81.4369Z"
      fill="black"
    />
    <path
      d="M190.755 91.7463H141.416C139.981 91.7463 138.833 90.5983 138.833 89.1634C138.833 87.7285 139.981 86.5806 141.416 86.5806H190.777C192.212 86.5806 193.36 87.7285 193.36 89.1634C193.338 90.5983 192.19 91.7463 190.755 91.7463Z"
      fill="black"
    />
    <path
      d="M159.474 41.4137H141.505C140.07 41.4137 138.922 40.2658 138.922 38.8309C138.922 37.396 140.07 36.248 141.505 36.248H159.474C160.909 36.248 162.057 37.396 162.057 38.8309C162.057 40.2437 160.909 41.4137 159.474 41.4137Z"
      fill="black"
    />
    <path
      d="M191.043 41.4137H172.08C170.645 41.4137 169.497 40.2658 169.497 38.8309C169.497 37.396 170.645 36.248 172.08 36.248H191.043C192.478 36.248 193.626 37.396 193.626 38.8309C193.626 40.2437 192.478 41.4137 191.043 41.4137Z"
      fill="black"
    />
    <path
      d="M62.5846 99.9804H13.952C12.5171 99.9804 11.3691 98.8325 11.3691 97.3975C11.3691 95.9626 12.5171 94.8147 13.952 94.8147H62.6066C64.0415 94.8147 65.1895 95.9626 65.1895 97.3975C65.1895 98.8325 64.0195 99.9804 62.5846 99.9804Z"
      fill="black"
    />
    <path
      d="M108.766 99.8036H71.5243C70.0893 99.8036 68.9414 98.6557 68.9414 97.2208C68.9414 95.7859 70.0893 94.6379 71.5243 94.6379H108.766C110.201 94.6379 111.349 95.7859 111.349 97.2208C111.349 98.6557 110.201 99.8036 108.766 99.8036Z"
      fill="black"
    />
    <path
      d="M48.0587 89.2074H13.7752C12.3403 89.2074 11.1924 88.0595 11.1924 86.6246C11.1924 85.1897 12.3403 84.0417 13.7752 84.0417H48.0587C49.4936 84.0417 50.6415 85.1897 50.6415 86.6246C50.6415 88.0595 49.4936 89.2074 48.0587 89.2074Z"
      fill="black"
    />
    <path
      d="M108.898 144.396H14.6572C12.4055 144.396 10.5732 142.564 10.5732 140.312V110.532C10.5732 108.281 12.4055 106.448 14.6572 106.448H108.876C111.128 106.448 112.96 108.281 112.96 110.532V140.312C112.982 142.564 111.15 144.396 108.898 144.396ZM14.6572 107.42C12.9353 107.42 11.5446 108.811 11.5446 110.532V140.312C11.5446 142.034 12.9353 143.425 14.6572 143.425H108.876C110.598 143.425 111.989 142.034 111.989 140.312V110.532C111.989 108.811 110.598 107.42 108.876 107.42H14.6572Z"
      fill="black"
    />
    <path
      d="M191.66 144.396H124.263C122.011 144.396 120.179 142.564 120.179 140.312V110.532C120.179 108.281 122.011 106.448 124.263 106.448H191.66C193.911 106.448 195.744 108.281 195.744 110.532V140.312C195.766 142.564 193.933 144.396 191.66 144.396ZM124.263 107.42C122.541 107.42 121.15 108.811 121.15 110.532V140.312C121.15 142.034 122.541 143.425 124.263 143.425H191.66C193.381 143.425 194.772 142.034 194.772 140.312V110.532C194.772 108.811 193.381 107.42 191.66 107.42H124.263Z"
      fill="black"
    />
    <path
      d="M128.369 71.282H14.989C12.8256 71.282 11.0596 69.5159 11.0596 67.3525V18.1018C11.0596 15.9384 12.8256 14.1724 14.989 14.1724H128.347C130.511 14.1724 132.277 15.9384 132.277 18.1018V67.3525C132.299 69.5159 130.533 71.282 128.369 71.282Z"
      fill="black"
    />
    <path
      d="M360.804 265.989C360.34 263.539 359.877 261.706 359.479 259.984C356.477 247.203 353.276 236.805 350.914 229.785L344.556 206.583L266.033 220.866C266.033 220.866 263.494 238.019 258.307 265.989H360.804Z"
      fill="black"
    />
    <path
      d="M276.188 263.053C284.797 263.053 290.427 253.671 286.563 245.679C285.68 243.847 284.775 242.015 283.892 240.205C277.27 226.827 258.307 229.741 255.945 244.576C255.9 244.841 255.371 245.105 255.348 245.37C254.134 254.753 261.353 263.053 270.492 263.053H276.188Z"
      fill="black"
    />
    <path
      d="M384.073 157.907C384.073 124.948 377.671 109.716 332.813 97.3975C321.422 94.2628 304.623 92.9603 288.353 94.7926C243.032 95.3445 225.725 115.566 209.852 115.08C192.412 114.506 177.909 91.8345 177.909 91.8345C172.125 85.565 165.988 88.7439 162.721 90.5982C158.791 92.8279 157.114 98.0598 156.407 101.746C155.944 104.108 156.363 106.581 157.511 108.656C163.295 119.032 183.648 153.094 202.479 155.898C217.424 158.128 247.359 149.805 261.001 147.178C270.626 180.755 255.35 245.37 255.35 245.37C266.763 237.202 304.954 247.732 329.436 257.048C341.666 261.706 352.659 259.101 360.695 254.51C368.708 249.918 354.514 202.499 354.514 202.499C354.514 202.499 384.073 186.649 384.073 157.907Z"
      fill="white"
    />
    <path
      d="M342.46 260.006C338.398 260.006 333.96 259.3 329.236 257.49C307.404 249.189 267.314 237.379 255.614 245.768C255.438 245.878 255.217 245.9 255.062 245.768C254.886 245.657 254.819 245.437 254.864 245.238C255.018 244.598 269.875 180.91 260.647 147.73C257.755 148.304 254.201 149.099 250.117 150.026C234.929 153.447 214.156 158.127 202.39 156.384C183.361 153.558 162.897 119.319 157.069 108.877C155.832 106.669 155.435 104.108 155.899 101.614C156.671 97.6403 158.415 92.4305 162.455 90.1346C165.325 88.501 172.014 84.704 178.261 91.4591C178.283 91.4812 178.305 91.5033 178.305 91.5254C178.46 91.7461 192.875 113.998 209.896 114.528C215.856 114.727 222.103 111.879 230.028 108.303C242.81 102.519 260.294 94.5939 288.374 94.2627C303.673 92.5408 320.781 93.5563 332.967 96.8897C355.197 103.005 368.376 110.003 375.661 119.583C383.057 129.297 384.558 141.924 384.558 157.885C384.558 172.896 376.434 184.331 369.613 191.285C363.144 197.886 356.61 201.793 355.043 202.698C355.661 204.817 358.773 215.568 361.047 226.65C364.469 243.383 364.425 252.876 360.893 254.907C356.367 257.534 350.054 260.006 342.46 260.006ZM268.396 241.971C285.88 241.971 312.989 250.271 329.59 256.585C342.725 261.574 353.608 257.975 360.429 254.09C366.743 250.492 357.935 215.723 354.005 202.632C353.939 202.411 354.027 202.168 354.248 202.058C354.535 201.903 383.586 186.031 383.586 157.907C383.586 126.604 378.575 110.466 332.702 97.8611C320.627 94.5497 303.673 93.5563 288.441 95.2561C260.537 95.6094 243.141 103.468 230.448 109.23C222.412 112.872 216.077 115.742 209.873 115.544C192.544 114.992 178.394 93.4901 177.511 92.1214C172.499 86.6908 167.334 88.5231 162.941 91.0176C159.232 93.1369 157.598 98.0597 156.87 101.813C156.428 104.064 156.804 106.404 157.93 108.391C163.691 118.723 183.957 152.631 202.544 155.39C214.112 157.112 234.797 152.454 249.897 149.054C254.179 148.083 257.888 147.244 260.89 146.67C261.133 146.626 261.376 146.781 261.464 147.023C270.294 177.863 258.065 235.414 256.078 244.311C259.036 242.677 263.319 241.971 268.396 241.971Z"
      fill="black"
    />
    <path
      d="M168.482 113.159C163.427 113.159 160.16 107.574 160.027 107.332C159.895 107.089 159.983 106.802 160.204 106.669C160.447 106.537 160.733 106.625 160.866 106.846C160.888 106.89 164.067 112.254 168.57 112.188C172.036 112.144 175.48 108.987 178.791 102.828C178.924 102.585 179.211 102.497 179.454 102.629C179.696 102.762 179.785 103.049 179.652 103.292C176.164 109.782 172.434 113.115 168.57 113.159C168.548 113.159 168.504 113.159 168.482 113.159Z"
      fill="black"
    />
    <path
      d="M313.739 188.217C313.563 188.217 313.386 188.106 313.298 187.93C313.187 187.687 313.298 187.4 313.541 187.267C330.186 179.563 338.243 168.282 342.084 160.158C346.235 151.35 346.477 144.264 346.477 144.198C346.477 143.933 346.698 143.712 346.963 143.712C346.963 143.712 346.963 143.712 346.985 143.712C347.25 143.712 347.471 143.933 347.471 144.22C347.471 144.507 347.25 151.549 343.012 160.534C339.104 168.812 330.914 180.336 313.982 188.172C313.894 188.217 313.828 188.217 313.739 188.217Z"
      fill="black"
    />
    <path
      d="M321.113 211.352C320.848 211.352 320.627 211.131 320.627 210.866C320.627 210.601 320.848 210.381 321.113 210.381C341.51 210.138 354.977 202.566 355.109 202.478C355.352 202.345 355.639 202.433 355.771 202.654C355.904 202.897 355.815 203.184 355.595 203.316C355.44 203.405 341.753 211.109 321.113 211.352Z"
      fill="black"
    />
    <path
      d="M302.215 209.564C302.215 209.564 306.388 210.005 314.666 207.93C320.913 206.363 319.081 186.075 311.465 191.572C305.107 196.164 301.399 196.76 301.399 196.76L295.284 193.713C292.877 192.521 290.295 191.727 287.645 191.418C277.093 190.181 277.734 192.61 277.734 192.61C277.27 195.082 278.153 195.435 280.096 196.252L288.352 199.718C289.5 200.204 289.765 201.749 288.838 202.61C287.403 203.934 285.747 204.972 283.959 205.678C280.714 206.959 275.04 209.034 269.19 210.358C266.453 210.977 265.57 214.376 268.109 215.657L286.321 217.003C290.935 217.334 295.504 215.745 298.948 212.566L302.215 209.564Z"
      fill="white"
    />
    <path
      d="M287.514 217.533C287.094 217.533 286.697 217.511 286.277 217.489L268.065 216.142C267.999 216.142 267.933 216.12 267.888 216.098C266.63 215.48 265.968 214.31 266.144 212.985C266.321 211.484 267.513 210.248 269.103 209.895C275.041 208.548 280.869 206.407 283.805 205.237C285.549 204.553 287.138 203.537 288.529 202.257C288.838 201.97 288.993 201.528 288.904 201.109C288.838 200.689 288.573 200.336 288.176 200.182L279.92 196.716C278.021 195.921 276.763 195.391 277.248 192.588C277.226 192.411 277.271 192.08 277.58 191.727C278.639 190.513 282.039 190.248 287.734 190.91C290.428 191.219 293.032 192.014 295.527 193.25L301.487 196.23C302.216 196.054 305.726 195.104 311.201 191.153C313.232 189.696 314.733 190.049 315.66 190.601C318.419 192.279 319.413 197.974 318.751 202.301C318.243 205.678 316.808 207.908 314.799 208.394C307.514 210.226 303.386 210.116 302.393 210.049L299.28 212.897C296.057 215.899 291.818 217.533 287.514 217.533ZM268.242 215.171L286.366 216.496C290.825 216.827 295.284 215.259 298.64 212.169L301.907 209.166C302.017 209.078 302.15 209.034 302.282 209.034C302.326 209.034 306.499 209.453 314.556 207.422C316.146 207.025 317.316 205.104 317.757 202.124C318.375 198.107 317.448 192.853 315.13 191.418C314.181 190.844 313.033 190.998 311.775 191.925C305.395 196.539 301.664 197.179 301.51 197.201C301.399 197.224 301.311 197.201 301.223 197.157L295.108 194.111C292.723 192.919 290.207 192.168 287.646 191.859C280.184 190.976 278.639 191.992 278.352 192.345L278.264 192.455C278.286 192.521 278.286 192.588 278.264 192.676C277.889 194.751 278.396 194.972 280.339 195.789L288.595 199.254C289.28 199.541 289.765 200.16 289.898 200.91C290.03 201.683 289.787 202.433 289.213 202.963C287.734 204.332 286.035 205.414 284.18 206.142C280.56 207.577 275.041 209.542 269.345 210.844C267.977 211.153 267.27 212.213 267.16 213.096C266.983 213.979 267.403 214.729 268.242 215.171Z"
      fill="black"
    />
    <path
      d="M127.355 60.6198C127.752 59.4056 128.944 58.6992 130.159 58.9641C133.514 59.6926 150.733 63.4896 153.956 64.2181C157.179 64.9466 157.29 68.5228 159.122 71.8121C160.711 74.6599 166.186 85.1016 172.169 92.3645C173.957 94.55 174.222 97.7068 172.809 100.179C172.014 101.614 170.976 103.005 169.784 103.844C166.672 105.963 164.332 108.502 158.084 93.5566C157.709 92.6515 157.069 91.8568 156.23 91.3049C155.06 90.5322 153.228 89.1415 151.44 87.0222C151.44 87.0222 140.954 99.804 138.282 73.8431C138.04 71.5251 139.077 69.2955 141.02 68.1476C141.174 68.0593 141.329 67.971 141.505 67.8827L128.944 63.8649C127.62 63.4455 126.914 61.9664 127.355 60.6198Z"
      fill="white"
    />
    <path
      d="M166.407 105.963C166.142 105.963 165.855 105.919 165.568 105.853C163.25 105.168 160.866 101.548 157.599 93.7552C157.245 92.9163 156.671 92.232 155.921 91.7242C154.773 90.9736 153.095 89.6933 151.395 87.7727C150.402 88.8323 147.598 91.371 144.64 90.488C141.108 89.4284 138.79 83.8432 137.753 73.9092C137.51 71.5692 138.503 69.3175 140.291 68.0371L128.768 64.3505C128.017 64.1076 127.421 63.5778 127.046 62.8714C126.671 62.1429 126.604 61.2599 126.869 60.4872C127.355 59.0523 128.79 58.1914 130.225 58.5004C135.832 59.7367 151.064 63.0921 154.022 63.7544C156.517 64.3284 157.334 66.4256 158.217 68.6773C158.592 69.6265 158.967 70.6199 159.519 71.5913C159.696 71.9003 159.917 72.2977 160.181 72.7833C162.279 76.6245 167.224 85.6313 172.522 92.0774C174.442 94.4174 174.729 97.7729 173.228 100.444C172.235 102.21 171.153 103.513 170.049 104.263L169.63 104.55C168.614 105.257 167.577 105.963 166.407 105.963ZM151.417 86.5364C151.572 86.5364 151.704 86.6027 151.793 86.7131C153.515 88.7661 155.303 90.1127 156.473 90.9074C157.378 91.5035 158.084 92.3644 158.504 93.3799C161.55 100.687 163.89 104.351 165.833 104.925C166.915 105.234 167.908 104.55 169.056 103.755L169.475 103.468C170.469 102.784 171.44 101.614 172.367 99.9805C173.67 97.6626 173.427 94.7486 171.771 92.7176C166.429 86.2053 161.462 77.1322 159.343 73.269C159.078 72.7833 158.857 72.386 158.68 72.0769C158.106 71.0614 157.709 70.046 157.334 69.0526C156.495 66.8891 155.833 65.1893 153.846 64.7257C150.888 64.0635 135.678 60.708 130.07 59.4717C129.121 59.2731 128.172 59.825 127.841 60.7963C127.664 61.3482 127.708 61.9221 127.973 62.4299C128.216 62.9155 128.613 63.2687 129.121 63.4233L141.682 67.441C141.881 67.5073 142.013 67.6618 142.013 67.8605C142.035 68.0592 141.925 68.2358 141.748 68.3461C141.594 68.4344 141.417 68.5227 141.285 68.611C139.541 69.6265 138.569 71.6796 138.79 73.8209C140.004 85.6755 142.83 88.9206 144.971 89.5608C147.974 90.4659 151.042 86.7793 151.086 86.7351C151.13 86.6027 151.263 86.5364 151.417 86.5364Z"
      fill="black"
    />
    <path
      d="M153.824 81.6577C153.735 81.6577 153.647 81.6356 153.581 81.5915C152.742 81.1058 151.219 80.0241 150.601 79.5826C147.201 77.1543 145.324 74.726 144.486 73.5118C143.912 72.6509 143.625 71.7016 143.647 70.7303C143.691 68.9201 144.839 68.5227 145.391 68.324C147.4 67.6176 150.645 69.5603 150.998 69.781C151.219 69.9135 151.307 70.2225 151.152 70.4654C151.02 70.6861 150.711 70.7744 150.468 70.6199C149.585 70.0901 147.024 68.7876 145.7 69.2512C145.17 69.4278 144.64 69.6265 144.618 70.7523C144.596 71.5029 144.839 72.2756 145.302 72.9599C146.097 74.1299 147.907 76.4479 151.174 78.7879C151.66 79.119 153.272 80.2669 154.088 80.7526C154.331 80.8851 154.398 81.1941 154.265 81.4149C154.155 81.5694 153.978 81.6577 153.824 81.6577Z"
      fill="black"
    />
    <path
      d="M151.549 87.6843C151.417 87.6843 151.284 87.6402 151.196 87.5298C148.415 84.5717 148.591 81.4369 148.591 81.3045C148.613 81.0396 148.834 80.8188 149.121 80.8409C149.386 80.863 149.607 81.0837 149.585 81.3707C149.585 81.4148 149.452 84.2405 151.925 86.8675C152.101 87.0662 152.101 87.3753 151.902 87.5519C151.792 87.6402 151.682 87.6843 151.549 87.6843Z"
      fill="black"
    />
    <path
      d="M316.543 96.625L315.417 65.8958L293.871 77.2205L294.114 96.6471C294.268 100.974 297.823 103.38 297.823 103.38C302.238 106.736 308.397 106.118 312.878 102.894L313.916 102.144C315.638 100.908 316.631 98.8105 316.543 96.625Z"
      fill="white"
    />
    <path
      d="M304.688 106.118C302.083 106.118 299.567 105.345 297.513 103.755C297.381 103.667 293.783 101.173 293.606 96.6471L293.363 77.2205C293.363 77.0439 293.452 76.8673 293.628 76.779L315.174 65.4542C315.328 65.3659 315.505 65.388 315.638 65.4542C315.792 65.5425 315.88 65.6971 315.88 65.8516L317.006 96.5808C317.117 98.9429 316.057 101.173 314.158 102.519L313.121 103.27C310.538 105.168 307.558 106.118 304.688 106.118ZM294.335 77.5075L294.577 96.625C294.732 100.621 298.043 102.939 298.065 102.961C302.105 106.029 307.911 105.831 312.569 102.475L313.607 101.724C315.218 100.554 316.123 98.656 316.035 96.625L314.931 66.6905L294.335 77.5075Z"
      fill="black"
    />
    <path
      d="M284.069 30.7072C289.831 30.354 282.59 36.4469 303.871 30.067C312.348 27.5283 308.065 37.7052 310.251 37.0429C318.375 34.6367 318.088 34.7029 322.061 35.7625C324.688 36.4689 326.388 41.458 325.902 45.1667C325.24 50.0675 321.311 51.3479 317.823 61.7234C315.372 69.0084 315.968 73.4456 313.143 74.5052C310.273 75.5869 308.154 71.6133 304.931 72.5405C300.758 73.7547 301.575 81.1721 297.535 84.2406C294.975 86.1832 289.014 87.0883 279.477 82.32C277.932 81.5473 277.137 79.7371 277.601 78.0373C278.197 75.8518 278.948 73.0703 279.875 70.4875C284.334 58.1693 288.595 55.3877 287.049 52.2089C284.687 47.3301 275.703 50.1338 274.223 46.116C272.656 41.9437 276.188 31.1929 284.069 30.7072Z"
      fill="black"
    />
    <path
      d="M304.159 51.8999L302.503 55.0567C301.731 56.5357 301.046 58.081 300.494 59.6705C299.435 62.6507 297.404 67.6839 296.3 70.5096C292.746 79.6489 281.818 69.6045 281.818 69.6045L281.068 67.0879L279.589 66.4698C279.302 66.3594 279.037 66.1607 278.86 65.9179C278.397 65.2998 278.397 64.4609 278.794 63.8648C280.98 60.5314 285.571 53.0478 287.205 46.3147C287.183 46.3368 296.565 43.8423 304.159 51.8999Z"
      fill="white"
    />
    <path
      d="M291.333 74.8584C286.807 74.8584 281.686 70.2004 281.465 69.9797C281.399 69.9135 281.354 69.8472 281.332 69.7589L280.648 67.4631L279.39 66.9333C278.992 66.7787 278.683 66.5359 278.462 66.2268C277.889 65.4542 277.844 64.3946 278.374 63.5998C280.339 60.6196 285.063 52.9594 286.719 46.2043C286.763 46.0276 286.895 45.8952 287.072 45.851C287.16 45.829 296.807 43.3786 304.512 51.5465C304.644 51.7011 304.688 51.9218 304.6 52.1205L302.944 55.2773C302.172 56.7343 301.509 58.2796 300.958 59.8249C300.185 61.9883 298.882 65.2776 297.845 67.9267C297.448 68.9642 297.072 69.9135 296.763 70.6861C295.902 72.9157 294.511 74.2624 292.679 74.7039C292.238 74.8142 291.796 74.8584 291.333 74.8584ZM282.237 69.3616C283.032 70.068 288.463 74.6818 292.436 73.7546C293.937 73.4014 295.085 72.2535 295.814 70.355C296.123 69.5603 296.498 68.611 296.896 67.5955C297.933 64.9464 299.236 61.6793 300.008 59.5158C300.582 57.9264 301.267 56.337 302.061 54.8358L303.54 51.9881C297.006 45.2771 289.125 46.4471 287.58 46.7561C285.902 53.3347 281.597 60.4651 279.169 64.1517C278.86 64.6153 278.882 65.2114 279.213 65.6529C279.346 65.8074 279.522 65.9399 279.743 66.0502L281.222 66.6683C281.354 66.7346 281.465 66.8449 281.509 66.9774L282.237 69.3616Z"
      fill="black"
    />
    <path
      d="M301.818 62.9376C301.818 62.9376 305.77 55.3215 308.728 57.9264C311.708 60.5092 307.161 68.7655 301.818 62.9376Z"
      fill="white"
    />
    <path
      d="M287.204 64.24C286.365 64.24 285.658 63.9751 285.107 63.4453C284.091 62.4519 283.628 60.5755 283.782 57.8381C283.892 55.7409 284.488 54.4826 285.592 53.9969C286.409 53.6437 287.248 53.6216 287.998 53.9307C288.617 54.1956 289.08 54.6592 289.301 55.189C290.603 58.677 290.074 61.5247 289.124 63.0479C288.683 63.7543 288.131 64.1959 287.601 64.24C287.447 64.24 287.336 64.24 287.204 64.24ZM286.917 54.6813C286.608 54.6813 286.299 54.7475 286.012 54.8799C285.283 55.2111 284.886 56.1824 284.798 57.8822C284.665 60.2885 285.018 61.9662 285.813 62.7389C286.232 63.1583 286.806 63.3128 287.513 63.2466C287.689 63.2245 287.998 63.0038 288.285 62.5181C289.08 61.2598 289.566 58.677 288.396 55.5201C288.285 55.2332 287.998 54.9682 287.645 54.8137C287.402 54.7254 287.16 54.6813 286.917 54.6813Z"
      fill="black"
    />
    <path
      d="M305.394 57.0214C305.372 57.0214 305.349 57.0214 305.327 57.0214L287.336 54.6813C287.071 54.6372 286.872 54.3944 286.916 54.1295C286.96 53.8645 287.203 53.6659 287.468 53.71L305.46 56.05C305.725 56.0942 305.923 56.337 305.879 56.6019C305.835 56.8448 305.636 57.0214 305.394 57.0214Z"
      fill="black"
    />
    <path
      d="M279.344 62.3194C279.278 62.3194 279.19 62.2974 279.124 62.2753C278.616 62.0325 278.241 61.0611 278.064 60.5092C277.512 58.7653 277.336 56.2045 278.461 54.2177C278.837 53.5554 279.389 53.136 280.073 53.0035C281.773 52.6724 283.76 54.2839 283.848 54.3501C284.069 54.5267 284.091 54.8358 283.914 55.0345C283.738 55.2552 283.428 55.2773 283.23 55.1007C282.766 54.7254 281.287 53.7541 280.25 53.9528C279.852 54.019 279.543 54.2618 279.322 54.6813C277.821 57.3524 279.102 61.0391 279.587 61.3923C279.83 61.5026 279.918 61.7896 279.808 62.0325C279.72 62.2091 279.521 62.3194 279.344 62.3194Z"
      fill="black"
    />
  </svg>
)
