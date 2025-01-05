import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import BtnAdd from '../components/BtnAdd'
import AddBook from './AddBook'
import axios from 'axios'
import Swal from 'sweetalert2'


interface ValuesAPI {
    id_libro: number,
    titulo: string,
    autor: string,
    isbn: string,
    genero: string,
    precio: number,
    stock: number,
    fecha_publicacion: string,
    estado: string
}

const Books:React.FC = () => {

    const [modalAddBook, setModalAddBook] = useState<boolean>(false)
    const [books, setBooks] = useState<ValuesAPI[]>([])

    const urlAPI:string = "http://localhost:4000/api/libros/"

    useEffect(() => {
        getBooks()
    }, [modalAddBook])

    const getBooks = async() => {
        const response = await axios.get(urlAPI)
        setBooks(response.data)
    }

    const deleteBook = async (id_libro:number) => {
        const result = await Swal.fire({
            title: '¿Estás seguro que deseas eliminar este libro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        });
        if(result.isConfirmed) {
            await axios.delete(urlAPI + id_libro)
            setBooks(books.filter(book => book.id_libro !== id_libro));
            await getBooks();
        }
    }
    

  return (
    <section className='flex flex-col gap-7 w-full py-5 px-10'>
        <SearchInput/>

        <span className='text-2xl font-semibold'>Libros</span>

        <div className='flex justify-between'>
            <span className='text-xl font-semibold'>Inventario de libros</span>
            <BtnAdd text='Agregar libro' onClick={() => setModalAddBook(true)}/>
        </div>

        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-100 rounded-lg">
                    <thead className=" border-b">
                        <tr>
                        <th className="p-4 text-center">Imagen</th>
                        <th className="p-4 text-center">Título</th>
                        <th className="p-4 text-center">Autor</th>
                        <th className="p-4 text-center">Stock</th>
                        <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (

                            <tr className="border-b" key={book.id_libro}>
                                <td className="p-4 flex justify-center">
                                    <img src="https://via.placeholder.com/50" alt="Libro" className="w-14 h-20 object-cover rounded" />
                                </td>
                                <td className="p-4 text-center">{book.titulo}</td>
                                <td className="p-4 text-center">{book.autor}</td>
                                <td className="p-4 text-center">{book.stock}</td>
                                <td className="p-4 text-center">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:transition-colors duration-300" >
                                    Editar
                                    </button>
                                    <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:transition-colors duration-300" onClick={() => deleteBook(book.id_libro)}>
                                    Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    
                    </tbody>
                </table>
            </div>
        </div>

        {modalAddBook && (
            <>
                {/* PONER BORROSO EL FONDO */}
                <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-10"></div>

                <div className="fixed inset-0 z-20 flex items-center justify-center">
                    <AddBook closeModal={() => setModalAddBook(false)} />
                </div>
            
            </>
        )}
      
    </section>

  )
}

export default Books
