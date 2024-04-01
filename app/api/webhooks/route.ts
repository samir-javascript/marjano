import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/database/mongodb'
import OrderModel from '@/database/models/orderModel'
import Stripe from 'stripe'

import {  clearCart, getUserById, getUserCart } from '@/lib/actions/cart.actions'
import ProductModel from '@/database/models/productModel'
import Cart from '@/database/models/cartModel'
if(!process.env.STRIPE_SECRET_KEY) {
   throw new Error('Stripe api key missing')
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16"
})
export const POST = async(req:Request)=> {
  await connectToDatabase()
 
    
   
   try {
    const data = await req.text()
      const signature = req.headers.get("stripe-signature")!
      let event
     event = await stripe.webhooks.constructEvent(data, signature, process.env.STRIPE_WEBHOOK_SECRET!)
     if(event.type === 'checkout.session.completed') {
       const stripeSession =  event.data.object as {
        customer: string,
        payment_intent: string;
        amount_subtotal: number;
        customer_details: any;
        payment_status: string
       }
      const customer = await stripe.customers.retrieve(stripeSession.customer) as unknown as {
        metadata:  {
            userId: string,
            cartId: string,
            clerkId: string;
            type: "checkout"
        }
      }  
      // 'user_2dDnr48jjPWmrAHupwLvt6vrIhj'
      const user = await getUserById({ clerkId: customer.metadata.clerkId });
      console.log('USER FROM WEBHOOKS API ', user)
      const result = await getUserCart({
          userId: user?.user?._id,
        });
        console.log('RESULT CART ITEMS FROM WEBHOOKS API', result)
      const { type , userId, cartId } = customer.metadata 
      if(type === "checkout") {
          await OrderModel.create({
            userId: user.user._id,
            paymentMethode: 'Stripe',
            paymentIntent: stripeSession.payment_intent,
            stripeCustomerId: stripeSession.customer,
            totalAmount: stripeSession.amount_subtotal / 100 >= 400 ? stripeSession.amount_subtotal / 100 + 0 : stripeSession.amount_subtotal / 100 + 30 ,
            shippingPrice: stripeSession.amount_subtotal / 100 >= 400 ? 0 : 30,
            itemsPrice: stripeSession.amount_subtotal / 100,
            isPaid: true,
            shippingDetails: {
                address: stripeSession.customer_details.address,
                email: stripeSession.customer_details.email,
                name: stripeSession.customer_details.name,
            },
            paymentStatus: stripeSession.payment_status,
            deliveryStatus: 'ordered',
            orderItems: result.cart.cartItems.map((order:any)=> ({
                ...order,
                _id: undefined,
                product: order.productId._id,
            }))
          })
          console.log('PLEASE DELETE DATA CART NOW FOR ME')
        //  const updateProductPromises = result?.cart.cartItems.map(async(product:any)=> {
        //     return await ProductModel.findByIdAndUpdate(product.productId._id, { $inc: { quantity: -product.quantity}})

        //   })
        //   await Promise.all(updateProductPromises)
         await clearCart({userId: user?.user?._id,path:"/success"})
      }
     }
   } catch (error) {
    console.error(error)
    throw error;
    
   }
 
   
   return NextResponse.json({message:"Order compeleted"})
}