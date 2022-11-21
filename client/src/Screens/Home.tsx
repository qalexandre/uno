import icon from '../assets/icon.svg'
import { Card } from '../Components/Card'
import { Join } from '../Components/Join'

export type HomeProps = {
    createGroup: (name: string) => void;
    joinGroup: (name: string, code: string) => void;
}

export const Home = ({createGroup, joinGroup} : HomeProps) => {
    return (
        <div className='bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 flex items-center justify-center'>
           <Join createGroup={createGroup} joinGroup={joinGroup} />
        </div>
    )
}

