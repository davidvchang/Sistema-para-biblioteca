import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

interface ToggleModal {
    closeModal: () => void,
}

interface DataModalBorrowings {
    libro: string,
    usuario: string,
    fecha_prestamo: string,
    estado: string,
    cantidad: number
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
    telefono: string,
    libros_prestados: number
}

const AddBorrowing:React.FC<ToggleModal> = ({closeModal}) => {

    const urlAPI: string = import.meta.env.VITE_URL_API_BORROWINGS
    const urlAPIBooks: string = import.meta.env.VITE_URL_API_BOOKS
    const urlAPIUsers: string = import.meta.env.VITE_URL_API_USERS

    const initialValues:DataModalBorrowings = {
        libro: "",
        usuario: "",
        fecha_prestamo: "dd/mm/aaaa",
        estado: "Prestado",
        cantidad: 1
    }
    const [books, setBooks] = useState<DataAPIBooks[]>([])
    const [users, setUsers] = useState<DataAPIUsers[]>([])
    const [dataBorrowing, setDataBorrowing] = useState<DataModalBorrowings>(initialValues)
    

    useEffect(() => {
        getDataBooksAndUsers()
    }, [])

    const getDataBooksAndUsers = async () => {
        const [booksResponse, usersResponse] = await Promise.all([
            axios.get<DataAPIBooks[]>(urlAPIBooks),
            axios.get<DataAPIUsers[]>(urlAPIUsers),
        ]);
        setBooks(booksResponse.data);
        setUsers(usersResponse.data);
    }

    const captureData = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setDataBorrowing((prevData) => ({...prevData, [name]: name === "cantidad" && value === "" ? "" : name === "cantidad" ? parseInt(value) : value,}));
    }

    const updateBookAndUser = async () => {

        const book = books.find((b) => b.id_libro === parseInt(dataBorrowing.libro));
        const user = users.find((b) => b.id_usuario === parseInt(dataBorrowing.usuario));

        if(book && user) {
            const newStock = book.stock - dataBorrowing.cantidad;
            const newStockUser = user.libros_prestados + dataBorrowing.cantidad;

            if (newStock < 0) {
                Swal.fire({
                    title: 'Error',
                    text: 'No hay suficiente stock.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
            else {
                await axios.put(urlAPIBooks + book.id_libro, {
                    ...book,
                    stock: newStock,
                });

                await axios.put(urlAPIUsers + "libros_prestados/" + user.id_usuario, {
                    ...user,
                    libros_prestados: newStockUser,
                });
                console.log("LINK: ", urlAPIUsers + "libros_prestados/" + user.id_usuario)

                Swal.fire({
                    title: 'Exito',
                    text: 'Préstamo registrado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    closeModal();
                    
                })
            }
        }
    }

    const handleSaveBorrowing = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newBoroowing = {
            id_libro: parseInt(dataBorrowing.libro),
            id_usuario: parseInt(dataBorrowing.usuario),
            fecha_prestamo: dataBorrowing.fecha_prestamo,
            estado: dataBorrowing.estado,
            cantidad_prestada: dataBorrowing.cantidad,
        }
        await axios.post(urlAPI, newBoroowing);

        updateBookAndUser()
    }

    
  return (
    <div className='w-5/12 h-fit absolute bottom-20 left-1/3 bg-white p-5 shadow-lg rounded-md'>
      <form className='w-full flex flex-col gap-10' onSubmit={handleSaveBorrowing}>
        <span className='font-semibold text-2xl text-center'>Pedir prestamo</span>

        <div className='flex flex-col gap-5'>
            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Libro a pedir</span>
                    <select name="libro" value={dataBorrowing.libro} className='p-3 w-full border border-slate-100' onChange={captureData}>
                        <option value="">Selecciona un libro</option>
                        <hr />

                        {books.map((book) => (
                            <option value={book.id_libro} key={book.id_libro}>{book.titulo}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Usuario a prestar</span>
                    <select name="usuario" value={dataBorrowing.usuario} className="p-3 w-full border border-slate-100" onChange={captureData}>
                        <option value="">Selecciona un usuario</option>
                        <hr />

                        {users.map((user) => (
                            <option value={user.id_usuario} key={user.id_usuario}>{`${user.nombre + " " + user.apellidos}`}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Fecha del prestamo</span>
                    <input type="date" name="fecha_prestamo" value={dataBorrowing.fecha_prestamo} className='p-2 w-full border border-slate-100' onChange={captureData}/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Estado</span>
                    <select name="estado" className='p-3 w-full border border-slate-100' value={dataBorrowing.estado} onChange={captureData}>
                        <option value="Prestado">Prestado</option>
                    </select>
                </div>
            </div>

            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Cantidad de libros</span>
                    <input type="number" name='cantidad' min={1} placeholder='Cantidad de libros' className='p-2 w-full border border-slate-100' value={dataBorrowing.cantidad} onChange={captureData}/>
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

export default AddBorrowing
