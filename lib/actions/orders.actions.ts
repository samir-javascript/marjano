"use server"
import OrderModel from "@/database/models/orderModel";

import { connectToDatabase } from "@/database/mongodb";
import { GetAllOrdersParams, GetMyOrdersParams, GetOrderByIdParams } from "@/utils/shared";


export async function getAllOrders(params:GetAllOrdersParams) {
 
    try {
      await connectToDatabase()
      const { page } = params;
      const pageSize = 12;
      const skipAmount = pageSize * (page! - 1);
        const count = await OrderModel.countDocuments()
        const orders = await OrderModel.find({}).populate('userId', 'email name')
        .populate('orderItems.product')
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(skipAmount)
       return  { orders, page , pages: Math.ceil(count / pageSize)}
   } catch (error) {
        console.log(error)
        throw error;
   }
}
export async function getOrderById(params:GetOrderByIdParams) {
  try {
    const { orderId } = params;
    await connectToDatabase();

    const order = await OrderModel.findById(orderId)
      .populate('userId', 'name email')
      .populate('orderItems.product')
      

  

    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
 }

 export async function getMyOrders(params:GetMyOrdersParams) {
     try {
        const { userId , page = 1} = params;
        const pageSize = 3;
        const skipAmount = pageSize * (page - 1)
        const count = await OrderModel.countDocuments({userId: userId})
        await connectToDatabase()
        const orders = await OrderModel.find({userId:userId}).populate("orderItems.product")
        .limit(pageSize)
        .skip(skipAmount)
        return {orders, page, pages:Math.ceil(count / pageSize)};
     } catch (error) {
        console.log(error)
        throw error
     }
 }
 

 
 