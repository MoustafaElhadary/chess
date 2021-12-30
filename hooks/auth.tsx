import { Session } from "@supabase/supabase-js";
import { authState } from "atoms/authAtom";
import { dbClientSide } from "lib/dbClientSide";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { User } from "types";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const setSession = useSetRecoilState(authState);

  useEffect(() => {
    setSession(dbClientSide.auth.session());

    dbClientSide.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      const user = await getProfile(session);
      console.log({ session, user });

    });
  }, []);

  async function getProfile(session: Session | null) {
    try {
      const user = session?.user;

      if (!user) {
        return null;
      }

      let { data, error, status } = await dbClientSide
        .from<User>("profiles")
        .select(`name`)
        .eq("id", user?.id!)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      console.log({ data });

      if (data) {
        return data;
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return <> {children}</>;
};
