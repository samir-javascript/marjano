/* eslint-disable react/no-unescaped-entities */
import ProfileMobileTabs from "@/components/ProfileMobileTabs"
import ProfileTable from "@/components/ProfileTable"
import EditShippingForm from "@/components/forms/EditShippingForm"
import { getUserById } from "@/lib/actions/cart.actions"
import { getShipping } from "@/lib/actions/shipping.actions"
import { auth } from "@clerk/nextjs"
import { MdOutlinePlace } from "react-icons/md"

const ShippingEdit = async() => {
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
 
  const shipping = await getShipping({userId: user?.user?._id})
    return (
      
        <div className="w-full h-full bg-slate-50">
        <div  className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 lg:py-5">
             
       
           <ProfileTable />
            <ProfileMobileTabs user={user} />
          <div className="flex flex-col flex-1 max-w-[1000px] mx-auto ">
              
               <div className="w-full bg-white shadow-md mx-auto  flex-col flex rounded-md p-3">
                    <h3 className="font-extrabold text-[20px] text-black  tracking-[0.5px] ">
                        1 - modifier l'adresse de facturation</h3>
                    <div className="flex flex-col pt-4">
                        <div className="flex items-center">
                           <p className="font-bold text-[25px] text-black ">Your delivery details</p>
                           <div className="flex">
                           <MdOutlinePlace size={40} className="text-yellow-500 " />
                           <MdOutlinePlace size={40} className="text-green-500" />
                           </div>
                           
                        </div>
                     
                      <EditShippingForm user={JSON.stringify(user)} type={"shipping"} shipping={JSON.stringify(shipping)} />
                    </div>
               </div>
          </div>
          </div>
        </div>
      
  )
}

export default ShippingEdit