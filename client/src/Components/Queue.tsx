import icon from '../assets/icon.svg'

export const Queue = () => {
    return (
        <div className='flex flex-col items-center bg-black-800 w-w-login h-h-login'>
                <img className='w-24 mt-4' src={icon} alt="" />
                <p className='text-white text-[1.5rem] mt-2'>Esperando... (0/8)</p>
                <div className='mt-9 ml-9 text-start self-start text-white'>
                    <p>Alexandre</p>
                    <p>Eduardo</p>
                    <p>Rafael</p>
                </div>
                <button className='bg-blue-700 w-40 h-16 rounded-xl text-xl text-white absolute bottom-20 font-inter font-bold'>Iniciar</button>
            </div>
    )
}