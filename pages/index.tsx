import Layout from "components/Layout/Layout";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="text-5xl font-extrabold text-black">Ready to lose?</div>
        <div className="mt-6 ">
          <Link href="/local">
            <a className="inline-flex items-center px-12 py-6 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#B9CA42] mr-8">
              Play local
            </a>
          </Link>
          <Link href="/online">
            <a className="inline-flex items-center px-12 py-6 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#769656]">
              Play online
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
