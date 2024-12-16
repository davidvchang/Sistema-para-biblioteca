import React from 'react'
import { Switch } from 'antd';

const Settings:React.FC = () => {

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

  return (
    <section className='flex flex-col gap-7 w-full py-5 px-10'>
        <span className='text-2xl font-semibold'>Configuración</span>

        <span className='text-xl font-semibold'>General</span>


        <div className='flex gap-28'>
            {/* CONTAINER SECTION LEFT */}
            <div className='pl-5 flex flex-col gap-5'>
                <div className='flex flex-col'>
                    <span className='font-semibold'>Nombre de la libreria</span>
                    {/* <input type="text" className='px-3 py-1 w-60' value='Biblioteca'/> */}
                    <span className='pl-3'>Biblioteca</span>
                </div>

                <div>
                    <span className='font-semibold'>Logo</span>
                    <div className='flex flex-col gap-2'>
                        <div className='w-32 h-32  border border-slate-300'></div>
                        
                        <div className='flex gap-1'>
                            <input type="text" disabled className=' border border-slate-300 w-64'/>
                            <button className='border border-slate-300 py-1 px-2 text-sm'>Seleccionar</button>
                        </div>

                    </div>
                </div>
            </div>

            {/* CONTAINER SECTION RIGHT */}
            <div className='flex flex-col gap-5'>
                <div className='flex flex-col'>
                    <span className='font-semibold'>Correo</span>
                    {/* <input type="email" className='px-3 py-1 w-60' value='biblioteca@gmail.com'/> */}
                    <span className='pl-3'>biblioteca@gmail.com</span>
                </div>

                <div className='flex flex-col'>
                    <span className='font-semibold'>Usuario</span>
                    {/* <input type="text" className='px-3 py-1 w-60' value='Admin'/> */}
                    <span className='pl-3'>Admin</span>
                </div>

                <div className='flex flex-col'>
                    <span className='font-semibold'>Contraseña</span>
                    {/* <input type="password" className='px-3 py-1 w-60' value='Admin'/> */}
                    <span className='pl-3'>*******</span>
                </div>

                <div className='flex gap-2 justify-center items-center pt-5'>
                    <Switch defaultChecked={false} onChange={onChange} />
                    <span>Activar notificaciones de email</span>

                </div>

            </div>
        </div>

        <div className='pl-5 pt-16'>
                <button className='bg-bg-negro px-3 py-2 w-fit text-slate-200 font-medium rounded hover:bg-gray-600 hover:transition-colors duration-300'>Guardar Cambios</button>
        </div>

      
    </section>
  )
}

export default Settings
