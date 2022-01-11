import { dbClientSide } from "lib/dbClientSide";
import { useEffect, useState } from "react";
import { definitions } from "types/supabase";

const useMessage = (slug: string) => {
  const [messages, setMessages] = useState<definitions["chat"][]>([]);
  useEffect(() => {
    console.log({slug})
    dbClientSide
      .from(`chat:game_slug=eq.${slug}`)
      .on("INSERT", handleInsert)
      .subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleInsert = (payload: { new: definitions["chat"] }) => {
    console.log({ new: payload.new, messages });
    const ids = messages.map((m) => m.id);
    if (payload.new && !ids.includes(payload.new.id)) {
      setMessages([...messages, payload.new]);
    }
  };

  const addNewMessage = async (user_id: string, message: string) => {
    console.log({message})
    await dbClientSide
      .from<definitions["chat"]>("chat")
      .insert({ sender_id: user_id, message, game_slug: slug });
  };

  return {
    messages,
    addNewMessage,
  };
};

export default useMessage;
