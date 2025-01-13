import React, { useState } from 'react'
import SearchInput from '../components/SearchInput'
import BtnAdd from '../components/BtnAdd'
import AddBorrowing from './AddBorrowing'

const Borrowing:React.FC = () => {

     const [modalAddBorrowing, setModalAddBorrowing] = useState<boolean>(false)

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
                            <tr className="border-b hover:bg-gray-100 hover:transition-colors duration-300">
                                <td className="p-2 flex justify-center">100 años</td>
                                <td className="p-2 text-center">Juan</td>
                                <td className="p-2 text-center">2</td>
                                <td className="p-2 text-center">10/marzo/2022</td>
                                <td className="p-2 text-center">Regresado</td>
                                <td className="p-2 text-center">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 hover:transition-colors duration-300">
                                    Editar
                                    </button>
                                </td>
                            </tr>
                    
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
