import express from "express";
import cors from "cors";
import socket from "socket.io";
import http from "http";
import { makeid } from "./functions";
import { Group } from "./interfaces";

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors({ origin: "*" }));

const rooms: Group[] = [];

io.on("connection", (socket) => {
  socket.on("create", (name) => {
    const code = makeid(6);
    const room: Group = {
      code,
      players: [
        {
          name,
        },
      ],
    };
    rooms.push(room);
    console.log(rooms[0])
  });

  socket.on("join", (name, room) => {
    const indexRoom = rooms.findIndex(r => r.code == room)
    rooms[indexRoom].players.push({name})
    console.log(rooms[0])
  });
});

server.listen(3333, () => console.log("Server running"));
