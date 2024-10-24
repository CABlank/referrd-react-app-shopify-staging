import React from "react";

const MobileIcon = ({ color = "#F8F8F8" }) => {
  return (
    <svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M14.3981 9.90375L11.4538 8.58437L11.4456 8.58062C11.2928 8.51524 11.126 8.48901 10.9605 8.50428C10.7949 8.51956 10.6358 8.57587 10.4975 8.66812C10.4812 8.67886 10.4656 8.69055 10.4506 8.70312L8.92938 10C7.96563 9.53187 6.97063 8.54437 6.50251 7.59312L7.80126 6.04875C7.81376 6.03312 7.82563 6.0175 7.83688 6.00062C7.92715 5.86268 7.98192 5.70457 7.99631 5.54035C8.0107 5.37614 7.98428 5.21091 7.91938 5.05937V5.05187L6.59626 2.1025C6.51047 1.90454 6.36296 1.73963 6.17575 1.63239C5.98854 1.52516 5.77166 1.48135 5.55751 1.5075C4.71061 1.61894 3.93324 2.03485 3.37059 2.67756C2.80794 3.32026 2.49847 4.1458 2.50001 5C2.50001 9.9625 6.53751 14 11.5 14C12.3542 14.0015 13.1797 13.6921 13.8224 13.1294C14.4651 12.5668 14.8811 11.7894 14.9925 10.9425C15.0187 10.7284 14.975 10.5116 14.8679 10.3244C14.7607 10.1372 14.596 9.98963 14.3981 9.90375ZM11.5 13C9.37898 12.9977 7.3455 12.1541 5.84571 10.6543C4.34592 9.1545 3.50232 7.12102 3.50001 5C3.49765 4.38968 3.71754 3.79937 4.11859 3.33931C4.51964 2.87926 5.07444 2.58091 5.67938 2.5C5.67913 2.50249 5.67913 2.505 5.67938 2.5075L6.99188 5.445L5.70001 6.99125C5.68687 7.00631 5.67495 7.02241 5.66438 7.03937C5.57033 7.18369 5.51515 7.34987 5.5042 7.52178C5.49325 7.6937 5.5269 7.86553 5.60188 8.02062C6.16813 9.17875 7.33501 10.3369 8.50563 10.9025C8.66186 10.9768 8.83468 11.0093 9.00722 10.9968C9.17976 10.9843 9.3461 10.9272 9.49001 10.8312C9.50609 10.8205 9.52153 10.8088 9.53626 10.7962L11.0556 9.5L13.9931 10.8156H14C13.9201 11.4214 13.6222 11.9773 13.162 12.3794C12.7019 12.7814 12.111 13.0021 11.5 13Z"
        fill={color}
      />
    </svg>
  );
};

export default MobileIcon;
