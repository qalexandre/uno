import express, { json } from "express";
import cors from "cors";
import socket from "socket.io";
import http from "http";
import bp from "body-parser";
import { makeid } from "./functions";
import { Group, Player } from "./interfaces";

const app = express();
const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const rooms: Group[] = [];

app.post("/create", (req, res) => {
  console.log(req.body);
 
  const code = makeid(6);
  const room: Group = {
    code,
    players: []
  };
  console.log(room);
  rooms.push(room);
  res.status(201).send(room);
});

io.on("connection", (socket) => {
  socket.emit('connected', socket.id)
  socket.on('join', (name, code) => {
    const room = rooms.findIndex(r => r.code == code)
    const hasPlayer = rooms[room].players?.find(p => p.name == name)
    if(hasPlayer) return socket.emit('error-name')
    const player:Player = {
      id: socket.id,
      name: name
    }
    rooms[room].players?.push(player)
    socket.join(code);
    socket.to(code).emit('update-queue', rooms[room])
    socket.emit('joined', rooms[room])
    console.log(player)
    console.log(rooms[room])
  })
});



server.listen(3333, () => console.log("Server running"));
