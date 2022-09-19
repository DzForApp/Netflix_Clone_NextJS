import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from "@heroicons/react/solid";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Movie } from "../../typigns";
import { modalState, movieState } from "../atoms/modalAtom";
import { Element, Genre } from "../../typigns";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { generateKeySync } from "crypto";

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);

  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const handlClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }
    fetchMovie();
  }, [movie]);
  console.log(trailer);

  return (
    <MuiModal
      open={showModal}
      onClose={handlClose}
      className="fixed !top-7 left-0 right-0 z-0 mx-auto w-full max-w-5xl
      overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handlClose}
          className="modalButton absolute right-5 top-5 border-none !z-40 w-9 h-9
           bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="w-6 h-6" />
        </button>
        <div className="relative  pt-8  h-[65%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div
            className="absolute bottom-10 flex  justify-between w-full items-center 
          px-10 "
          >
            <div className="flex space-x-2  items-center">
              <button
                className="flex items-center gap-x-2 rounded py-1 bg-white px-6 text-xl
              font-bold text-black transition hover:bg-[#e6e6e6]"
              >
                <FaPlay className=" h-7 w-7  text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="w-7 h-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="w-7 h-7" />
              </button>
            </div>
            <button
              className="modalButton right-2"
              onClick={() => setMuted(!muted)}
            >
              {muted ? (
                <VolumeOffIcon className="w-6 h-6" />
              ) : (
                <VolumeUpIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16  rounded-b-mb bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light ">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div
                className="flex h-4 items-center justify-center rounded border
              border-white/40 px-1.5 text-xs "
              >
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-showmodal">
                <div>
                  <span className="text-[gray]">Genres : </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original Lunguage: </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Totals votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default Modal;
