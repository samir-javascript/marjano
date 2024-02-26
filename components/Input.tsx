"use client"
import { useState } from 'react'
import { FaSearch , FaTimes } from 'react-icons/fa'
const Input = () => {
    const [keyword,setKeyword] = useState('')
  return (
    <div className='bg-white flex items-center justify-between flex-1 w-full relative rounded-[10px] h-[50] py-3 px-4 '>
        <input value={keyword} onChange={(e)=> setKeyword(e.target.value)}
         className='outline-none bg-transparent w-full flex-1 indent-2 border-none placeholder:text-sm placeholder:font-semibold text-gray-700 capitalize '
          type="text" placeholder='search for product, brand or category...' />
         {keyword ? <FaTimes cursor='pointer' size={18}  onClick={()=> setKeyword('')} /> : <FaSearch size={20} color='#0b4d54' cursor='pointer' />}
    </div>
  )
}
export default Input