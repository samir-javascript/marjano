'use client'
import { useState } from "react";
import { deleteShipping } from "@/lib/actions/shipping.actions";
import { usePathname } from "next/navigation";
interface Props {
     _id: string;
}

const DeleteBtn = ({_id}:Props) => {
    const [loading,setLoading] = useState(false)
    const pathname = usePathname()
    const handleDelete = async()=> {
        setLoading(true)
        try {
            
            await deleteShipping({
                path: pathname,
                shippingId: _id,
            })
            alert('deleted')
            setLoading(false)
        } catch (error) {
             console.log(error)
        }finally {
            setLoading(false)
        }
    }
  return (
    <>
                            <button disabled={loading}  onClick={handleDelete}  type="button" className="outline-none border-none text-base text-red-500 font-medium hover:underline ">
                                    Supprimer
                                  </button>
    </>
  )
}

export default DeleteBtn