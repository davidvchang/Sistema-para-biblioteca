import React from 'react'

interface Props {
    text: string
}

const BtnAdd:React.FC<Props> = ({text}) => {
  return (
    <button className='py-2 px-3 bg-emerald-600 text-slate-100 rounded hover:bg-emerald-700 hover:transition-colors duration-300'>{text}</button>
  )
}

export default BtnAdd
