import icon from '../assets/icon.svg'
import { Group } from '../interfaces'

type QueueProps = {
    room: Group
}

export const Queue = ({room}: QueueProps) => {
    return (
        <div className='flex flex-col items-center bg-black-800 w-w-login h-h-login'>
                <img className='w-24 mt-4' src={icon} alt="" />
                <p className='text-white text-[1.5rem] mt-2'>Esperando... ({room.players?.length}/8)</p>
                <div className='mt-9 ml-9 text-start self-start text-white'>
                    {room.players?.map(p => (
                    <p>{p.name}</p>
                    ))}
                </div>
                <button className='bg-blue-700 w-40 h-16 rounded-xl text-xl text-white absolute bottom-20 font-inter font-bold'>Iniciar</button>
            </div>
    )
}