/* eslint-disable react/no-unescaped-entities */

import Message from "@/components/Message";
import ProfileMobileTabs from "@/components/ProfileMobileTabs"
import ProfileTable from "@/components/ProfileTable"
import { getUserById } from "@/lib/actions/cart.actions";
import { getMyOrders } from "@/lib/actions/orders.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


const CustomerOrders = async() => {
  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
   const result = await getMyOrders({userId:user.user._id})
   console.log('ORDERS ARE HERE', result)
  
 
  return ( 
    <div className="w-full h-full bg-slate-50 ">
       
        <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 md:!py-10 ">
            <ProfileTable />
            <ProfileMobileTabs user={user} />

             <div className="flex flex-1 flex-col gap-2 lg:mx-0 mx-2">
                {result.length === 0 ? (
                 <Message variant="danger">
                   vous n'avez jamais encore commande
                 </Message>
                ): (
                    result.map((order:any )=> (
                        <div className="border border-gray-400 flex flex-col  rounded-[20px]  " key={order._id}>
                             <div className="flex items-center justify-between w-full gap-x-8 bg-[rgb(211,211,211)] rounded-tr-[20px] rounded-tl-[20px]  p-2 ">
                                <p className="lg:text-sm text-[12px] font-normal text-[#555] whitespace-nowrap lg:block hidden ">N° {order._id} </p>
                                <div className=" flex flex-row w-full  items-center justify-between">
                                    <div className="flex lg:flex-row flex-1 justify-between flex-col">
                                    <p className="font-extrabold text-[#4c4c4c] text-base text-[14px] ">Effectuée le  {order.createdAt ? order.createdAt.toISOString().substring(0, 10) : ""}</p>
                                    <p className="font-normal text-sm lg:hidden block  ">Total: {(order?.itemsPrice).toFixed(2)} Dh </p>
                                    </div>
                                   {/* btn */}
                                     <div className="flex items-center gap-4">
                                        <p className="font-normal text-sm lg:block hidden  ">Total: {(order?.itemsPrice).toFixed(2)} Dh </p>
                                        <Link href={`/sales/history/view/order_id/${order._id}`}>
                                           <button className="px-4 py-1.5 rounded-[15px] whitespace-nowrap text-white font-bold text-base bg-[#00afaa]  ">Detail</button>
                                        </Link>
                                     </div>
                                </div>
                             </div>
                             
                             <div>
                                  {order.orderItems.map((x:any,index:number) => {
                                   
                                     return (
                                      <div className="flex border-b border-[#ddd]  justify-between items-center gap-x-2 " key={index}> 
                                      <div className="lg:w-[110px]  lg:h-[110px] w-[170px] h-[80px] 
                                        border border-[#efefef] rounded-md flex items-center justify-center m-3">
                                            <Image
                                              className="w-full h-full object-contain "
                                              alt={x?.product?.name}
                                              width={100} height={100}
                                              src={x?.product?.images[0]}
                           
                                            />
                                                   
                                            </div>
                                            <div className="flex lg:flex-row flex-col">
                                            <div className="flex lg:flex-row flex-col lg:items-center w-full flex-1 lg:gap-4">
                                                      <p className="line-clamp-2 font-medium text-[#555] text-[15px]">
                                                 {x.name}
                                               </p>
                                               <p className="font-normal text-sm text-gray-500">
                                               Vendu par {x?.product?.brand}
                                                 </p>
                                                      </div>
                                                      <p className="text-gray-500 text-sm font-normal ">Qté: {x?.quantity} </p>
                                            </div>
                                                      
                                                      <div className="flex flex-col justify-end items-center space-y-1 mr-3">
                                                            <Link href={`/sales/history/view//order_id/${order._id}`}>
                                                                  <button className="px-3 py-1 rounded-[15px] text-[#00afaa]  font-bold text-base bg-transparent border border-[#00afaa] whitespace-nowrap  ">suivi coolis</button>
                                                               </Link>
                                                               {order.isPaid ? (
                                                                  <div className="bg-[#0aafaa] p-1 w-[100px] flex items-center justify-center rounded-[20px] ">
                                                                       <p className="text-white font-bold text-sm ">Paid</p>
                                                                   </div>
                                                               ): (
                                                                   <div className="bg-yellow-500 p-1 w-[100px] flex items-center justify-center rounded-[20px] ">
                                                                       <p className="text-white font-bold text-sm ">En attente</p>
                                                                   </div>
                                                               )}
                                                               <p className="text-[#4c4c4c] font-bold leading-[1.6] text-[1.1rem] ">
                                                                    {x?.quantity * x?.price} Dh
                                                               </p>
                                                      </div>
                                                             </div>
                                     )
                                  })}
                             </div>
                        </div>
                )
        
                ))}
             </div>
        </div>
    </div>
  )
}

export default CustomerOrders