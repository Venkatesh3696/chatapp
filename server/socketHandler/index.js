const users = {};
export const handleSocketConnection = (io, socket) => {
  console.log(`client connected! `);

  //   socket.onAny((event, ...args) => {
  //     console.log("Received event:", event, args);
  //   });

  socket.on("set_username", (username) => {
    console.log(`User ${username} has set their username`);
    users[socket.id] = { username };
    io.emit("users_list", mapUsers(users));
  });

  socket.on("get_users_list", () => {
    socket.emit("users_list", mapUsers(users));
  });

  socket.on("private_message", ({ to, message }) => {
    console.log("message received ", message);
    socket.to(to).emit("private_message", {
      from: socket.id,
      message,
    });
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", { id: socket.id, ...msg });
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected!`);
    delete users[socket.id];
    io.emit("users_list", mapUsers(users));
  });

  function mapUsers(users) {
    return Object.entries(users).map(([id, data]) => ({
      socketId: id,
      ...data,
    }));
  }
};
