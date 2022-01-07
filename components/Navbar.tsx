import { Menu, Transition } from "@headlessui/react";
import { authState } from "atoms/authAtom";
import { getProfile } from "hooks/useAuth";
import { classNames } from "lib/helpers";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function Navbar() {
  const auth = useRecoilValue(authState);
  const user = auth?.user;

  useEffect(() => {
    getProfile(auth);
  }, [auth]);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-20 w-auto"
                src="/assets/logo.png"
                alt=""
              />
              <img
                className="hidden lg:block h-20 w-auto"
                src="/assets/logo.png"
                alt=""
              />
            </div>
          </div>
          <div className="flex items-center">
            {!user && (
              <div className="flex-shrink-0">
                <>
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 mr-4"
                  >
                    <span>Sign up</span>
                  </button>
                </>
                <>
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <span>Sign in</span>
                  </button>
                </>
              </div>
            )}
            {user && (
              <div className=" ml-4 flex-shrink-0 flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className=" flex text-sm rounded-full focus:outline-none ">
                      <span className="sr-only">Open user menu</span>
                      <span className="my-auto mr-2 text-center text-black">
                        {/* {user.name} */}
                      </span>
                      {/* <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      /> */}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/profile">
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href=""
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={() => {}}
                          >
                            Sign Out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
