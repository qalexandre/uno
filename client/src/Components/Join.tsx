import { useEffect, useState } from 'react'
import icon from '../assets/icon.svg'

export type JoinProps = {
    createGroup: (name: string) => void;
    joinGroup: (name: string, code: string) => void;
}

export const Join = ({createGroup, joinGroup}: JoinProps) => {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')


    return (
        <div className='relative flex flex-col items-center bg-black-800 w-w-login h-h-login'>
                <img className='w-24 mt-4' src={icon} alt="" />
                <input minLength={3} onChange={(e) => setName(e.target.value)} className='w-[18rem] h-[2.6rem] text-white bg-blue-800 placeholder:text-center text-center mb-[3rem] mt-8' type="text" placeholder='Nome'/>
                <input onChange={(e) => setCode(e.target.value)} className='w-[18rem] h-[2.6rem] text-white bg-blue-800 text-center appearance-none' maxLength={6} type="text"  placeholder='Inserir o código da partida'/>
                <button disabled={code.length != 6 || name.length < 3} onClick={() => joinGroup(name, code)} className='bg-green-600 disabled:grayscale w-28 h-10 rounded-xl text-xl text-white mt-8 '>Entrar</button>
                <div className='flex items-center justify-between mt-[3.5rem]'>
                    <div className='h-1 w-[9rem] bg-orange-600 font-normal'></div>
                    <span className='text-white text-center w-[4rem] text-4xl mx-'>ou</span>
                    <div className='h-1 w-[9rem] bg-orange-600'></div>
                </div>
                <button disabled={name.length < 3} onClick={() => createGroup(name)} className='bg-blue-700 disabled:grayscale w-40 h-16 rounded-xl text-xl text-white absolute bottom-8'>Criar partida</button>
            </div>
    )
}