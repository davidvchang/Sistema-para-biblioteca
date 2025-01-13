import React from 'react'

interface Props {
    name: string,
    action: string,
    nameBook: string,
}

const RecentActivity:React.FC<Props> = ({name, action, nameBook}) => {
  return (
    <div className='flex flex-col pl-10'>
        <span className='font-semibold'>{name}</span>
        <div className='flex font-light text-[#737373] text-sm gap-1'>
            <span>{action} "</span> <span>{nameBook}" </span>
        </div>
    </div>
  )
}

export default RecentActivity
