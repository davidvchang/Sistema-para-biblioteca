import React from 'react'
interface Props {
    name: string,
    action: string,
    nameBook: string,
    time: string
}

const RecentActivity:React.FC<Props> = ({name, action, nameBook, time}) => {
  return (
    <div className='flex flex-col pl-10'>
        <span className='font-semibold'>{name}</span>
        <div className='flex font-light text-[#737373] text-sm gap-1'>
            <span>{action} "</span> <span>{nameBook}" </span><span> - Hace {time}</span>
        </div>
    </div>
  )
}

export default RecentActivity
