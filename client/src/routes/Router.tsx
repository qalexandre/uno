import { Routes, Route } from 'react-router-dom'
import { Group } from '../interfaces';
import { CardTable } from '../Screens/CardTable'
import { Home } from '../Screens/Home'


export type RouterProps = {
    createGroup: (name: string) => void;
    joinGroup: (name: string, code: string) => void;
    isQueue: boolean;
    room?: Group
}

export const Router = ({createGroup, joinGroup, isQueue, room} : RouterProps) => {
    return (
        <Routes>
            <Route path='/' element={ <Home isQueue={isQueue} room={room} createGroup={createGroup} joinGroup={joinGroup} />} />
            <Route path='/cardtable' element={<CardTable />} />
        </Routes>
    )
}

