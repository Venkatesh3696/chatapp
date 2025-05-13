import { useEffect, useState } from "react";
import TextInput from "../components/textInput";
import MessagePill from "../components/messagePill";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUsername] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("chat message", { text: input, userName });
      setInput("");
    }
  };

  useEffect(() => {
    if (!socket.userName) {
      const userName = prompt("Enter your username:");
      socket.userName = userName;
      setUsername(userName);
      socket.emit("set username", userName);
    }

    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  console.log(messages);

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="bg-green-300 p-4">
        <h1>{userName}</h1>
      </div>

      <ul className="grow-1 w-full overflow-scroll flex flex-col bg-amber-800 justify-start ">
        {messages.map((message, i) => {
          return (
            <MessagePill
              key={`message-${i}`}
              message={message}
              currentUser={userName}
            />
          );
        })}
      </ul>
      <div className="bg-blue-400 h-14 rounded-full">
        <TextInput
          sendMessage={sendMessage}
          input={input}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

export default Messages;
