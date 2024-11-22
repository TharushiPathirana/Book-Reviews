import Img from "../assets/book.jpg";
export function ImageCard() {
  return (
    <div className="relative bg-white border  border-gray-200 m-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 inline-block">
      <img
        className="h-2/3 object-contain rounded-lg"
        src={Img}
        alt="Card Top"
      />
    </div>
  );
}
