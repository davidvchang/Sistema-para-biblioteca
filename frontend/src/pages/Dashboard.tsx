import React, { useEffect, useState } from 'react'
import CounterInformation from '../components/CounterInformation'
import RecentActivity from '../components/RecentActivity'
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


const Dashboard:React.FC = () => {
  
  const urlAPI:string = import.meta.env.VITE_URL_API_BOOKS || ""
  const urlAPIUsers:string = import.meta.env.VITE_URL_API_USERS || ""
  const urlAPIBorrowings: string = import.meta.env.VITE_URL_API_BORROWINGS
  
  const [numberBooks, setNumberBooks] = useState<number>(0)
  const [numberUsers, setNumberUsers] = useState<number>(0)
  const [numberBorrowing, setNumberBorrowing] = useState<number>(0)

  const [dataBorrowings, setDataBorrowings] = useState<DataBorrowing[]>([])
  const [books, setBooks] = useState<DataAPIBooks[]>([])
  const [users, setUsers] = useState<DataAPIUsers[]>([])

  useEffect(() => {
    getDataBooksAndUsers()
    getNumbers()
  }, [])

  const getDataBooksAndUsers = async () => {
    const [booksResponse, usersResponse, borrowingsResponse] = await Promise.all([
        axios.get<DataAPIBooks[]>(urlAPI),
        axios.get<DataAPIUsers[]>(urlAPIUsers),
        axios.get<DataBorrowing[]>(urlAPIBorrowings)
    ]);
    setBooks(booksResponse.data);
    setUsers(usersResponse.data);
    const lastFourBorrowings = borrowingsResponse.data.slice(-6);
    setDataBorrowings(lastFourBorrowings);
  }

  const getNumbers = async () => {
    const [booksResponse, usersResponse, borrowingsResponse] = await Promise.all([
      axios.get<DataAPIBooks[]>(urlAPI),
      axios.get<DataAPIUsers[]>(urlAPIUsers),
      axios.get<DataBorrowing[]>(urlAPIBorrowings),
    ]);

    setNumberBooks(booksResponse.data.length);
    setNumberUsers(usersResponse.data.length);
    setNumberBorrowing(borrowingsResponse.data.length);
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
      <span className='text-2xl font-semibold'>Dashboard</span>

      <div className='flex w-full flex-wrap justify-around'>
        <CounterInformation text='Libros totales' icon={iconTotalsBook} number={numberBooks}/> 
        <CounterInformation text='Usuarios' icon={iconUsers} number={numberUsers}/> 
        <CounterInformation text='Libros prestados' icon={iconBorrowedBooks} number={numberBorrowing}/>
      </div>

      <span className='text-xl font-semibold mt-12'>Actividades Recientes</span>

      <div className='flex flex-col gap-5'>
        {dataBorrowings
        .slice(-6)
        .reverse()
        .map((borrowing) => (
            <RecentActivity name={getUserName(borrowing.id_usuario)} action='Pidió prestado el libro' nameBook={getBookTitle(borrowing.id_libro)}/>
        ))}
      </div>
    </section>
  )
}

const iconTotalsBook = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={20} height={20} strokeWidth={2} stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>

const iconUsers = <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
<path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
</svg>

const iconBorrowedBooks = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-copy">
    <path d="M2 16V4a2 2 0 0 1 2-2h11"/><path d="M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12"/><path d="M5 14H4a2 2 0 1 0 0 4h1"/>
</svg>


export default Dashboard
