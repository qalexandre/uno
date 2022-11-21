import icon from '../assets/icon.svg'
import { Card } from '../Components/Card'
import { Join } from '../Components/Join'
import { Queue } from '../Components/Queue'

export const Home = () => {
    return (
        <div className='bg-background-pattern w-screen h-screen bg-cover bg-opacity-25 flex items-center justify-center'>
            <Card size={1} color='orange' number={3} type={'block'} />
        </div>
    )
}

