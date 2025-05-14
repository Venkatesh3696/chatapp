import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { corsOptions } from "./config/corsOptions.js";
import { handleSocketConnection } from "./socketHandler/index.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, { cors: corsOptions });

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));

io.on("connection", (socket) => {
  handleSocketConnection(io, socket);
});

app.get("/", (req, res) => {
  res.json("hi from express server");
});

const PORT = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log(`Server is listening at port ${PORT} `);
});
