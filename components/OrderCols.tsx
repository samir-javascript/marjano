

import Link from 'next/link'



const OrderCols = ({orders,isLoading, firstLine, secondLine, thirdLine, fourthLine, fifthLine, user}:any) => {
   
 
  if(isLoading) return <p>loading...</p>
  return (


   orders.map((order:any) => (

   <div key={order._id} className="flex flex-col border-b border-[#ddd] pb-3 ">
 <div  className="max-md:flex hidden flex-col gap-4 mx-[20px] mt-4 ">
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">{firstLine}:</strong> {order._id} </p>
        </div>
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">
            {secondLine}:</strong> {order.createdAt.substring(0,10)}</p>
        </div>
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">
            {thirdLine}:</strong>  Mr {user.user.name} </p>
        </div>
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] "><strong className="font-extrabold">{fourthLine}:</strong>  {(order.totalPrice).toFixed(2)} Dh</p>
        </div>
        <div className="flex items-center gap-3">
           <p className="font-medium text-base text-[#333] ">
            <strong className="font-extrabold">{fifthLine}:</strong> 
            <Link className="underline font-bold text-[#00afaa] text-base "
             href={order.paymentMethod === 'PayPal' ? `/order/${order._id}` : `/success/${order._id}`}> 
           Voir la command
           </Link> </p>
        </div>

    </div>
   </div>
   
    ))
  )
}

export default OrderCols