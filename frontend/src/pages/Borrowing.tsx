import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import BtnAdd from '../components/BtnAdd'
import AddBorrowing from './AddBorrowing'
import axios from 'axios'
import Swal from 'sweetalert2'

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
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

     useEffect(() => {
       getBorrowings()
       getDataBooksAndUsers()
     }, [modalAddBorrowing])
     
     const handleToggleDropdown = (id: number) => {
        setOpenDropdown((prev) => (prev === id ? null : id));
     };

     const updateQuantityBook = async (id_libro: number, cantidad_prestada: number) => {

        const book = books.find((b) => b.id_libro === id_libro);
        if (!book) {
            console.error(`El libro con id ${id_libro} no fue encontrado.`);
            return;
        }

        const stock:number = book.stock

        const nuevoStock = stock + cantidad_prestada

        const newCantidad = {
            stock: nuevoStock
        }
        await axios.put(`${urlAPIBooks}stock/${id_libro}`, newCantidad )
     }

     const updateBorrowing = async (id_prestamo: number, newStatus: string) => {

        const updateData = {
            estado: newStatus
        }

        await axios.put(urlAPI + id_prestamo, updateData)

        Swal.fire({
            title: 'Exito',
            text: 'Se ha regresado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        })

     }

      const handleStatusChange =  (id: number, newStatus: string, id_libro: number, cantidad: number) => {
        updateQuantityBook(id_libro, cantidad)
        updateBorrowing(id, newStatus)
        setOpenDropdown(null);
      };

     const getBorrowings = async () => {
        const response = await axios.get(`${urlAPI}estado/Prestado`)
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

    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString('es-ES');
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
                                <td className="p-2 text-center">{formatDate(borrowing.fecha_prestamo)}</td>
                                <td className="p-2 text-center">{borrowing.estado}</td>

                                <td className="p-2 text-center">
                                    <button onClick={() => handleToggleDropdown(borrowing.id_prestamo)}>
                                        {iconConfig}
                                    </button>

                                    {openDropdown === borrowing.id_prestamo && (
                                    <div className="absolute right-6 mt-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                        <select
                                        className="block w-full p-2 text-sm text-gray-700 bg-white border rounded-md focus:outline-none"
                                        onChange={(e) => handleStatusChange(borrowing.id_prestamo, e.target.value, borrowing.id_libro, borrowing.cantidad_prestada)}
                                        >
                                        <option value="">Seleccionar estado</option>
                                        <hr />
                                        <option value="Regresado">Regresado</option>
                                        </select>
                                    </div>
                                    )}
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

const iconConfig = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-600 hover:text-blue-400 hover:transition-colors duration-300">
<path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>


export default Borrowing
