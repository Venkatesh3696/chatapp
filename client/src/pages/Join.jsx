import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";

const Join = ({ onJoin }) => {
  const [name, setName] = useState("");
  const [joining, setJoining] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!joining) return;

    const handleUsersList = (data) => {
      console.log("Users list received:", data);
      socket.off("users_list", handleUsersList);
      navigate("/");
    };
    socket.on("users_list", handleUsersList);

    return () => {
      socket.off("users_list", handleUsersList);
    };
  }, [joining, navigate]);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    sessionStorage.setItem("chat_username", name);
    if (onJoin) onJoin(name);
    setJoining(true);
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
