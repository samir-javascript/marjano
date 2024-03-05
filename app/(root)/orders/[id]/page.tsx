
import CheckoutHeader from "@/components/CheckoutHeader";
import { getOrderById } from "@/lib/actions/orders.actions";
import Image from "next/image";
import Link from "next/link";

interface props {
  params: {
     id: string
  }
}

const Page = async({params}:props) => {
   const result = await getOrderById({orderId:params.id})
  //const order = myOrders?.filter((item) => item.paymentMethod === 'cash-on-delivery');
  const truncate = (string:string, n:number) => {
    return string.length > n ? string.substring(0, n) + '...' : string;
  };

  return (
    <div className="w-full">
      
      <CheckoutHeader />
      <div className="max-w-[1400px] mx-auto flex flex-col lg:justify-center lg:items-center ">

      
      <div className="flex flex-col  w-full justify-center items-center text-center pt-4">
        <h2 className="font-medium text-[30px] text-[#0b4d54] ">Merci pour votre commande</h2>
        <p className="sm:max-w-[600px] max-w-[300px] mt-2 font-normal text-base text-[#333] ">
          Vous allez recevoir un email de confirmation comprenant le numéro de commande, les liens de suivi et le détail de votre commande
        </p>
      </div>
      <div className="flex flex-col justify-center items-center  max-w-[1000px] lg:mx-auto mx-2">
      <div className="flex flex-wrap items-start justify-start gap-8  mt-3 ">
       
       <div className="flex flex-col lg:w-[450px] w-full  rounded-lg border border-gray-500 " key={result._id}>
         <div className="p-3 bg-[#ddd]">
           <div className="flex items-center gap-4">
             <p className="text-black font-bold text-base capitalize ">commande</p>
             <Link className="underline font-bold text-base text-[#00afaa]" href={'/'}>
               {result._id}
             </Link>
           </div>
           <div className="flex items-start gap-4 mt-2">
             <p className="text-black font-bold text-base  ">Livrée à</p>
             <div className="flex flex-col ml-5">
               <p className="text-sm font-normal text-[#333] ">
                 Mr. {result.userId.name} 
               </p>
               <p className="text-sm font-normal text-[#333] ">
                 {result.shippingAddress.city}, {result.shippingAddress.address}
               </p>
               <p className="text-sm font-normal text-[#333] ">
                 <span className="uppercase">{result.shippingAddress.city}</span> , {result.shippingAddress.postalCode} {result.shippingAddress.country}
               </p>
               <p className="text-sm font-normal text-[#333] ">{result.shippingAddress.phoneNumber}</p>
             </div>
           </div>
         </div>
         <div>
             {result.orderItems.map((x:any,i:number)=> (
               <div  className="flex  items-center h-auto gap-x-4 border-b pb-2 border-[#efefef] " key={i}>
              <div className="w-[110px]  h-[110px] border border-[#efefef] rounded-md flex items-center justify-center m-3 mb-1">
                 <Image 
                 loading="lazy"
                   className="w-[100%] h-[100%] object-contain "
                   width={100} 
                   alt=''
                   height={100}
                   src={""}

                 />
                
                 </div>
                  <div className="flex-1 flex flex-col justify-between items-start">
                     <p className=" text-sm font-semibold text-[#333] py-2 ">{truncate(x.name,40)} </p>
                     <div>
                         <p className="text-gray-500 text-sm font-normal ">vendu par {x?.product?.brand} </p>
                         <p className="text-gray-500 text-sm font-normal ">Qté: {x.quantity} </p>
                         <h4 className="text-[#4c4c4c] font-bold leading-[1.6] text-[1.1rem] ">{x.price} Dh </h4>
                     </div>
                   

                  </div>
               
               </div>
               
             ))}
         </div>
        
       </div>
      
   </div>
      <Link className="bg-[#00afaa] flex items-center justify-center
       whitespace-nowrap mb-5 flex-1 lg:w-[250px] w-[60%]
        text-white font-bold text-[16px] py-2.5 px-4 mt-3 rounded-[20px] " href='/'> 
          <button type="button" >
               Retour aux achats
          </button>
      </Link>
      </div>
    
      <div>
         
      </div>
     
        
      </div>
  
    </div>
  );
};

export default Page;