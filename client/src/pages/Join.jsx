import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";

const Join = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleUsersList = () => {
      socket.off("users_list", handleUsersList);
      navigate("/");
    };
    socket.on("users_list", handleUsersList);

    return () => {
      socket.off("users_list", handleUsersList);
    };
  }, [navigate]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    sessionStorage.setItem("chat_username", name);
    socket.emit("set_username", name);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white">
      <h1 className="mb-4">Enter your name to start chatting</h1>
      <form onSubmit={handleJoin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default Join;
