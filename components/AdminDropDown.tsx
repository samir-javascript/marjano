"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { NavDropdown } from "react-bootstrap"

const AdminDropDown = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center">
               <Image width={35} height={35} className="w-[35px] h-[35px] object-contain cursor-pointer" 
               src="/images/admin.png" alt="" />
            <NavDropdown className="border-none outline-none !text-white" title={'Admin'}>
             
               <button type="button" onClick={()=> router.push('/admin/ordersList')} className="w-full text-left">
                 <NavDropdown.Item>Orders List</NavDropdown.Item>
               </button>
               <button className="w-full text-left" type="button" onClick={()=> router.push('/admin/usersList')}>
                 <NavDropdown.Item>Users List</NavDropdown.Item>
               </button>
               <button className="w-full text-left" type="button" onClick={()=> router.push('/admin/productsList')}>
                 <NavDropdown.Item>Products List</NavDropdown.Item>
               </button>
             </NavDropdown>
            </div>
  )
}

export default AdminDropDown