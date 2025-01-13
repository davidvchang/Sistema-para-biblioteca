import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import BtnAdd from '../components/BtnAdd'
import AddBorrowing from './AddBorrowing'
import axios from 'axios'

interface DataBorrowing {
    id_prestamo: number,
    id_usuario: number,
    id_libro: number,
    fecha_prestamo: string,
    fecha_devolucion: string,
    estado: string,
    cantidad_prestada: number
}

interface DataAPIBooks {
    autor: string,
    estado: string,
    fecha_publicacion: string,
    genero: string,
    id_libro: number
    isbn: string,
    precio: string,
    stock: number,
    titulo: string
}

interface DataAPIUsers {
    apellidos: string,
    email: string,
    id_usuario: number
    nombre: string,
    telefono: string
}


const Borrowing:React.FC = () => {

    const urlAPI: string = import.meta.env.VITE_URL_API_BORROWINGS
    const urlAPIBooks: string = import.meta.env.VITE_URL_API_BOOKS
    const urlAPIUsers: string = import.meta.env.VITE_URL_API_USERS

    const [modalAddBorrowing, setModalAddBorrowing] = useState<boolean>(false)
    const [dataBorrowings, setDataBorrowings] = useState<DataBorrowing[]>([])
    const [books, setBooks] = useState<DataAPIBooks[]>([])
    const [users, setUsers] = useState<DataAPIUsers[]>([])

     useEffect(() => {
       getBorrowings()
       getDataBooksAndUsers()
     }, [modalAddBorrowing])
     

     const getBorrowings = async () => {
        const response = await axios.get(urlAPI)
        setDataBorrowings(response.data)
     }

     const getDataBooksAndUsers = async () => {
        const [booksResponse, usersResponse] = await Promise.all([
            axios.get<DataAPIBooks[]>(urlAPIBooks),
            axios.get<DataAPIUsers[]>(urlAPIUsers),
        ]);
        setBooks(booksResponse.data);
        setUsers(usersResponse.data);
    }

    const getBookTitle = (bookId: number) => {
        const book = books.find(b => b.id_libro === bookId);
        return book ? book.titulo : 'Libro no encontrado';
    }

    const getUserName = (userId: number) => {
        const user = users.find(u => u.id_usuario === userId);
        return user ? `${user.nombre} ${user.apellidos}` : 'Usuario no encontrado';
    }

  return (
    <section className='flex flex-col gap-7 w-full py-5 px-10'>
        <SearchInput/>

        <span className='text-2xl font-semibold'>Prestamos</span>

        <div className='flex justify-between'>
            <span className='text-xl font-semibold'>Prestamos realizados</span>
            <BtnAdd text='Pedir prestamo' onClick={() => setModalAddBorrowing(true)}/>
        </div>

        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-100 rounded-lg">
                    <thead className=" border-b">
                        <tr>
                        <th className="p-4 text-center">Libro prestado</th>
                        <th className="p-4 text-center">Usuario al que se le prestó</th>
                        <th className="p-4 text-center">Cantidad prestada</th>
                        <th className="p-4 text-center">Fecha del prestamo</th>
                        <th className="p-4 text-center">Estado</th>
                        <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBorrowings.map((borrowing) => (
                            <tr className="border-b hover:bg-gray-100 hover:transition-colors duration-300" key={borrowing.id_prestamo}>
                                <td className="p-2 flex justify-center">{getBookTitle(borrowing.id_libro)}</td>
                                <td className="p-2 text-center">{getUserName(borrowing.id_usuario)}</td>
                                <td className="p-2 text-center">{borrowing.cantidad_prestada}</td>
                                <td className="p-2 text-center">{borrowing.fecha_prestamo}</td>
                                <td className="p-2 text-center">{borrowing.estado}</td>
                                <td className="p-2 text-center">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 hover:transition-colors duration-300">
                                    Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
        </div>

        {modalAddBorrowing && (
            <>
                {/* PONER BORROSO EL FONDO */}
                <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-10"></div>

                <div className="fixed inset-0 z-20 flex items-center justify-center">
                    <AddBorrowing closeModal={() => setModalAddBorrowing(false)}/>
                </div>
            
            </>
        )}

    </section>
  )
}

export default Borrowing
