import { authState } from "atoms/authAtom";
import Layout from "components/Layout/Layout";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from 'next/router'


const Home: NextPage = () => {
  const auth = useRecoilValue(authState);
  const user = auth?.user;
  const router = useRouter()


  const createGame = async () => {
    const res = await fetch("/api/game/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user?.id,
      }),
    });
    const data = await res.json();
    console.log({ data, user: user, status: res.status });
    return data;
  };

  const handleOnlineClick = async () => {
    if (user){
      const {slug} = await createGame();
      router.push(`/online/${slug}`);
    }else{
      router.push('/signin');
    }

  }

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

          <button onClick={()=> handleOnlineClick()} className="inline-flex items-center px-12 py-6 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#769656]">
            Play online
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
