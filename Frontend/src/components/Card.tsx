import { useState } from "react";
import { Review } from "./Review";
import Img from "../assets/book.jpg";
import { Rating } from "./rating";
import { useNavigate } from "react-router-dom";

export function Card() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative max-w-[14rem] m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg w-full object-contain"
          src={Img}
          alt="Card Top"
        />
      </a>
      <div
        className="flex flex-col p-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col flex-grow">
          <a href="#">
            <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Steve Jobs
            </h5>
          </a>
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
            <Rating />
          </p>
        </div>

        {isHovered && (
          <div
            className="absolute top-0 left-0 z-40 p-2 overflow-y-auto bg-white w-full dark:bg-gray-800 duration-300"
            style={{ height: "calc(100% - 4rem)" }}
          >
            <Review />
            <Review />
            <Review />
          </div>
        )}

        <div className="h-10 flex items-center">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => navigate(`/book/view`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}
