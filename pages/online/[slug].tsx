import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { authState } from "atoms/authAtom";
import Board from "components/Board";
import useChessGame from "hooks/useChessGame";
import useMessage from "hooks/useMessage";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const OnlinePage: NextPage = () => {
  const auth = useRecoilValue(authState);
  const user = auth?.user;
  const router = useRouter();
  const { slug }: { slug?: string } = router.query;

  const { game } = useChessGame(slug!);

  const [message, setMessage] = useState("");

  const { messages, addNewMessage } = useMessage(slug!);

  const onNewMessage = async () => {
    if (user?.id) {
      await addNewMessage(user.id, message);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <main className="py-10">
          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2 flex-col">
              <Board
                isBlack={user?.id === game?.player2_id}
                isOnline
                slug={slug as string}
              />
              {game && slug && !game.player2 && game.player1_id !== user?.id && (
                <button
                  type="button"
                  className="items-center m-auto px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={async () => {
                    await fetch("/api/game/join", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        access_token: auth?.access_token,
                        slug,
                      }),
                    });
                  }}
                >
                  Join Game
                </button>
              )}
            </div>

            <section className="lg:col-start-3 lg:col-span-1">
              <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                <div className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="notes-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Chat
                    </h2>
                  </div>
                  <div className="px-4 py-6 sm:px-6 overflow-auto h-96">
                    <ul role="list" className="space-y-8">
                      {messages.map((message) => (
                        <li key={message.id}>
                          <div className="flex space-x-3">
                            {/* <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                alt=""
                              />
                            </div> */}
                            <div>
                              <div className="text-sm">
                                <a
                                  href="#"
                                  className="font-medium text-gray-900"
                                >
                                  {message.sender_id}
                                </a>
                              </div>
                              <div className="mt-1 text-sm text-gray-700">
                                <p>{message.message}</p>
                              </div>
                              <div className="mt-2 text-sm space-x-2">
                                <span className="text-gray-500 font-medium">
                                  {message.created_at}
                                </span>
                                <span className="text-gray-500 font-medium">
                                  &middot;
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                  <div className="flex space-x-3">
                    <div className="min-w-0 flex-1">
                      <form action="#">
                        <div>
                          <input
                            name="message"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                            placeholder="Say something..."
                            id="message"
                            value={message || ""}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <button
                        type="submit"
                        onClick={onNewMessage}
                        className=" px-4 py-2 border border-transparent text-sm font-medium shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full align-middle "
                      >
                        <PaperAirplaneIcon
                          className="flex-shrink-0 h-5 w-5 group-hover:text-gray-500 rotate-90 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default OnlinePage;
