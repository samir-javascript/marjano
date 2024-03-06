
import OrderModel from "@/database/models/orderModel";
import { connectToDatabase } from "@/database/mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
   try {
      const { path, orderItems, shippingAddress, shippingPrice,
         paymentMethode, totalPrice, userId, itemsPrice} = await req.json()
         await connectToDatabase()
     const order = new OrderModel({
          shippingAddress,
          shippingPrice,
          itemsPrice,
          paymentMethode,
          userId,
          totalPrice,
          orderItems: orderItems.map((order:any)=> ({

             ...order,
             product: order.productId._id,
              _id: undefined
          }))
         
      })
      console.log('ORDER ITEMS HERE', orderItems)
      const createdOrder = await order.save()
      revalidatePath(path)
      return NextResponse.json({createdOrder, orderId: createdOrder._id})
   } catch (error) {
      console.log(error)
      throw error;
   }
}
