"use server"
import Order from "@/database/models/orderModel";
import { connectToDatabase } from "@/database/mongodb";
import { AddOrderItemsParams } from "@/utils/shared";
import { revalidatePath } from "next/cache";
export async function addOrderItems(params:AddOrderItemsParams) {
   try {
      const { orderItems, paymentMethod, shippingAddress, path,
         shippingPrice, userId, totalPrice, itemsPrice} = params;
      await connectToDatabase()
      const order = new Order({
         user: userId,
         paymentMethod,
         shippingAddress,
         shippingPrice,
         totalPrice,
         itemsPrice,
         orderItems: orderItems.map((order)=> ({
            ...order,
            _id: undefined,
            product: order?._id,
         }))
      })
     const createdOrder =  await order.save()
      revalidatePath(path)
      return {
         order: createdOrder
      }
   } catch (error) {
      console.log(error)
      throw error;
   }
}