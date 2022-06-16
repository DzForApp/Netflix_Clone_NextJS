import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div
      className="relative h-screen bg-gradient-to-b from-gray-900/10
    to-[#010511]"
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex w-full  bg-red-600 flex-col items-cener justify-center px-20 text-center">
        <section></section>
      </main>
    </div>
  );
};

export default Home;
