import { dbClientSide } from "lib/dbClientSide";
import { useEffect, useState } from "react";
import { definitions } from "types/supabase";

const useMessage = (slug:string) => {
  const [messages, setMessages] = useState<definitions["chat"][]>([]);
  useEffect(() => {
    dbClientSide
      .from(`chat:game_slug=eq.${slug}`)
      .on("INSERT", handleInsert)
      .subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);


  const handleInsert = (payload: { new: definitions["chat"] }) => {
    setMessages([...messages, payload.new]);
  };

  const addNewMessage = async (user_id: string, message: string) => {
    const { data, error } = await dbClientSide
      .from<definitions["chat"]>("chat")
      .insert({ sender_id:user_id, message, game_slug:slug  });
      console.log({user_id,data, error});
    return { data, error };
  };

  return {
    messages,
    addNewMessage,
  };
};

export default useMessage;
