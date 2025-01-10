import React, { useState } from 'react'
import SearchInput from '../components/SearchInput'
import BtnAdd from '../components/BtnAdd'
import AddUser from './AddUser'

const Users:React.FC = () => {

    const [modalAddUser, setModalAddUser] = useState<boolean>(false)

  return (
    <section className='flex flex-col gap-7 w-full py-5 px-10'>
        <SearchInput/>

        <span className='text-2xl font-semibold'>Usuarios</span>

        <div className='flex justify-between'>
            <span className='text-xl font-semibold'>Todos los usuarios</span>
            <BtnAdd text='Agregar usuario' onClick={() => setModalAddUser(true)}/>
        </div>

        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-100 rounded-lg">
                    <thead className="border-b">
                        <tr>
                        <th className="p-4 text-center">Nombre</th>
                        <th className="p-4 text-center">Apellidos</th>
                        <th className="p-4 text-center">Correo</th>
                        <th className="p-4 text-center">Libros prestados</th>
                        <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-3 text-center">Juan</td>
                            <td className="p-3 text-center">Sanchez</td>
                            <td className="p-3 text-center">jsanchez@gmail.com</td>
                            <td className="p-3 text-center">2</td>
                            <td className="p-3 text-center w-fit">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:transition-colors duration-300" >
                                Editar
                                </button>
                                <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:transition-colors duration-300" >
                                Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {modalAddUser && (
            <>
                {/* PONER BORROSO EL FONDO */}
                <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-10"></div>

                <div className="fixed inset-0 z-20 flex items-center justify-center">
                    <AddUser closeModal={() => setModalAddUser(false)} />
                </div>
            
            </>
        )}
      
    </section>
  )
}

export default Users
