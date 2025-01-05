import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

interface ToggleModal {
    closeModal: () => void
}

interface DataBooks {
    titulo: string,
    autor: string,
    isbn: string,
    genero: string,
    precio: number,
    stock: number,
    fecha_publicacion: string,
    estado: string
}


const AddBook:React.FC<ToggleModal> = ({closeModal}) => {

    const initialValues:DataBooks = {
        titulo:"",
        autor: "",
        isbn: "",
        genero: "",
        precio: 0,
        stock: 0,
        fecha_publicacion: "dd/mm/aaaa",
        estado: "Disponible"
    }

    const [dataBooks, setDataBooks] = useState<DataBooks>(initialValues)

    const captureData = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setDataBooks((prevData) => ({...prevData, [name]: value}));
    }

    const handleSaveOrUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newBook = {...dataBooks}

        await axios.post("http://localhost:4000/api/libros", newBook);
        
        Swal.fire({
            title: 'Exito',
            text: 'Libro guardado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            closeModal();
            setDataBooks(initialValues)
        })
        
        setDataBooks({...initialValues})
    }

  return (
    <div className='w-5/12 h-fit absolute bottom-20 left-1/3 bg-white p-5 shadow-lg rounded-md'>
      <form className='w-full flex flex-col gap-10' onSubmit={handleSaveOrUpdateBook}>
        <span className='font-semibold text-2xl text-center'>Agregar Libro</span>

        <div className='flex flex-col gap-5'>
            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Título</span>
                    <input type="text" name='titulo' placeholder='Titulo del libro' className='p-2 w-full border border-slate-100' value={dataBooks.titulo} onChange={captureData}/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Autor</span>
                    <input type="text" name='autor' placeholder='Autor del libro' className='p-2 w-full border border-slate-100' value={dataBooks.autor} onChange={captureData}/>
                </div>
            </div>

            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>ISBN</span>
                    <input type="text" name='isbn' placeholder='Isbn del libro' className='p-2 w-full border border-slate-100' value={dataBooks.isbn} onChange={captureData}/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Género</span>
                    <input type="text" name='genero' placeholder='Género del libro' className='p-2 w-full border border-slate-100' value={dataBooks.genero} onChange={captureData}/>
                </div>
            </div>

            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Precio</span>
                    <input type="number" step="any" name="precio" min={0} placeholder='Precio del libro' className='p-2 w-full border border-slate-100' value={dataBooks.precio} onChange={captureData}/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Cantidad</span>
                    <input type="number" name='stock' min={0} placeholder='Cantidad a agregar' className='p-2 w-full border border-slate-100' value={dataBooks.stock} onChange={captureData}/>
                </div>
            </div>
            <div className='flex gap-5'>
                <div className='flex flex-col w-full'>
                    <span>Fecha de publicación</span>
                    <input type="date" name="fecha_publicacion" className='p-2 w-full border border-slate-100' value={dataBooks.fecha_publicacion} onChange={captureData}/>
                </div>
                <div className='flex flex-col w-full'>
                    <span>Estado</span>
                    <select name="estado" className='p-3 w-full border border-slate-100' value={dataBooks.estado} onChange={captureData}>
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
