import Order from "@/database/models/orderModel";
import { connectToDatabase } from "@/database/mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
export async function POST(req:Request) {
   try {
      const { path, orderItems, shippingAddress, shippingPrice,
         paymentMethod, totalPrice, user, itemsPrice} = await req.json()
         await connectToDatabase()
     const order = new Order({
          shippingAddress,
          shippingPrice,
          itemsPrice,
          paymentMethod,
          user,
          totalPrice,
          orderItems: orderItems.map((order:any)=> ({
             ...order,
              product: order._id,
              _id: undefined
          }))
      })
      const createdOrder = await order.save()
      revalidatePath(path)
      return NextResponse.json({createdOrder, orderId: createdOrder._id})
   } catch (error) {
      console.log(error)
      throw error;
   }
}
