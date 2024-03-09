import ShippingForm from "@/components/forms/ShippingForm"
import { getUserById } from "@/lib/actions/cart.actions"
import { getShipping } from "@/lib/actions/shipping.actions"
import { auth } from "@clerk/nextjs"
import type { Metadata } from "next"
import { MdOutlinePlace } from "react-icons/md"
// <title>Modifier l’adresse</title>
export const metadata: Metadata = {
  title: "Ajoutez nouvelle shipping adresse",
};
const ShippingAddress = async() => {
  const {userId} = auth()
  const user = await getUserById({clerkId:userId!})
  const shipping = await getShipping({userId:user.user._id})

  return (
    <div style={{background:'#fcfafc'}} className="w-full   pb-3">

    <div className="lg:hidden flex justify-center w-full bg-white">
       
    </div>
      <div className="flex flex-col max-w-[1000px] mx-auto pt-7">
          
           <div className="w-full bg-white shadow-md mx-auto mt-5 flex-col flex rounded-md p-3">
                <h3 className="font-extrabold text-[20px] text-black  tracking-[0.5px] ">
                    1 - Add shipping address</h3>
                <div className="flex flex-col pt-4">
                    <div className="flex items-center">
                       <p className="font-bold text-[25px] text-black ">Your delivery details</p>
                       <div className="flex">
                       <MdOutlinePlace size={40} className="text-yellow-500 " />
                       <MdOutlinePlace size={40} className="text-green-500" />
                       </div>
                       
                    </div>
                    <ShippingForm user={JSON.stringify(user)} type='addition' shipping={JSON.stringify(shipping)} />

                </div>
           </div>
      </div>
      
    </div>
  )
}

export default ShippingAddress