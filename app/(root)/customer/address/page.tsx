/* eslint-disable react/no-unescaped-entities */
import AddressCols from "@/components/AddressCols";
import ProfileMobileTabs from "@/components/ProfileMobileTabs";
import ProfileTable from "@/components/ProfileTable";
import { getUserById } from "@/lib/actions/cart.actions";
import { getShipping } from "@/lib/actions/shipping.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Table } from "react-bootstrap";

const CustomerAddressPage = async() => {
    const { userId } = auth()
    const user = await getUserById({clerkId:userId!})
    
    const shipping = await getShipping({userId: user?.user?._id})
 
  return ( 
    <div className="w-full bg-slate-50">
      
      <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 py-5">
        <ProfileTable />
        <ProfileMobileTabs />
      {/*   */}
  <div className="flex-1 flex flex-col"> 
  <h2 className="text-[#333] font-extrabold text-[20px] mb-3 mx-[20px] ">Adresses par défaut</h2>
  
        <div className='flex pb-5  lg:flex-row flex-col  gap-4 justify-between  
         border-b border-[#ddd]'>

          <div className='flex flex-col mx-[20px]'>
         
            <p className="text-[#333] font-bold text-[14px]  mb-2">Adresse de facturation par défaut</p>
            <div className='flex flex-col  '>
            {!shipping || shipping === null || Object.keys(shipping).length === 0 ? (
               <>
               <span className='text-gray-500 font-normal text-[13px] '>
                 Vous n'avez pas specifie d'address de facturation par default
             </span>
          
             <Link className=' text-[15px] mt-1 capitalize font-semibold text-[#00afaa] underline'
              href='/customer/shipping/addition'>
                 Modifier l’adresse de facturation
             </Link>
             </>
             ) : (
                <>
               <span className='text-gray-500 font-normal text-[13px] '>
                Mr {user?.user?.name} 
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                 {shipping.address}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {shipping.city} , {shipping.postalCode} {shipping.country}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {shipping.phoneNumber}
              </span>
              {/* ... (Additional address details) */}
              <Link className=' text-[15px] capitalize font-semibold mt-3 text-[#00afaa]
               underline'
                href={shipping ? `/customer/profile/shipping/${shipping.user}/edit` 
                : '/customer/shipping/addition'}>
                 Modifier l’adresse de facturation
              </Link>
              </>
              )}
              
            </div>
          </div>
          <div className='flex flex-col mx-[20px] lg:mr-[200px] '>
            <p className="text-[#333] font-bold text-[14px]  mb-2">Adresse de livraison par défaut</p>
            {!shipping || Object.keys(shipping).length === 0 ? (
               <>
               <span className='text-gray-500 font-normal text-[13px] '>
                 Vous n'avez pas specifie d'address de livraison par default
             </span>
          
             <Link className=' text-[15px] capitalize font-semibold mt-1
              text-[#00afaa] underline' href={shipping ? 
              `/customer/profile/shipping/${shipping.user}/edit` : '/customer/shipping/addition'}>
                 Modifier l’adresse
             </Link>
             </>
            ): (
              <>
              <span className='text-gray-500 font-normal text-[13px] '>
                Mr {user?.user.name} 
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                 {shipping.address}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {shipping.city} , {shipping.postalCode} {shipping.country}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {shipping.phoneNumber}
              </span>
         
            <Link href={`/customer/profile/shipping/${shipping.user}/edit`}  className=' text-[15px] capitalize font-semibold mt-3 text-[#00afaa]
             underline' >
              Modifier l’adresse de la livraison
            </Link> 
            </>
            )}
           
          </div>
        </div>
 {shipping && (


          <div className="flex-1 flex flex-col pt-3  mx-[20px] ">
             <h2 className="text-[#333] font-extrabold text-[20px] mb-3 lg:mx-[20px] ">Saisies d’adresses supplémentaires</h2>
             <Table bordered hover striped responsive className="table-sm pb-2 max-md:hidden">
                  <thead>
                      <tr>
                          <th className="!font-semibold !text-[#111] text-[17px] whitespace-nowrap ">Nom</th>
                         
                          <th className="!font-semibold !text-[#111] text-[17px] whitespace-nowrap ">Adresse</th>
                          <th className="!font-semibold !text-[#111] text-[17px]  whitespace-nowrap">Ville</th>
                          <th className="!font-semibold !text-[#111] text-[17px]  whitespace-nowrap">Code postal</th>
                          <th className="!font-semibold !text-[#111] text-[17px] whitespace-nowrap">Téléphone</th>
                          <th className="!font-semibold !text-[#111] text-[17px] whitespace-nowrap">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                     <tr>
                          <td className=" text-[#4c4c4c] font-normal text-[14px] whitespace-nowrap ">
                              {user?.user?.name}
                          </td>
                          <td className=" text-[#4c4c4c] font-normal text-[14px] whitespace-nowrap ">
                             {shipping.address}
                          </td>
                          <td className=" text-[#4c4c4c] font-normal text-[14px] whitespace-nowrap ">
                             {shipping.city}
                          </td>
                          <td className=" text-[#4c4c4c] font-normal text-[14px]  whitespace-nowrap">
                             {shipping.postalCode}
                          </td>
                          <td className=" text-[#4c4c4c] font-normal text-[14px] whitespace-nowrap">
                             {shipping.phoneNumber}
                          </td>
                          <td>
                              <div className="flex items-center flex-nowrap">
                                <Link href={`/customer/profile/shipping/${user?.user._id}/edit`}>
                                <button type="button" className="outline-none border-none text-base text-[#0aafaa] font-medium hover:underline ">
                                  Modifier
                                  </button> 
                                </Link>
                                 
                                   <span className="mx-2">| </span>
                                  <button   type="button" className="outline-none border-none text-base text-red-500 font-medium hover:underline ">
                                    Supprimer
                                  </button>
                              </div>
                          </td>

                     </tr>
                  </tbody>
             </Table>
             {shipping && (
                 <AddressCols  user={JSON.stringify(user)} shipping={shipping}  />
             )}
         
             <div className="border-t pt-4">
                <Link href='/customer/address/checkout_address/newShipping'>
                <button  className="w-fit bg-[#0aafaa] text-white font-semibold rounded-[20px]  px-4 py-2 text-base ">
                 Ajouter une novelle address
             </button>
                </Link>
             
             </div>
            
          </div>
           )}
           <div >
          
           </div>
           
        </div>
      </div>
    </div>
  );
  
}

export default CustomerAddressPage
