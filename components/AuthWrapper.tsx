
import { authState } from "atoms/authAtom";
import { supabase } from "lib/dbClientSide";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const setSession = useSetRecoilState(authState);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log({ session });
      setSession(session);
    });
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
