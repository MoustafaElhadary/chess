import AuthLayout from "components/Layout/AuthLayout";
import { dbClientSide } from "lib/dbClientSide";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { user, session } = await dbClientSide.auth.signUp({
      email,
      password,
    });

    let { error } = await dbClientSide.from("profiles").upsert(
      { id: user?.id, name },
      {
        returning: "minimal", // Don't return the value after inserting
      }
    );

    console.log({ user, session, error });
  };


  return (
    <AuthLayout>
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        Create new account
      </h2>

      <div className="mt-8">
        <div className="mt-6">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="nme"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="nme"
                  name="nme"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm right">
                <a href="#" className="font-medium text-black hover:text-black">
                  Sign in instead?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                onClick={(e) => handleSignUp(e)}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
