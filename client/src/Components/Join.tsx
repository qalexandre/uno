import icon from '../assets/icon.svg'


export const Join = () => {
    return (
        <div className='flex flex-col items-center bg-black-900 w-w-login h-h-login'>
                <img className='w-24 mt-4' src={icon} alt="" />
                <input className='w-[18rem] h-[2.6rem] text-white bg-blue-800 placeholder:text-center text-center mb-[3rem] mt-8' type="text" placeholder='Nome'/>
                <input className='w-[18rem] h-[2.6rem] text-white bg-blue-800 text-center appearance-none' maxLength={6} type="text"  placeholder='Inserir o código da partida'/>

                <div className='flex items-center justify-between mt-[5.5rem]'>
                    <div className='h-1 w-[9rem] bg-orange-600 font-normal'></div>
                    <span className='text-white text-center w-[4rem] text-4xl mx-'>ou</span>
                    <div className='h-1 w-[9rem] bg-orange-600'></div>
                </div>
                <button className='bg-blue-700 w-40 h-16 rounded-xl text-xl text-white absolute bottom-20'>Criar partida</button>
            </div>
    )
}