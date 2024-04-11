/* eslint-disable react/no-unescaped-entities */
"use client"

import Image from "next/image";
import Link from "next/link";
import {  useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { usePathname, useRouter } from "next/navigation";
import { clearCart } from "@/lib/actions/cart.actions";

const PaymentForm = ({shipping,user,result}:any) => {
 
  
   const parsedUser = JSON.parse(user)
   const parsedResult = JSON.parse(result)
   console.log('PARSED RESULT HERE FOR ID', parsedResult)
   const parsedShipping = JSON.parse(shipping)
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethode, setPaymentMethode] = useState('Stripe');
  const router = useRouter();
  const pathname = usePathname();
  const itemsPrice = parsedResult?.cart?.cartItems.reduce((acc:any,item:any)=> acc + item.quantity * item.productId.price, 0).toFixed(2)
  const shippingPrice = parsedResult?.cart?.cartItems.reduce((acc:any,item:any)=> acc + item.quantity * item.productId.price, 0).toFixed(2) >= 400 ? 0 : 30
  const totalPrice = (
    parsedResult?.cart?.cartItems.reduce((acc: any, item: any) => acc + item.quantity * item.productId.price, 0) < 400
      ? parsedResult?.cart?.cartItems.reduce((acc: any, item: any) => acc + item.quantity * item.productId.price, 0) + 30
      : parsedResult?.cart?.cartItems.reduce((acc: any, item: any) => acc + item.quantity * item.productId.price, 0)
  ).toFixed(2);
 

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethode(method);
  };

 
  const createOrder = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/placeOrder', {
        method: 'POST',
        body: JSON.stringify({
          orderItems: parsedResult.cart.cartItems,
          path: pathname,
          userId: parsedUser?.user?._id,
          itemsPrice: itemsPrice,
          totalPrice: totalPrice,
          shippingAddress: parsedShipping,
          shippingPrice: shippingPrice,
          paymentMethode: paymentMethode,
        }),
      });

      if (res.ok) {
        const { orderId } = await res.json();

        await clearCart({
          path: pathname,
          userId: parsedUser?.user?._id,
        });

        router.push(`/orders/${orderId}`);
      } else {
        const { orderId } = await res.json();

        await clearCart({
          path: pathname,
          userId: parsedUser?.user?._id,
        });

        router.push(`/success/${orderId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async()=> {
    setIsLoading(true)
     try {
        const res = await fetch('/api/handleStripeOrder', {
           method: 'POST',
           headers : {
            'Content-Type': 'application/json',
           },
           body: JSON.stringify({cartId: parsedResult?.cart?._id, clerkId: parsedUser?.user?.clerkId}),

        })
        const  {error,url}  = await res.json()
        if(!res.ok) {
          throw error;
        }else {
           window.location.href = url
           console.log(url)
          }
        setIsLoading(false)
     } catch (error) {
        console.log(error)
     }finally {
      setIsLoading(false)
     }
  }

  const handlePayment = async()=> {
    setIsLoading(true)
      try {
          if(paymentMethode === "Stripe")  {
              await handleCheckout()
          }else {
            await createOrder();
          }
       } catch (error) {
        console.error('Error during payment:', error);
        throw error;
      }finally {
         setIsLoading(false)
      }
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="border border-[#ddd]  rounded-lg flex flex-col lg:mx-0 mx-2">
          <div className="flex flex-col border-b border-[#ddd] p-3 ">
            <div className="flex items-center gap-2 mb-1">
              <input
                type='checkbox'
                checked={paymentMethode === 'Stripe'}
                onChange={() => handlePaymentMethodChange('Stripe')}
              />
              <p className="font-bold text-[#00afaa] text-[16px] ">Paiement par carte bancaire</p>
            </div>
            <p className="px-2 text-sm font-normal ">CMI, Payer en toute sécurité avec votre carte bancaire marocaine.</p>
            <Image width={150} height={100} className="w-[150px] object-contain mt-3 mx-2" src={'/images/logo_methods.png'} alt="payments method" />
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2">
              <input
                type='checkbox'
                checked={paymentMethode === 'cash-on-delivery'}
                onChange={() => handlePaymentMethodChange('cash-on-delivery')}
              />
              <p className="font-bold text-[#00afaa] text-[16px] ">Paiement à la livraison</p>
            </div>
            <p className="px-3 mt-1 text-sm font-normal ">Paiement lors de la livraison de votre commande à l’adresse de votre choix</p>
          </div>
        </div>
        <div className="mt-3 flex flex-col w-full">
          <h2 className="text-[#333] font-extrabold  text-[18px] lg:mx-0 mx-2">Adresse de facturation</h2>
          <div className="flex items-start justify-between bg-[#ddd]  lg:mx-0 mx-2 p-3 rounded-xl mt-3">
            <div className="flex flex-col">
              <p className="text-sm text-[#333] font-normal ">Mr. {parsedUser?.user?.name} </p>
              <p className="text-sm text-[#333] font-normal ">{parsedShipping?.address || ''} </p>
              <p className="text-sm text-[#333] font-normal "><span>{parsedShipping?.city}, </span> {parsedShipping?.postalCode} {parsedShipping?.country} </p>
              <p className="text-sm text-[#333] font-normal ">{parsedShipping?.phoneNumber} </p>
            </div>
            <Link className="underline  font-bold text-base text-[#00afaa] " href='/customer/address/checkout_address/newShipping'>
                  Modifier
            </Link>
                     </div>
                </div>
           </div>

           {/* col 2 */}
           <div className="flex flex-col lg:w-auto w-full ">
           <div className="flex flex-col bg-blue-50 rounded-lg lg:w-[300px]  lg:mx-0 mx-2 ">
                <div className="flex justify-between items-center border-b border-[#ddd] p-3">
                      <p className="text-[12px] font-normal text-[#333] ">Total produits</p>
                      <p className="text-[14px] font-semibold text-[#333] ">
                      {parsedResult?.cart?.cartItems.reduce((acc:any, item:any) => acc + item.quantity, 0)} produits </p>
                </div>
                <div className="flex flex-col p-3 space-y-2">
                     <div className="flex items-center justify-between">
                            <p className="text-[14px] font-semibold text-[#333] ">Sous-total</p>
                            <p className="text-[14px] font-semibold text-[#333] ">{parsedResult?.cart?.cartItems.reduce((acc:any,item:any)=> acc + item.quantity * item.productId.price, 0).toFixed(2)} Dh</p>
                     </div>
                     <div className="flex items-center justify-between">
                            <p className="text-[14px] font-semibold text-[#333] ">Frais de livraison</p>
                            <p className="text-[14px] font-semibold text-[#333] ">{parsedResult?.cart?.cartItems.reduce((acc:any,item:any)=> acc + item.quantity * item.productId.price, 0).toFixed(2) >= 400 ? 0 : 30}   Dh</p>
                     </div>
                     <div className="flex items-center justify-between ">
                            <p className="text-[20px] font-extrabold text-[#00afaa]  uppercase ">Total</p>
                            <p className="text-[20px] font-extrabold text-[#00afaa] ">
  {(
    parsedResult?.cart?.cartItems.reduce(
      (acc: any, item: any) => acc + item.quantity * item.productId.price,
      0
    ) < 400
      ? (
          parsedResult?.cart?.cartItems.reduce(
            (acc: any, item: any) => acc + item.quantity * item.productId.price,
            0
          ) + 30
        )
      : (
          parsedResult?.cart?.cartItems.reduce(
            (acc: any, item: any) => acc + item.quantity * item.productId.price,
            0
          )
        )
  ).toFixed(2)} Dh
</p>

                     </div>
                </div>
           </div>
             <Link href=''>
                   <p className="underline max-w-[300px] text-center font-bold text-sm mx-auto 
                   text-[#00afaa] mt-4">J'accepte les conditions générales de ventes</p>
             </Link>
             
                    <button onClick={handlePayment}  disabled={isLoading} className="sm:w-[300px] mx-2 w-auto mt-3 flex
                     items-center justify-center font-bold text-[15px] bg-[#00afaa] text-white rounded-[30px] h-[40px]"  type="button">
                         {isLoading ? <Spinner role='status' animation='border' style={{
                display:'block',
                width:'30px',
                height:'30px',
                margin:'auto',
                color:'#fff'
              }} >
                </Spinner>: 'passer la commande'}
                    </button>
            
           </div>
         
    </>
  )
}

export default PaymentForm