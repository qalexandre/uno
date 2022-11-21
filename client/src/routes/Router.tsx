import { Routes, Route } from 'react-router-dom'
import { Group } from '../interfaces';
import { CardTable } from '../Screens/CardTable'
import { Home } from '../Screens/Home'


export type RouterProps = {
    createGroup: (name: string) => void;
    joinGroup: (name: string, code: string) => void;
    isQueue: boolean;
    room?: Group;
    socketId: string
    leftGroup: () => void
    startGame: () => void
}

export const Router = ({createGroup, joinGroup, isQueue, room, socketId, leftGroup, startGame} : RouterProps) => {
    return (
        <Routes>
            <Route path='/' element={ <Home startGame={startGame} leftGroup={leftGroup} socketId={socketId} isQueue={isQueue} room={room} createGroup={createGroup} joinGroup={joinGroup} />} />
            <Route path='/cardtable' element={<CardTable />} />
        </Routes>
    )
}

