import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { Navigate, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const userName = sessionStorage.getItem("chat_username");

  const handleLogout = () => {
    sessionStorage.removeItem("chat_username");
    navigate("/join");
  };

  useEffect(() => {
    let name = sessionStorage.getItem("chat_username");
    console.log({ name });
    if (!name) {
      console.log("refiret");
      navigate("/join");
    }

    socket.on("users_list", (data) => {
      setUsers(data.filter((u) => u.socketId !== socket.id));
    });

    socket.emit("get_users_list");

    return () => {
      socket.off("users_list");
    };
  }, [navigate]);

  console.log(users);

  return (
    <div className="w-full">
      <div className="bg-green-400 h-20 flex justify-between items-center p-6 w-full ">
        <h1 className="text-3xl font-extrabold">ChatsApp</h1>
        <div className="flex">
          <h1 className="text-xl">{userName}</h1>
          <button
            onClick={handleLogout}
            className="cursor-pointer mx-2 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <ul>
        {users.map((user) => (
          <li
            className="cursor-pointer bg-gray-600 p-4 flex justify-start items-center border-2 m-0.5"
            key={user.socketId}
            onClick={() => navigate(`/chat/${user.socketId}`)}
          >
            <FaUserCircle size={40} className="" />
            <h1 className="font-semibold ml-4 text-xl">{user.username}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
