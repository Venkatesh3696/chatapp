import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", { withCredentials: true });

socket.on("connect", () => {
  const name = sessionStorage.getItem("chat_username");

  if (name) {
    socket.userName = name;
    socket.emit("set_username", name);
  }
});
