import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../components/textInput";
import MessagePill from "../components/messagePill";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const { socketId } = useParams();
  const navigate = useNavigate();
  console.log(socketId, users);

  // Find the user you are chatting with
  const chattingUser = users.find((u) => {
    console.log(u);
    return u.socketId === socketId;
  });
  console.log(chattingUser);
  const chattingUserName = chattingUser?.username;

  useEffect(() => {
    const handler = (data) => {
      setMessages((prev) => [...prev, { ...data, fromMe: false }]);
    };
    socket.on("private_message", handler);

    socket.on("users_list", (data) => {
      setUsers(data.filter((u) => u.socketId !== socket.id));
    });

    socket.emit("get_users_list");

    return () => {
      socket.off("private_message", handler);
    };
  }, []);

  const sendMessage = () => {
    console.log("sending");
    if (msg.trim()) {
      socket.emit("private_message", { to: socketId, message: msg });
      setMessages((prev) => [...prev, { message: msg, fromMe: true }]);
      setMsg("");
    }
  };

  console.log({ chattingUserName });

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-x-hidden">
      <div className="bg-green-400 h-24 px-6 flex justify-start items-center">
        <button onClick={() => navigate("/")}>
          <IoMdArrowRoundBack size={32} className="mr-4  cursor-pointer" />
        </button>
        <FaUserCircle size={32} />
        <h1 className="text-2xl ml-4">{chattingUserName}</h1>
      </div>

      <ul className="grow-1 w-full overflow-auto flex flex-col  justify-start ">
        {messages.map((message, i) => (
          <MessagePill
            key={`message-${i}`}
            message={message}
            chattingUserName={chattingUserName}
          />
        ))}
      </ul>
      <div className=" w-full rounded-full px-6 mb-4">
        <TextInput sendMessage={sendMessage} input={msg} setInput={setMsg} />
      </div>
    </div>
  );
};

export default Chat;
