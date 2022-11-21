import { Routes, Route } from 'react-router-dom'
import { CardTable } from '../Screens/CardTable'
import { Home } from '../Screens/Home'


export type RouterProps = {
    createGroup: (name: string) => void;
    joinGroup: (name: string, code: string) => void;
}

export const Router = ({createGroup, joinGroup} : RouterProps) => {
    return (
        <Routes>
            <Route path='/' element={ <Home createGroup={createGroup} joinGroup={joinGroup} />} />
            <Route path='/cardtable' element={<CardTable />} />
        </Routes>
    )
}

