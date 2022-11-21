import { Routes, Route } from 'react-router-dom'
import { CardTable } from '../Screens/CardTable'
import { Home } from '../Screens/Home'

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cardtable' element={<CardTable />} />
        </Routes>
    )
}

