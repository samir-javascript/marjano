/* eslint-disable react/no-unescaped-entities */
import FormContainer from "@/components/FormContainer"
import { getUserById } from "@/lib/actions/cart.actions"
import { getShipping } from "@/lib/actions/shipping.actions"
import { auth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const UserShipping = async() => {
   
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
 
  const shipping = await getShipping({userId: user?.user?._id})
   
    
  return (
    <div className="w-full flex flex-col justify-center  pt-3 pb-8">
    
     <FormContainer>
          <h2 className="text-center font-bold text-[#0b4d54] text-[30px] ">Choix adresse de livraison</h2>
          <Link href='/customer/address/checkout_address/newShipping' className="border flex mx-7 mt-3 items-center justify-center border-[#0aafaa] rounded-[20px] p-2 ">
             <Image alt='search icon'  width={30} height={30} className="object-contain text-[#00afaa] " src='/images/search.png' />
              <p className="font-semibold text-[#00afaa] text-sm ml-2 ">Ajouter une nouvelle address </p>
          </Link>
    </FormContainer>
    <FormContainer>
        <div className="flex flex-col mx-5">
        <div className="flex items-center mt-3 gap-x-2 ">
             <div className="w-full border-b border-[#e5e5e5] leading-[0.1em] m-[10px 0 20px] text-center  "></div>
             <span className="font-bold text-[#e5e5e5] text-[25px] ">ou</span>
             <div className="w-full border-b border-[#e5e5e5] leading-[0.1em] m-[10px 0 20px] text-center  "></div>
         </div>
         <div className="flex flex-col space-y-3 mt-3">
            <h3 className="font-medium text-[#0aafaa] text-[18px] whitespace-nowrap ">J'utilise une adresse enregistrée</h3>
             <div>
                 <p className="font-bold text-black text-[16px] mb-1.5 ">Mr. {user?.user?.name} </p>
                 <p className="font-normal text-[#4c4c4c] text-[14px] ">{shipping?.city}, {shipping?.address} </p>
                 <p className="font-normal text-[#4c4c4c] text-[14px] "><span>{shipping?.city}, {shipping?.postalCode} {shipping.country} </span></p>
                 <p className="font-normal text-[#4c4c4c] text-[14px] ">{shipping?.phoneNumber} </p>
                 <div className="flex items-center justify-between w-full mt-2">
                    <Link href='/payment'>
                    <button type="button" className="px-4 py-1.5 text-sm rounded-[20px] text-white font-bold
                          bg-[#0aafaa]
                    ">
                       Choisir
                    </button>
                    </Link>
                    <Link href='/customer/address/checkout_address/newShipping'>
                    <button className="font-bold underline text-[#0aafaa]  " type="button" > 
                          Modefier
                    </button>
                    </Link>
                    
                 </div>
             </div>
         </div>
        </div>
        
    </FormContainer>
    </div>
   
  )
}

export default UserShipping