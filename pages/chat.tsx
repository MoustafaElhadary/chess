import { authState } from "atoms/authAtom";
import useMessage from "hooks/useMessage";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

function Chat() {
  const auth = useRecoilValue(authState);
  const user = auth?.user;
  const [message, setMessage] = useState("");

  const { messages, addNewMessage } = useMessage("tsijs6w4a6");

  const onNewMessage = async () => {
    if (user?.id) {
      await addNewMessage(user.id, message,);
    }
  };

  useEffect(() => {
      console.log({messages})
  }, [messages])

  return (
    <div>
      {messages.map((m) => {
        return <div key={m.created_at}>{m.message}</div>;
      })}
      <input
        id="message"
        type="text"
        value={message || ""}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={onNewMessage}>Send</button>
    </div>
  );
}

export default Chat;
