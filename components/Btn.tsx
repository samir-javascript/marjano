"use client"
import Spinner from 'react-bootstrap/Spinner'

import { createProduct } from '@/lib/actions/product.actions'
import { usePathname } from 'next/navigation'
import { useState } from 'react'


const Btn = ({user}:any) => {
  const parsedUser = JSON.parse(user)
   
    const [loading,setLoading] = useState(false)
    const pathname = usePathname()
    const handleCreateProduct = async()=> {
        setLoading(true)
        try {
            await createProduct({
              path: pathname,
              userId: parsedUser.user._id
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }
  return (
    <button onClick={handleCreateProduct}  type='button' className={`${loading ? '' :'hover:bg-[#2c7c7a] transition-all duration-150'} px-[15px] py-[8px] 
             rounded-[8px] transition-all duration-150 whitespace-nowrap
               text-white font-bold  bg-[#00afaa]`}>
               {loading ? <div className="
             rounded-[8px]   text-white font-bold  bg-[#00afaa] flex items-center justify-center  w-[100px] h-[30px]  ">
                  <Spinner role='status' animation='border' style={{
                display:'flex ',
                alignItems:'center',
                justifyContent:'center',
                width:'30px',
                height:'30px',
                margin:'auto',
                color:'#fff'
              }} >
                </Spinner>
               </div> : ' Create product'}
             </button>
  )
}

export default Btn