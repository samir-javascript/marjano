
import Link from "next/link";
import Authority from '../../../components/Authority'
import { getUserById, getUserCart } from "@/lib/actions/cart.actions";
import { auth } from "@clerk/nextjs";
import UpdateCalculator from "@/components/UpdateCalculator";
import Image from "next/image";
import { getShipping } from "@/lib/actions/shipping.actions";

const Cart = async() => {
 

  const { userId } = auth()
  const user = await getUserById({clerkId:userId!})
  const result =  await getUserCart({
    userId: user.user._id
  })
  const shipping = await getShipping({userId: user?.user?._id})

  return (
    <div className="w-full bg-white py-4">
       
      <div className="max-w-[1400px] mx-auto  ">
        <h2 className="text-[#000] font-extrabold mb-5 text-[35px] pt-3 px-2 ">
          mon panier
        </h2>
        {result.cart.cartItems.length === 0 ? (
           <div className="max-w-[1400px] mx-auto min-h-full pb-[200px] ">
            <div className="flex flex-col gap-y-2 mx-3">
            <p>Aucun article dans votre panier.</p>
              <p>Cliquer <Link className="underline text-[#00afaa] "
               href='/'>ici</Link> pour continuer vos achats.</p>
            </div>
              
           </div>
            /* md:items-start md:justify-start items-center justify-center */
        ) :  (
          <div className="flex lg:flex-row flex-wrap 
           flex-col ">
          <div className="flex-1 w-full bg-[#efefef] sm:p-5 p-2  flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[#333] font-bold text-[20px]  sm:mx-2 ">
                Expedié depuis le Maroc
              </h3>
              <p className="font-bold text-base ">
                {result.cart.cartItems.reduce((acc:any, item:any) => acc + item.quantity, 0)} produits
              </p>
            </div>
            <div className="flex flex-col gap-[15px] ">
            {result.cart.cartItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border p-2
                   border-[#ddd] flex flex-wrap items-center justify-between "
                >
                  <div className="w-[120px] h-[120px] bg-[#efefef]
                   rounded-md flex items-center justify-center m-3 mb-1">
                    <Image
                     width={120} height={120} alt={item?.productId?.name}
                      className="w-[100%] h-[100%] object-contain "
                      
                      src={item?.productId?.images[0]}
                    />
                  </div>
                  <div className="flex-1 flex-col justify-between w-full h-full">
                    <p className="line-clamp-1 font-medium text-[#555] text-[15px] lg:mb-4">
                      {item?.productId?.name}
                    </p>
                    <div className="flex flex-col">
                      <p className="font-normal text-sm text-gray-500">
                        Vernduer Le {item?.productId?.brand}
                      </p>
                      <p className="font-bold text-[16px] text-[#222]  ">
                        Livraison entre le lundi 29 janvier 2024 et le jeudi 1
                        février 2024
                      </p>
                    </div>
                  </div>
                <UpdateCalculator user={JSON.stringify(user)} item={JSON.stringify(item)}  /> 
               
                 
                </div>
              ))}
            </div>
          </div>
          {/** part 2 or col 2 */}
          <div className="flex flex-col lg:w-auto w-full mx-3">
            <div className="flex flex-col gap-5 bg-white border border-[#ddd] rounded-lg
             lg:w-[450px] w-full px-5 py-8 ">
              <div className="flex items-center justify-between border-b border-[#ddd] pb-4">
                <p className="font-normal text-[18px] text-[#333] ">
                  Total produits
                </p>
                <p className="font-normal text-[18px]  text-[#333] ">
                  {result?.cart?.cartItems.reduce((acc:any, item:any) => acc + item?.quantity, 0)} produits
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-[#ddd] pb-4">
                <p className="font-extrabold text-[13px] text-[#333] ">
                  Sous-total
                </p>
                <p className="font-extrabold text-[13px]  text-[#333] ">
                  {result?.cart?.cartItems.reduce(
                    (acc:any, item:any) => acc + item?.quantity * item?.productId?.price,
                    0
                  ).toFixed(2)}{" "}
                  Dh{" "}
                </p>
           
              </div>
              <div className="flex items-center justify-between pb-4">
                <p className="font-medium text-[20px] text-[#00afaa] uppercase">
                  Total
                </p>
                <p className="font-extrabold text-[20px]  text-[#00afaa] ">
                  {result.cart.cartItems.reduce(
                    (acc:any, item:any) => acc + item?.quantity * item?.productId?.price,
                    0
                  ).toFixed(2)}{" "}
                  Dh{" "}
                </p>
              </div>
            </div>
            <Link href={shipping ? '/user-shipping' : '/shipping'} className="flex items-center justify-center mt-3" >
              <button   className="bg-[#00afaa]  lg:mx-0 mx-3 text-white font-bold lg:w-[420px]
               w-full h-[50px] rounded-[20px] ">
                valider mon panier
              </button>
            </Link>


           <Authority />
          </div>
        
        </div>
        )}
      
      </div>
     
    </div>
  );
};

export default Cart;
