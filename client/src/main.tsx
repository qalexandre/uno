import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IoProvider } from "socket.io-react-hook";
import "./styles/global.css";
import { RoomProvider } from "./hooks/room";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IoProvider>
      <RoomProvider>
        <App />
      </RoomProvider>
    </IoProvider>
  </React.StrictMode>
);
