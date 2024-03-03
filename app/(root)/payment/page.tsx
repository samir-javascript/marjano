/* eslint-disable react/no-unescaped-entities */

import CheckoutHeader from "@/components/CheckoutHeader";
import CheckoutSteps from "@/components/CheckoutSteps";
import PaymentForm from "@/components/forms/PaymentForm";
import {  getUserById, getUserCart } from "@/lib/actions/cart.actions";
import { getShipping } from "@/lib/actions/shipping.actions";
import { auth } from "@clerk/nextjs";




const PaymentPage = async() => {
   
    const { userId } = auth()
    const user = await getUserById({clerkId:userId!})
   
    const result =  await getUserCart({
      userId: user.user._id
    })
   
    const shipping = await getShipping({userId: user?.user?._id})
    


   
   
    
   
  
  return (
    <div className="w-full pb-5">
        
        <CheckoutHeader  />
        <div className="lg:hidden flex justify-center w-full bg-white">
            <CheckoutSteps step1 step2  step3/>
        </div>
         <h1 className="font-extrabold sm:text-[35px] text-[28px] text-[#0b4d54] text-center w-full py-4">Mode de paiement</h1>
        <div className="flex justify-center items-start gap-8 lg:flex-row flex-col">
           <PaymentForm user={JSON.stringify(user)} shipping={JSON.stringify(shipping)} result={JSON.stringify(result)} />
        </div>
    </div>
  )
}

export default PaymentPage