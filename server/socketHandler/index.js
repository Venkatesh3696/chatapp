export const handleSocketConnection = (io, socket) => {
  console.log(`client connected! `);

  socket.on("set username", (userName) => {
    socket.userName = userName;
    console.log(`${socket.userName} joined chat`);
  });

  socket.on("chat message", (msg) => {
    console.log("message received ", msg);
    io.emit("chat message", { id: socket.id, ...msg });
  });

  socket.on("disconnect", () => {
    console.log("client disconnected ");
  });
};
