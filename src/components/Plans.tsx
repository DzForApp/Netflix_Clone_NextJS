import Head from "next/head";
import Header from "./Header";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
function Plans() {
  const { logout } = useAuth();

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div>
          <Link href="/">
            <img
              src="https://rb.gy/g1pwyx"
              alt=""
              className="cursor-pointer rounded-lg bg-white x-4 h-4"
            />
          </Link>
        </div>
        <button className="" onClick={logout}>
          SingOut
        </button>
      </header>

      <main>
        <h1></h1>
      </main>
    </div>
  );
}

export default Plans;
