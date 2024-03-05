import CommandeInfoMobile from "@/components/CommandeInfoMobile";
import ProfileMobileTabs from "@/components/ProfileMobileTabs";
import ProfileTable from "@/components/ProfileTable";
import { getUserById } from "@/lib/actions/cart.actions";
import { getOrderById } from "@/lib/actions/orders.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

interface props {
  params: {
    id: string
  }
}
const OrderDetails = async({params}:props) => {
  // Fetching order details based on the id from the URL params
  const {userId} = auth()
  const result = await getOrderById({orderId:params.id})
  const user = await getUserById({clerkId:userId!})
  // Display loading message while data is being fetched
 
  const truncate = (string:string, n:number) => {
    return string.length > n ? string.substring(0, n) + '...' : string;
  };
  return (
    <div className="w-full h-full bg-slate-50">
      
      <div className="max-w-[1400px] mx-auto flex lg:flex-row flex-col lg:justify-start gap-4 py-5">
        <ProfileTable />
        <ProfileMobileTabs />
        <div className="flex flex-col flex-1 ">
          {/* Link to navigate back to sales history */}
          <Link href='/sales/history' className="flex items-center lg:mx-0 mx-2 space-x-10">
            <FaChevronLeft  color='#00afaa' size={14} />
            <p className="text-base underline text-[#00afaa] font-bold">Retour aux commandes</p>
          </Link>
          <div className="mt-2">
            {/* Displaying order number */}
            <p className="lg:text-[2rem] text-[16px] lg:mx-0 mx-2 text-black font-extrabold  ">Commande N°{result._id} </p>
          </div>
          <div className="rounded-[10px] bg-[rgb(211,211,211)] p-2 mt-8 mx-2">
              <p className="text-[#4c4c4c] font-bold text-base ml-3 ">Effectuée le 10/25/2024 </p>
          </div>
          <div className="lg:hidden flex items-center justify-between mx-2 mt-3">
          <p className="text-red-500  lg:text-[12px] text-[11px] lg:text-right font-semibold ">Livraison entre le samedi 3 février 2024 et le lundi 5 février 2024</p>
          {result.isPaid ? (
                  <div className="bg-[#0aafaa] p-1 w-[100px] flex items-center justify-center rounded-[20px] ">
                    <p className="text-white font-bold text-sm ">Paid</p>
                  </div>
                ) : (
                  <div className="bg-yellow-500 p-1 lg:w-[100px] whitespace-nowrap flex items-center justify-center rounded-[20px] ">
                    <p className="text-white font-bold text-sm ">En attente</p>
                  </div>
                )}
          </div>
          {result.orderItems.map((x:any, i:number) => (
            <div className="flex w-full items-center h-auto gap-x-4 border-b pb-2 border-[#efefef]" key={i}>
              <div className='w-[110px]  h-[110px]  border border-[#efefef] rounded-md flex items-center justify-center m-3'>
                 <Image
                 loading="lazy"
                   className="w-full h-full object-contain  "
                  width={100}
                  height={100}
                   src=""
                    alt=''
                 />
                        
                 </div>
              <div className="flex-1 flex flex-col justify-between items-start">
                {/* Displaying product details */}
                <p className=" text-sm font-semibold text-[#333] py-2 lg:mr-0 mr-2 ">{truncate(x.name,37)} </p>
                <div>
                  <p className="text-gray-500 text-sm font-normal ">vendu par {x.product.brand} </p>
                  <p className="text-gray-500 text-sm font-normal ">Qté: {x.quantity} </p>
                </div>
              </div>
              <div className="lg:flex hidden flex-col justify-end  items-end space-y-1 mr-3">
                {/* Displaying delivery information */}
                <p className="text-red-500 text-[12px] text-right font-semibold ">Livraison entre le samedi 3 février 2024 et le lundi 5 février 2024</p>
                {/* Displaying payment status */}
                {result.isPaid ? (
                  <div className="bg-[#0aafaa] p-1 w-[100px] flex items-center justify-center rounded-[20px] ">
                    <p className="text-white font-bold text-sm ">Paid</p>
                  </div>
                ) : (
                  <div className="bg-yellow-500 p-1 w-[100px] flex items-center justify-center rounded-[20px] ">
                    <p className="text-white font-bold text-sm ">En attente</p>
                  </div>
                )}
                {/* Displaying product price */}
                <h4 className="text-[#4c4c4c] font-bold leading-[1.6] text-[1.1rem] ">{x.price} Dh </h4>
              </div>
            </div>
          ))}
          { /** order sub total */}
          <div className="w-full border  border-[#ddd] flex flex-col px-3 py-4 mx-auto  rounded-[20px] mt-5 ">
            <div className="flex flex-col border-b border-[#ddd] pb-3 ">
            <div className="flex items-center justify-between">
                   <p className="font-bold text-[#4c4c4c] text-sm  ">Sous total produits</p>
                   <p className="font-bold text-[#4c4c4c] text-sm  ">{(result.orderItems.reduce((acc:any,item:any)=> acc + item.quantity * item.price, 0)).toFixed(2)} Dh </p>
              </div>
              <div className="flex items-center justify-between">
                   <p className="font-normal text-[#4c4c4c] text-sm  ">Frais de livraison</p>
                   <p className="font-normal text-[#4c4c4c] text-sm  ">{result.shippingPrice}.00 Dh </p>
              </div>
            </div>
              
            <div className="flex items-center justify-between pt-2">
                   <p className="font-bold uppercase text-[#00afaa] text-xl  ">Total</p>
                   <p className="font-bold text-[#00afaa] text-2xl  ">{(result.itemsPrice).toFixed(2)} Dh </p>
              </div>
          </div>

          {/* order info start */}
          <div className="lg:flex hidden flex-col space-y-3 mt-5">
               <h3 className="font-extrabold text-base text-[#4c4c4c]  mb-4 ">Informations de la commande</h3>
               <div className="flex justify-between">
                    <div  className="flex flex-col ">
                        <h4 className="font-bold text-[#4c4c4c] text-[15px] mb-2 ">Adresse de livraison</h4>
                        <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5 ">Mr. {result.shippingAddress.firstName} {result.shippingAddress.lastName} </p>
                        <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5 ">{result.shippingAddress.city}, {result.shippingAddress.address}</p>
                        <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5 "><span className="uppercase">{result.shippingAddress.city}, </span>{result.shippingAddress.postalCode} {result.shippingAddress.country} </p>
                        <p className="font-semibold text-[#00afaa] underline  text-[15px] mb-0.5 ">{result.shippingAddress.phoneNumber} </p>
                    </div>
                    <div  className="flex flex-col ">
                        <h4 className="font-bold text-[#4c4c4c] text-[15px] mb-2 ">Mode de livraison</h4>
                        <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5 ">Standard - Marketplace </p>
                        
                    </div>
                    <div  className="flex flex-col ">
                        <h4 className="font-bold text-[#4c4c4c] text-[15px] mb-2 ">Adresse de facturation</h4>
                        <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5 ">Mr. {result.shippingAddress.firstName} {result.shippingAddress.lastName} </p>
                        <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5 ">{result.shippingAddress.city}, {result.shippingAddress.address}</p>
                        <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5 "><span className="uppercase">{result?.shippingAddress?.city}, </span>{result.shippingAddress.postalCode} {result.shippingAddress.country} </p>
                        <p className="font-semibold text-[#00afaa] underline  text-[15px] mb-0.5 ">{result.shippingAddress.phoneNumber} </p>
                    </div>
                    <div  className="flex flex-col mr-3">
                        <h4 className="font-bold text-[#4c4c4c] text-[15px] mb-2 ">Informations de paiement</h4>
                        <p className="font-normal text-[#4c4c4c] text-[15px] mb-0.5 ">
                            {result.paymentMethode === 'Stripe' ? 'Stripe or cradit card' :'Paiement à la livraison'}

                            
                       </p>
                        
                    </div>
               </div>
          </div>
          {/* order info ends */}
          {/* order info for mobile devices */}
          <div className="lg:hidden flex mt-4">
          <CommandeInfoMobile user={JSON.stringify(user)}  order={JSON.stringify(result)} paymentMethod={result.paymentMethode} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
