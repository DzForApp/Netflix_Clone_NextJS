import Image from "next/image";
import { Movie } from "../../typigns";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    <div
      className="relative h-32 min-w-[185px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] 
    md:hover:scale-105  "
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded w-6 h-6"
        layout="fill"
      />
    </div>
  );
}

export default Thumbnail;
