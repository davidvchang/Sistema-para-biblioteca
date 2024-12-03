import React from 'react'

interface Props {
    text: string,
    icon: React.ReactNode,
    number: number

}

const CounterInformation:React.FC<Props> = ({text, icon, number}) => {
  return (
    <div className='flex flex-col w-52  items-center justify-center gap-3'>
       <div className='flex w-full items-center justify-center gap-5'>
            <span className='font-semibold'>{text}</span>
            {icon}
       </div>

       <span className='text-4xl'>{number}</span>
    </div>
  )
}

export default CounterInformation
