import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

console.log(backendUrl);

export const socket = io(backendUrl, { withCredentials: true });

socket.on("connect", () => {
  const name = sessionStorage.getItem("chat_username");

  if (name) {
    socket.userName = name;
    socket.emit("set_username", name);
  }
});
