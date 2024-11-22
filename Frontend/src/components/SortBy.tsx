import React, { useEffect, useState, useRef } from "react";

interface SortByDropdownProps {
  defaultTitle: string;
  options: string[];
  onSelect: (option: string) => void;
}

const SortBy: React.FC<SortByDropdownProps> = ({
  defaultTitle,
  options,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(defaultTitle);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdownButton"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {selectedOption}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 25 25"
          fill="currentColor"
          width="16"
          height="16"
          aria-hidden="true"
        >
          {defaultTitle === "Time" && (
            <path
              d="M6.293 4.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L8 7.414V19a1 1 0 1 1-2 0V7.414L3.707 9.707a1 1 0 0 1-1.414-1.414l4-4zM16 16.586V5a1 1 0 1 1 2 0v11.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L16 16.586z"
              fill="#0D0D0D"
            />
          )}
          {(defaultTitle === "Star Reviews" ||
            defaultTitle === "Discount" ||
            defaultTitle === "Status") && (
            <>
              <path
                d="M2 4.17391C2 3.52558 2.49746 3 3.11111 3H20.8889C21.5025 3 22 3.52558 22 4.17391C22 4.82225 21.5025 5.34783 20.8889 5.34783L3.11111 5.34783C2.49746 5.34783 2 4.82225 2 4.17391Z"
                fill="#363853"
              />
              <path
                d="M4.96296 12C4.96296 11.3517 5.46042 10.8261 6.07407 10.8261H17.9259C18.5396 10.8261 19.037 11.3517 19.037 12C19.037 12.6483 18.5396 13.1739 17.9259 13.1739H6.07407C5.46042 13.1739 4.96296 12.6483 4.96296 12Z"
                fill="#363853"
              />
              <path
                d="M9.03704 18.6522C8.42339 18.6522 7.92593 19.1778 7.92593 19.8261C7.92593 20.4744 8.42339 21 9.03704 21H14.963C15.5766 21 16.0741 20.4744 16.0741 19.8261C16.0741 19.1778 15.5766 18.6522 14.963 18.6522H9.03704Z"
                fill="#363853"
              />
            </>
          )}
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownMenu"
          className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {options.map((option, index) => (
              <a
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleOptionClick(option);
                }}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              >
                {option.startsWith("Star Reviews") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block -mt-1 mr-1"
                    viewBox="0 0 25 25"
                    fill="currentColor"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a9 9 0 018.66 7.12.75.75 0 11-1.46.36A7.5 7.5 0 1017.5 10v-.28a.75.75 0 011.5 0v2.22a.75.75 0 01-.75.75h-4.78a.75.75 0 010-1.5h3.56A8.96 8.96 0 0110 1zm-.25 7.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {option.startsWith("Time") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block -mt-1 mr-1"
                    viewBox="0 0 25 25"
                    fill="currentColor"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.293 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 12.586V5a1 1 0 012 0v7.586l3.293-3.293a1 1 0 111.414 1.414l-5 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortBy;
