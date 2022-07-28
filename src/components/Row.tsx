import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { Movie } from "../../typigns";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-auto space-y-0.5 md:space-y-2 mt-6">
      <h2 className="w-64 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2 ">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto opacity-0 cursor-pointer 
          w-12 h-12 transition hover:scale-125 group-hover:opacity-100
           ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide  md:space-x-2.5 md:p-2"
        >
          {/** Thumbnail */}
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-6 z-40 m-auto opacity-0 cursor-pointer 
         w-12 h-12 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
