import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

interface ToggleModal {
    closeModal: () => void,
    idUser: number | null
}

interface DataUsers {
    nombre: string,
    apellidos: string,
    email: string,
    telefono: string,
}

const AddUser:React.FC<ToggleModal> = ({closeModal, idUser}) => {


    const urlAPI:string = import.meta.env.VITE_URL_API_USERS || ""

    const initialValues:DataUsers = {
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
    }

    useEffect(() => {
      if(idUser) {
        getOneUser()
      }
      else {
        setDataUsers(initialValues);
      }
    }, [idUser])

    const getOneUser = async() => {
        const response = await axios.get(urlAPI + idUser)
        setDataUsers(response.data[0]);
    }
    
    const [dataUsers, setDataUsers] = useState<DataUsers>(initialValues)

    const captureData = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setDataUsers((prevData) => ({...prevData, [name]: value}));
    }

    const handleSaveOrUpdateUser = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(idUser) {
            const updateUser = {...dataUsers}
            await axios.put(urlAPI + idUser, updateUser)
        }
        else {
            const newUser = {...dataUsers}
            await axios.post(urlAPI, newUser);
        }

        Swal.fire({
            title: 'Exito',
            text: 'Usuario guardado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            closeModal();
            setDataUsers(initialValues)
        })
        
        setDataUsers({...initialValues})
    }

  return (
    <div className='w-3/12 h-fit absolute bottom-20 right-1/3 bg-white p-5 shadow-lg rounded-md'>
      <form className='w-full flex flex-col gap-10' onSubmit={handleSaveOrUpdateUser}>
        <span className='font-semibold text-2xl text-center'>{idUser ? "Actualizar Usuario" : "Agregar Usuario"}</span>

        <div className='flex flex-col gap-5'>
            <div className='flex flex-col w-full'>
                <span>Nombre</span>
                <input type="text" name='nombre' placeholder='Nombre' className='p-2 w-full border border-slate-100' value={dataUsers.nombre} onChange={captureData}/>
            </div>
            <div className='flex flex-col w-full'>
                <span>Apellidos</span>
                <input type="text" name='apellidos' placeholder='Apellidos' className='p-2 w-full border border-slate-100' value={dataUsers.apellidos} onChange={captureData}/>
            </div>

            <div className='flex flex-col w-full'>
                <span>Correo</span>
                <input type="email" name='email' placeholder='Correo' className='p-2 w-full border border-slate-100' value={dataUsers.email} onChange={captureData}/>
            </div>
            <div className='flex flex-col w-full'>
                <span>Telefono</span>
                <input type="text" name='telefono' placeholder='Telefono' className='p-2 w-full border border-slate-100' value={dataUsers.telefono} onChange={captureData}/>
            </div>

        </div>

        <div className='w-full flex justify-around gap-5'>
            <button type="button" className='w-fit h-fit px-7 py-3 rounded bg-red-500 text-white hover:bg-red-600 hover:transition-colors duration-300' onClick={closeModal}>Cancelar</button>
            <button type="submit" className='w-fit h-fit px-7 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 hover:transition-colors duration-300'>Guardar</button>
        </div>

      </form>
    </div>
  )
}

export default AddUser
