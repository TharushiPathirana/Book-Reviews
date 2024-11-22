import React, { useState } from "react";
import { TopNavbar } from "../components/TopNavbar2";
import { ImageCard } from "../components/ImageCard";
import { RatingBox } from "../components/RatingBox";
import { SearchBar } from "../components/SearchBar";
import SortBy from "../components/SortBy";
import { Comment } from "../components/Comment";

const BookView: React.FC = () => {
  const starCountOptions = [
    "5 Star Reviews",
    "4 Star Reviews",
    "3 Star Reviews",
    "2 Star Reviews",
    "1 Star Reviews",
  ];
  const timeOptions = ["Newest First", "Oldest First"];
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <TopNavbar />

      <div className="grid grid-cols-3 h-[90vh] ">
        <div className="col-span-1 flex flex-col justify-start items-center h-auto mt-8">
          <div className="w-2/3">
            <ImageCard />
          </div>

          <div className="h-1/3 w-full flex flex-col gap-4 items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-2/5">
              Add Review
            </button>
          </div>
        </div>

        <div className="col-span-2 bg-[rgba(59,131,246,0.05)] p-16">
          <p className="text-gray-900 text-xl font-bold mb-2">Steve Jobe</p>
          <p className="text-gray-600 text-md italic">by Walter Isaacson</p>

          <RatingBox />

          <div className="flex flex-wrap justify-between items-center mt-4">
            <div className="flex-grow">
              <SearchBar />
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Sort by:
                </span>
                <SortBy
                  defaultTitle="Time"
                  options={timeOptions}
                  onSelect={handleSelectOption}
                />
              </div>
              <div className="flex items-center">
                <SortBy
                  defaultTitle="Star Reviews"
                  options={starCountOptions}
                  onSelect={handleSelectOption}
                />
              </div>
            </div>
          </div>

          <Comment />
        </div>
      </div>
    </>
  );
};

export default BookView;
