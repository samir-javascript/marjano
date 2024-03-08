"use client"
import { deleteShipping } from "@/lib/actions/shipping.actions"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"


const AddressCols = ({shipping, user}:any) => {
   const parsedUser = JSON.parse(user)
    const pathname = usePathname()
 const [showModal,setShowModal] = useState(false)
 const handleDelete = async()=> {
    try {
       await deleteShipping({
         shippingId: shipping?._id,
         path: pathname
       })
       //alert('Shipping address has been deleted')
    } catch (error) {
       console.log(error)
    }
 }
  return (
   <div  className="flex flex-col border-b border-[#ddd] pb-3 ">
 <div  className="max-md:flex hidden flex-col gap-4 mx-[20px] mt-4 ">
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">Nom:</strong> {parsedUser?.user.name} </p>
        </div>
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">Adresse:</strong> {shipping.address}</p>
        </div>
        <div className="flex items-center gap-3">
        <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">ville:</strong> {shipping.city}</p>
        </div>
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">code Postal:</strong>  {shipping.postalCode} </p>
        </div>
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">Téléphone:</strong>  {shipping.phoneNumber} </p>
        </div>
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">actions:</strong>
              <div className="flex items-center flex-nowrap">
                                <Link href={`/customer/profile/shipping/${parsedUser?.user?._id}/edit`}>
                                  <button type="button" className="outline-none border-none text-base text-[#0aafaa] font-medium hover:underline ">
                                  Modifier
                                  </button> 
                                  </Link>
                                   <span className="mx-2">| </span>
                                  <button onClick={()=> setShowModal(true)} type="button" className="outline-none border-none text-base text-red-500 font-medium hover:underline ">
                                    Supprimer
                                  </button>
                              </div> </p>
        </div>

                    
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <div onClick={()=> setShowModal(false)} className="p-3 ">
           <FaTimes cursor='pointer' color='gray' size={20} />
        </div>
        <Modal.Header className="border-none" closeButton>
          <Modal.Title className="text-[#333] font-bold text-[16px]  text-center "> 
              <p className="w-full text-center mx-auto ">Êtes-vous sûr(e) de vouloir effacer cette adresse ? </p>
             
          </Modal.Title>
        </Modal.Header>
       
        <Modal.Footer className="border-none"> 
          <div className="w-full flex justify-center gap-x-3">
          <button
            onClick={handleDelete}
             type="button"
          
             
  className="px-3 py-2 rounded-[15px] w-full font-bold text-[15px] bg-[#00afaa]  text-white"
>
  Valider
</button>
               <button type="button"  onClick={()=> setShowModal(false)} className="px-3 py-2 rounded-[15px] w-full font-bold text-[15px] border border-[#00afaa]  text-[#00afaa] 
                ">
                  Annuler
               </button>
          </div>
         
        </Modal.Footer>
      </Modal>
    </div>
   </div>
   
    )
  
}

export default AddressCols