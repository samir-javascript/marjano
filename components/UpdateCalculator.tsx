"use client"
import { addToCart } from '@/lib/actions/product.actions';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'

const UpdateCalculator = ({item,user}:any) => {
 const pathname = usePathname()
  
   const parsedItem = JSON.parse(item)
  
    const parsedUser = JSON.parse(user)
    //const [quantity, setQuantity] = useState(parsedItem.quantity);
   
    const handleUpdateCart = async(type:string)=> {
      try {
        if(type === 'increase') {
          await addToCart({
            quantity: 1,
            name: parsedItem.productId.name,
            price: parsedItem.productId.price,
            images: parsedItem.productId.images,
            userId: parsedUser.user._id,
            productId: parsedItem.productId._id,
            path:pathname
        })
        }else if(type === 'decrease') {
          if(parsedItem.quantity <= 1) {
            return;
          }
          await addToCart({
            quantity: -1,
            userId: parsedUser.user._id,
            productId: parsedItem.productId._id,
            name: parsedItem.productId.name,
            price: parsedItem.productId.price,
            images: parsedItem.productId.images,
            path:pathname
        })
        }else if(type === 'remove') {
          await addToCart({
            quantity: -parsedItem.quantity,
            userId: parsedUser.user._id,
            name: parsedItem.productId.name,
            price: parsedItem.productId.price,
            images: parsedItem.productId.images,
            productId: parsedItem.productId._id,
            path:pathname
        })
        }
       
       
       
     } catch (error) {
        console.log(error)
     }
     
        
    }
  return (
    <>
    <div className="sm:flex hidden flex-col justify-end items-end gap-2">
    <FaTrash  onClick={()=> handleUpdateCart('remove')}  color="red" size={26} className="mx-3 cursor-pointer" />
    <div className="flex items-center justify-between mx-3 mb-2 border border-[#ddd] px-3 py-1 rounded-xl w-[140px]">
      <FaMinus
        onClick={()=> handleUpdateCart('decrease')}
        size={14}
        className="cursor-pointer"
        color="#00afaa"
      />
      <p className="font-semibold text-black">{parsedItem?.quantity}</p>
      <FaPlus
      onClick={()=> handleUpdateCart('increase')}
        size={14}
        className="cursor-pointer"
        color="#00afaa"
      />
    </div>
    <div className="mx-3">
      <p className="text-[#00afaa] font-semibold text-[20px]">
        {(parsedItem.quantity * parseFloat(parsedItem?.productId?.price)).toFixed(2)} Dh
      </p>
    </div>
  </div>
 
  <div className="sm:hidden flex items-center w-full justify-between mt-4 mb-2 ">
  <div className="flex items-center justify-between mx-3 mb-2 border border-[#ddd] px-3 py-1 rounded-xl w-[140px]">
      <FaMinus
        onClick={()=> handleUpdateCart('decrease')}
        size={14}
        className="cursor-pointer"
        color="#00afaa"
      />
      <p className="font-semibold text-black">{parsedItem?.quantity}</p>
      <FaPlus
      onClick={()=> handleUpdateCart('increase')}
        size={14}
        className="cursor-pointer"
        color="#00afaa"
      />
    </div>
    <div className="flex items-center gap-5">
      <p className="font-bold text-base ">
        {parsedItem?.productId?.price * parsedItem?.quantity} Dh
        </p>
        <FaTrash onClick={()=> handleUpdateCart('remove')} color="red" size={26} className="mx-3 cursor-pointer" />
    </div>
  </div>
  </>
  )
 
}

export default UpdateCalculator