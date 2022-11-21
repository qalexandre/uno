import { createContext, ReactNode, useContext, useState } from "react"
import { Group } from "../interfaces"

type RoomContextData = {
room: Group;
setRoom: (room: Group) => void;
}

type RoomProviderProps = {
    children: ReactNode
}

export const RoomContext = createContext({} as RoomContextData)

function RoomProvider({children} : RoomProviderProps) {
    const [room, setRoom] = useState({} as Group)

    return(
        <RoomContext.Provider value={{room, setRoom}}>
            {children}
        </RoomContext.Provider>
    )
}

function useRoom() {
    const context = useContext(RoomContext)
    return context
}

export {RoomProvider, useRoom}