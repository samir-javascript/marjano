import CheckoutSteps from "@/components/CheckoutSteps";

import Link from "next/link"
import CheckoutHeader from '@/components/CheckoutHeader'
import { FaChevronRight } from "react-icons/fa"
import { MdOutlinePlace } from "react-icons/md"
import { getCartTotalCount, getUserById } from "@/lib/actions/cart.actions";
import { auth } from "@clerk/nextjs";
import ShippingForm from "@/components/forms/ShippingForm";
import { getShipping } from "@/lib/actions/shipping.actions";

const ShippingPage = async() => {
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
  const qty = await getCartTotalCount({
    userId: user?.user?._id
  })
  const shipping = await getShipping({userId: user?.user?._id})
  return (
    <div style={{background:'#fcfafc'}} className="w-full   pb-3">
     
    <CheckoutHeader  />
    <div className="lg:hidden flex justify-center w-full bg-white">
       <CheckoutSteps step1 step2 />
    </div>
      <div className="flex flex-col max-w-[1000px] mx-auto pt-7">
           <div className="bg-white shadow-md p-3 w-full flex items-center justify-between rounded-md">
                <p className="text-[18px] font-medium "> <strong className="font-extrabold ">basket</strong> 
                ({qty}) items </p>
                <Link className="flex items-center gap-2 bg-[#ddd] p-2 " href='/cart'>
                     <FaChevronRight />
                     <p>View</p>
                </Link>
           </div>
           <div className="w-full bg-white shadow-md mt-5 flex-col flex rounded-md p-3">
                <h3 className="font-extrabold text-[20px] text-black  tracking-[0.5px] ">
                    1 -Shipping address</h3>
                <div className="flex flex-col pt-4">
                    <div className="flex items-center">
                       <p className="font-bold text-[25px] text-black ">Your delivery details</p>
                       <div className="flex">
                       <MdOutlinePlace size={40} className="text-yellow-500 " />
                       <MdOutlinePlace size={40} className="text-green-500" />
                       </div>
                       
                    </div>
                  <ShippingForm shipping={JSON.stringify(shipping)} user={JSON.stringify(user)} />
                  
                </div>
           </div>
      </div>
      
    </div>
  )
}

export default ShippingPage