import { Session } from "@supabase/supabase-js";
import { atom } from "recoil";

export const authState = atom({
  key: "authState", // unique ID (with respect to other atoms/selectors)
  default: null as Session | null, // default value (aka initial value)
});
