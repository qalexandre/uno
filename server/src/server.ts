import express, { json } from "express";
import cors from "cors";
import socket, { Socket } from "socket.io";
import http from "http";
import bp from "body-parser";
import { generateCards, makeid, nextTurn, verifyPower } from "./functions";
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
    players: [],
    directionGame: 'right',
    playersList: []
  };
  console.log(room);
  rooms.push(room);
  res.status(201).send(room);
});

io.on("connection", (socket) => {
  socket.emit("connected", socket.id);
  console.log(socket.id)
  socket.on("join", (name, code) => {
    console.log(name)
    let isOwner = false;
    const room = rooms.findIndex((r) => r.code == code);
    if (room < 0) return socket.emit("error", "Grupo não existente");
    const hasPlayer = rooms[room].players?.find((p) => p.name == name);
    if (hasPlayer) return socket.emit("error", "Nome inválido");
    if (rooms[room].players?.length! < 1) isOwner = true;
    const player: Player = {
      id: socket.id,
      name: name,
      isOwner,
    };
    rooms[room].players?.push(player);
    rooms[room].playersList?.push(player.name);
    rooms[room].playerTurn = name;
    socket.join(code);
    socket.to(code).emit("updateQueue", rooms[room]);
    socket.emit("joined", rooms[room]);
    console.log(player);
    console.log(rooms[room]);
  });

  socket.on('startGame', (room: Group) => {
    const game = generateCards(room)
    socket.to(room.code).emit('startedGame', game);
    socket.emit('startedGame', game);
  })

  socket.on("left", (code) => {
    socket.leave(code);
    const index = rooms.findIndex((r) => r.code == code);
    const player = rooms[index].players?.find((p) => p.id == socket.id);
    rooms[index].players?.splice(
      rooms[index].players?.findIndex((p) => p.id == socket.id)!,
      1
    );
    if (rooms[index].players?.length == 0) rooms.splice(index, 1);
    else {
      if (player?.isOwner) rooms[index].players![0].isOwner = true;
    }
    socket.to(code).emit("updateQueue", rooms[index]);
  });

  socket.on("disconnect", () => {
    let roomLeft = {} as Group;
    rooms.map((room, index) => {
      const player = room.players?.findIndex((p) => p.id == socket.id)!;

      if (player > -1) {
        if (room.players?.length == 1) {
          rooms.splice(index, 1);
        } else {
          rooms[index].players?.splice(player, 1);

          roomLeft = room;
        }
      }
    });
    socket.to(roomLeft.code).emit("update-queue", roomLeft);
  });

  socket.on("playCard", (card: string, room: Group, color?: string) => {
    room.lastCard = card
    const player = room.players?.findIndex(p => p.id == socket.id)
    const cardIndex =  room.players![player!].cards?.findIndex(c => c == card)
    room.players![player!].cards?.splice(cardIndex!, 1)
 
    room = verifyPower(card, room, color)
    socket.to(room.code).emit("updateCards", room)
    socket.emit("updateCards", room)
  })

  socket.on('skipTurn', (room) => {
    room = nextTurn(room);
    socket.to(room.code).emit("skipedTurn", room)
    socket.emit("skipedTurn", room)
  })

});

server.listen(3333, () => console.log("Server running"));
