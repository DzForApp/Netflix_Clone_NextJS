import Image from "next/image";
import { useRecoilState } from "recoil";
import { Movie } from "../../typigns";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative h-32 min-w-[185px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] 
    md:hover:scale-105  "
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
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
