import React from 'react'
import SearchInput from '../components/SearchInput'
import BtnAdd from '../components/BtnAdd'

const Books:React.FC = () => {
  return (
    <section className='flex flex-col gap-7 w-full py-5 px-10'>
        <SearchInput/>

        <span className='text-2xl font-semibold'>Libros</span>

        <div className='flex justify-between'>
            <span className='text-xl font-semibold'>Inventario de libros</span>
            <BtnAdd text='Agregar libro'/>
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
                        <tr className="border-b">
                            <td className="p-4 flex justify-center">
                                <img src="https://via.placeholder.com/50" alt="Libro" className="w-14 h-20 object-cover rounded" />
                            </td>
                            <td className="p-4 text-center">El Quijote</td>
                            <td className="p-4 text-center">Miguel de Cervantes</td>
                            <td className="p-4 text-center">5</td>
                            <td className="p-4 text-center">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:transition-colors duration-300" >
                                Editar
                                </button>
                                <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:transition-colors duration-300" >
                                Eliminar
                                </button>
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="p-4 flex justify-center">
                                <img src="https://via.placeholder.com/50" alt="Libro" className="w-14 h-20 object-cover rounded" />
                            </td>
                            <td className="p-4 text-center">El Quijote</td>
                            <td className="p-4 text-center">Miguel de Cervantes</td>
                            <td className="p-4 text-center">5</td>
                            <td className="p-4 text-center">
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
      
    </section>
  )
}

export default Books
