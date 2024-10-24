import React from "react";
const ReferralsIcon = ({ fillColor = "black" }) => {
  const isWhite = fillColor === "white";
  return (
    <div>
      {isWhite ? (
        <svg
          width="25"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.40002 9.59999C9.3548 9.59999 10.2705 9.22071 10.9456 8.54558C11.6207 7.87045 12 6.95477 12 5.99999C12 5.04521 11.6207 4.12954 10.9456 3.45441C10.2705 2.77928 9.3548 2.39999 8.40002 2.39999C7.44524 2.39999 6.52957 2.77928 5.85444 3.45441C5.1793 4.12954 4.80002 5.04521 4.80002 5.99999C4.80002 6.95477 5.1793 7.87045 5.85444 8.54558C6.52957 9.22071 7.44524 9.59999 8.40002 9.59999ZM17.4 10.8C18.1957 10.8 18.9587 10.4839 19.5213 9.92131C20.084 9.35871 20.4 8.59564 20.4 7.79999C20.4 7.00434 20.084 6.24128 19.5213 5.67867C18.9587 5.11606 18.1957 4.79999 17.4 4.79999C16.6044 4.79999 15.8413 5.11606 15.2787 5.67867C14.7161 6.24128 14.4 7.00434 14.4 7.79999C14.4 8.59564 14.7161 9.35871 15.2787 9.92131C15.8413 10.4839 16.6044 10.8 17.4 10.8ZM1.93802 19.7136C1.70274 19.567 1.51377 19.3567 1.39294 19.1072C1.27211 18.8577 1.22437 18.5791 1.25522 18.3036C1.47645 16.5649 2.32412 14.9665 3.63939 13.8079C4.95467 12.6494 6.64727 12.0103 8.40002 12.0103C10.1528 12.0103 11.8454 12.6494 13.1606 13.8079C14.4759 14.9665 15.3236 16.5649 15.5448 18.3036C15.6144 18.864 15.3384 19.4076 14.8608 19.7124C12.9327 20.948 10.69 21.6032 8.40002 21.6C6.10971 21.6038 3.8666 20.949 1.93802 19.7136ZM17.4 19.2H17.2728C17.3568 18.8436 17.3784 18.4668 17.3304 18.0804C17.1253 16.4308 16.4655 14.8706 15.4248 13.5744C16.0946 13.3109 16.8102 13.1838 17.5298 13.2007C18.2493 13.2176 18.9582 13.3781 19.6148 13.6727C20.2715 13.9674 20.8626 14.3903 21.3536 14.9166C21.8445 15.443 22.2253 16.0621 22.4736 16.7376C22.5499 16.9532 22.5485 17.1888 22.4696 17.4035C22.3908 17.6182 22.2394 17.7986 22.0416 17.9136C20.6409 18.7581 19.0356 19.203 17.4 19.2Z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="25"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
        >
          <path
            d="M15 19.128C15.853 19.3757 16.7368 19.5009 17.625 19.5C19.0534 19.5021 20.4633 19.1764 21.746 18.548C21.7839 17.6517 21.5286 16.7675 21.0188 16.0293C20.509 15.2912 19.7724 14.7394 18.9207 14.4575C18.0691 14.1757 17.1487 14.1791 16.2992 14.4674C15.4497 14.7557 14.7173 15.313 14.213 16.055M15 19.128V19.125C15 18.012 14.714 16.965 14.213 16.055M15 19.128V19.234C13.0755 20.3931 10.8706 21.0038 8.62402 21C6.29302 21 4.11202 20.355 2.25002 19.234L2.24902 19.125C2.24826 17.7095 2.71864 16.3339 3.58601 15.2153C4.45338 14.0966 5.6684 13.2984 7.03951 12.9466C8.41063 12.5948 9.85985 12.7093 11.1587 13.2721C12.4575 13.8349 13.5321 14.814 14.213 16.055M12 6.375C12 7.27011 11.6444 8.12855 11.0115 8.76149C10.3786 9.39442 9.52013 9.75 8.62502 9.75C7.72992 9.75 6.87147 9.39442 6.23854 8.76149C5.6056 8.12855 5.25002 7.27011 5.25002 6.375C5.25002 5.47989 5.6056 4.62145 6.23854 3.98851C6.87147 3.35558 7.72992 3 8.62502 3C9.52013 3 10.3786 3.35558 11.0115 3.98851C11.6444 4.62145 12 5.47989 12 6.375ZM20.25 8.625C20.25 9.32119 19.9735 9.98887 19.4812 10.4812C18.9889 10.9734 18.3212 11.25 17.625 11.25C16.9288 11.25 16.2612 10.9734 15.7689 10.4812C15.2766 9.98887 15 9.32119 15 8.625C15 7.92881 15.2766 7.26113 15.7689 6.76884C16.2612 6.27656 16.9288 6 17.625 6C18.3212 6 18.9889 6.27656 19.4812 6.76884C19.9735 7.26113 20.25 7.92881 20.25 8.625Z"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default ReferralsIcon;