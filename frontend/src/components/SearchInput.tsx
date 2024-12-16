import React from 'react'

const SearchInput:React.FC = () => {
  return (
    <div className='relative'>
      <input type="search" name="search" id="search" placeholder='Buscar...' className='py-2 border border-slate-300 rounded-md pl-9 outline-none'/>
      {iconSearch}
    </div>
  )
}

const iconSearch = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-[1.20rem] absolute top-[0.70rem] left-3 text-[#9CACCB]">
<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>


export default SearchInput
