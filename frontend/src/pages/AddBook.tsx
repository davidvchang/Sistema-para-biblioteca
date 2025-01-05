import React from 'react'

interface ToggleModal {
    closeModal: React.MouseEventHandler<HTMLButtonElement>
}



const AddBook:React.FC<ToggleModal> = ({closeModal}) => {
  return (
    <div className='w-5/12 h-fit absolute bottom-20 left-1/3 bg-white p-5 shadow-lg rounded-md'>
      <form action="" method="post" className='w-full flex flex-col gap-10'>
        <span className='font-semibold text-2xl text-center'>Agregar Libro</span>

        <div className='flex flex-col gap-5'>
            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Título</span>
                    <input type="text" placeholder='Titulo del libro' className='p-2 w-full border border-slate-100'/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Autor</span>
                    <input type="text" placeholder='Autor del libro' className='p-2 w-full border border-slate-100'/>
                </div>
            </div>

            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>ISBN</span>
                    <input type="text" placeholder='Isbn del libro' className='p-2 w-full border border-slate-100'/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Género</span>
                    <input type="text" placeholder='Género del libro' className='p-2 w-full border border-slate-100'/>
                </div>
            </div>

            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Precio</span>
                    <input type="number" min={0} placeholder='Precio del libro' className='p-2 w-full border border-slate-100'/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Cantidad</span>
                    <input type="number" min={0} placeholder='Cantidad a agregar' className='p-2 w-full border border-slate-100'/>
                </div>
            </div>
            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Fecha de publicación</span>
                    <input type="date" name="" id="" className='p-2 w-full border border-slate-100'/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Estado</span>
                    <select name="" id="" className='p-3 w-full border border-slate-100'>
                        <option value="disponible">Disponible</option>
                        <option value="disponible">No Disponible</option>
                    </select>
                </div>
            </div>

        </div>

        <div className='w-full flex justify-end gap-5'>
            <button type="button" className='w-fit h-fit px-7 py-3 rounded bg-red-500 text-white hover:bg-red-600 hover:transition-colors duration-300' onClick={closeModal}>Cancelar</button>
            <button type="submit" className='w-fit h-fit px-7 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 hover:transition-colors duration-300'>Guardar</button>
        </div>

      </form>
    </div>
  )
}

export default AddBook
