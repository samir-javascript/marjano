"use client"

import {  deleteUserByAdmin} from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { Button } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
interface props {
    userId?: string | null;
    isAdmin: boolean
}
const BtnDeleteUser = ({userId, isAdmin}:props) => {
 
    const pathname = usePathname()
    const handleDeleteUser = async()=> {
      if(isAdmin) return alert('cannot delete admin users');
         try {
           await deleteUserByAdmin({
             path: pathname,
             userId: userId!
           })
         } catch (error) {
            console.log(error)
         }
    }
  return (
                         <Button onClick={handleDeleteUser}  type='button' variant='light' className='btn-sm'>
                              <FaTrash color='red' />
                           </Button>
  )
}

export default BtnDeleteUser