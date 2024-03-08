/* eslint-disable react/no-unescaped-entities */
import Message from "@/components/Message";
import OrderCols from "@/components/OrderCols";
import ProfileMobileTabs from "@/components/ProfileMobileTabs";
import ProfileTable from "@/components/ProfileTable";
import { getUserById } from "@/lib/actions/cart.actions";
import { getMyOrders } from "@/lib/actions/orders.actions";
import { getShipping } from "@/lib/actions/shipping.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { Table } from "react-bootstrap";

const ProfilePage = async() => {
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
 
  const shipping = await getShipping({userId: user?.user?._id})
 
 
 const result = await getMyOrders({userId:user?.user?._id})
 
 
  return (
    <div className='w-full  bg-slate-50'>
  
   
    <div className="max-w-[1400px] lg:mx-auto lg:py-5  py-2  flex lg:flex-row flex-col gap-4 justify-start items-start w-full mx-[20px]">
        <ProfileTable  />
       <ProfileMobileTabs user={user} />
      <div className='flex flex-col flex-1 max-w-[1000px]'>
      <h2 className="text-[#333] font-extrabold text-[20px] mb-5 !mx-[20px]">Informations du compte</h2>
        <div className='flex lg:flex-row flex-col lg:items-start gap-4 
         w-full border-b border-[#ddd] pb-5'>
          <div>
         
          <div className='flex flex-col'>
         
            <p className="text-[#333] font-bold text-[14px]  !mx-[25px] mb-2">Informations de contact</p>
            <div className='flex flex-col mx-[20px] '>
              <span className='text-gray-500 font-normal text-[13px] '>
                
                Mr {user?.user?.name}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {user?.user?.email}
              </span>
            </div>
            <Link className='mx-[20px] text-[15px] capitalize font-semibold mt-1 text-[#00afaa] underline' 
            href='/customer/account/edit'>
              modifier
            </Link>
          </div>
          </div>
          <div className='flex flex-col mx-[20px] '>
            <p className="text-[#333] font-bold text-[14px]  mb-2">Mes communications</p>
            <span className='text-gray-500 font-normal text-[13px] '>
              Vous êtes abonné à nos <br className="sm:block hidden" /> communications email et/ou SMS
            </span>
          </div>
        </div>
     <div className="pt-4">

     <h2 className="text-[#333] font-extrabold text-[20px] mx-[20px] mb-5">Carnet d’adresses</h2>
        <div className='flex lg:flex-row flex-col lg:items-start gap-4  w-full pb-4 border-b border-[#ddd]'>
          <div className='flex flex-col mx-[20px]'>
           
            <p className="text-[#333] font-bold text-[14px]  mb-2">Adresse de facturation par défaut</p>
            <div className='flex flex-col  '>
            {!shipping || shipping === null || Object.keys(shipping).length === 0 ? (
               <>
               <span className='text-gray-500 font-normal text-[13px] '>
                 Vous n'avez pas specifie d'address de facturation par default
             </span>
          
             <Link className=' text-[15px] capitalize font-semibold mt-1 text-[#00afaa] underline'
              href='/customer/shipping/addition'>
                 Modifier l’adresse
             </Link>
             </>
             ) : (
                <>
               <span className='text-gray-500 font-normal text-[13px] '>
                Mr {user?.user?.name} 
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                 {shipping?.address}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {shipping?.city} , {shipping?.postalCode} {shipping?.country}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {shipping?.phoneNumber}
              </span>
              {/* ... (Additional address details) */}
              <Link className=' text-[15px] capitalize font-semibold mt-1 text-[#00afaa]
               underline'
                href={shipping ? `/customer/profile/shipping/${shipping?.user}/edit` : '/customer/shipping/addition'}>
                 Modifier l’adresse
              </Link>
              </>
              )}
              
            </div>
          </div>
          <div className='flex flex-col mx-[20px] '>
            <p className="text-[#333] font-bold text-[14px]  mb-2">Adresse de livraison par défaut</p>
            {!shipping || Object.keys(shipping).length === 0 ? (
               <>
               <span className='text-gray-500 font-normal text-[13px] '>
                 Vous n'avez pas specifie d'address de livraison par default
             </span>
          
             <Link className=' text-[15px] capitalize font-semibold mt-1
              text-[#00afaa] underline' href={shipping ? `/customer/profile/shipping/${shipping?.user}/edit` : '/customer/shipping/addition'}>
                 Modifier l’adresse
             </Link>
             </>
            ): (
              <>
              <span className='text-gray-500 font-normal text-[13px] '>
                Mr {user?.user?.name} 
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                 {shipping?.address}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {shipping?.city} , {shipping?.postalCode} {shipping?.country}
              </span>
              <span className='text-gray-500 font-normal text-[13px] '>
                {shipping?.phoneNumber}
              </span>
         
            <Link href={`/customer/profile/shipping/${shipping?.user}/edit`}  className=' text-[15px] capitalize font-semibold mt-1 text-[#00afaa]
             underline' >
              Modifier l’adresse
            </Link>
            </>
            )}
           
          </div>
        </div>
        </div>
        {/** Orders table */}
       {result.orders.length === 0 ? (
        <>
         <h2 className="text-[#333] font-extrabold text-[20px] my-3 mx-[20px]">Commandes récentes </h2>
           <Message variant="danger">
               vous n'avez jamais encore commandé
           </Message>
           </>
       ): (
          
      <>
        <h2 className="text-[#333] font-extrabold text-[20px] my-3 mx-[20px]">Commandes récentes </h2>
        <div  className="lg:block hidden">

        
        <Table responsive striped hover className='table-sm mx-[20px] '>
      
          <thead>
            <tr>
              <th className='text-[16px] font-bold text-[#333] whitespace-nowrap'>Commande #</th>
              <th className='text-[16px] font-bold text-[#333] whitespace-nowrap'>Date</th>
              <th className='text-[16px] font-bold text-[#333] whitespace-nowrap'>Expédié à</th>
              <th className='text-[16px] font-bold text-[#333] whitespace-nowrap'>Total de la commande</th>
              <th className='text-[16px] font-bold text-[#333] whitespace-nowrap'>Action</th>
            </tr>
          </thead>
          <tbody>
            {result.orders.map((order:any) => (
    <tr key={order._id}>
    <td className='text-[14px] text-gray-500 font-medium whitespace-nowrap'>
      {order._id}
    </td>
    <td className='text-[14px] text-gray-500 font-medium whitespace-nowrap'>
      20/21/2024
    </td>
    <td className='text-[14px] text-gray-500 font-medium whitespace-nowrap'>
      Mr {user?.user?.name} 
    </td>
    <td className='text-[14px] text-gray-500 font-medium whitespace-nowrap'>
      {order.itemsPrice} Dh
    </td>
    <td className='text-[14px] text-gray-500 font-medium whitespace-nowrap'>
      
          <Link href={`/sales/history/view/order_id/${order._id}`} className='text-[#00afaa] hover:underline text-[16px] '>
          Voir commande
        </Link>
     
       
      
     
    </td>
  </tr>
            ))}
        
          </tbody>
        </Table>
        </div>
        </>
         )}
        <OrderCols  firstLine='Commande #'
           secondLine='Date' 
           thirdLine='Expédié à'
            fourthLine='Total de la commande'
            fifthLine='action'
              isLoading={false}
             user={user}
              orders={result.orders}  />
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;