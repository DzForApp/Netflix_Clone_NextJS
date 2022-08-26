import {
  SearchIcon,
  SearchCircleIcon,
  LinkIcon,
  BellIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useAuth(); //to use our customized hook

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-red-500"}`}>
      <div className="flex space-x-2 md:space-x-10 items-center ">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={30}
          className="object-contain cursor-pointer"
        />
        <ul className="hidden md:flex  space-x-4  ">
          <li className="headerLink">Home </li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movis</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex space-x-2">
        <SearchIcon className="hidden w-6 h-6 sm:inline" />
        <BellIcon className="w-6 h-6" />
        <p className="hidden lg:inline">Kids</p>

        {/* <Link href="/account"> */}
        <img
          onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded-lg bg-white x-4 h-4"
        />
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;
