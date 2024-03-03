import ProfileMobileTabs from "@/components/ProfileMobileTabs"
import ProfileTable from "@/components/ProfileTable"
import EditShippingForm from "@/components/forms/EditShippingForm"
import { getUserById } from "@/lib/actions/cart.actions"
import { getShipping } from "@/lib/actions/shipping.actions"
import { auth } from "@clerk/nextjs"


const NouvelleAddressPage = async() => {
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
 
  const shipping = await getShipping({userId: user?.user?._id})
  
  return (
    <div className="w-full bg-slate-50 h-full">
     
    <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 py-5">

   
    <ProfileTable />
        <ProfileMobileTabs />
    
    <div className=" flex  lg:ml-10 flex-col flex-1 pb-8 lg:mx-auto mx-3">
        <div>
             <h2 className=" text-[#00afaa] font-bold text-[30px] mb-3 ">Ajouter une nouvelle address</h2>
             <div className="mt-3 lg:w-[60%] w-[90%] ">
               <EditShippingForm shipping={JSON.stringify(shipping)} user={JSON.stringify(user)} />
             </div>
              
        </div>
    </div>
    </div>
    </div>
  )
}

export default NouvelleAddressPage