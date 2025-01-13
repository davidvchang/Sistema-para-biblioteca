import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import BtnAdd from '../components/BtnAdd'
import AddUser from './AddUser'
import axios from 'axios'
import Swal from 'sweetalert2'

interface ValuesAPI {
    id_usuario: number,
    nombre: string,
    apellidos: string,
    email: string,
    telefono: string,
    libros_prestados: number
}

const Users:React.FC = () => {

    const urlAPI:string = import.meta.env.VITE_URL_API_USERS as string

    const [modalAddUser, setModalAddUser] = useState<boolean>(false)
    const [users, setUsers] = useState<ValuesAPI[]>([])
    const [editUser, setEditUser] = useState<number | null>(null)

    useEffect(() => {
      getUsers()
    }, [modalAddUser])

    const getUsers = async () => {
        const res = await axios.get(urlAPI)
        setUsers(res.data)
    }

    const deleteUser = async (id_usuario:number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro que deseas eliminar este usuario?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        });
        if(result.isConfirmed) {
            await axios.delete(urlAPI + id_usuario)
            setUsers(users.filter(user => user.id_usuario !== id_usuario));
            await getUsers();
        }
    }

    const updateUser = (id_usuario:number) => {
        setEditUser(id_usuario)
        setModalAddUser(true)
    }

    const closeModal = () => {
        setModalAddUser(false);
        setEditUser(null);
    };
    

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
                        {users.map((user) => (
                            <tr className="border-b hover:bg-gray-100 hover:transition-colors duration-300" key={user.id_usuario}>
                                <td className="p-2 text-center">{user.nombre}</td>
                                <td className="p-2 text-center">{user.apellidos}</td>
                                <td className="p-2 text-center">{user.email}</td>
                                <td className="p-2 text-center">{user.libros_prestados || 0}</td>
                                <td className="p-2 text-center w-fit">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 hover:transition-colors duration-300" onClick={() => updateUser(user.id_usuario)}>
                                    Editar
                                    </button>
                                    <button className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 hover:transition-colors duration-300" onClick={() => deleteUser(user.id_usuario)}>
                                    Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {modalAddUser && (
            <>
                {/* PONER BORROSO EL FONDO */}
                <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-10"></div>

                <div className="fixed inset-0 z-20 flex items-center justify-center">
                    <AddUser closeModal={closeModal} idUser={editUser}/>
                </div>
            
            </>
        )}
      
    </section>
  )
}

export default Users
