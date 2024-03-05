import OrderModel from "@/database/models/orderModel";
import { connectToDatabase } from "@/database/mongodb";
import { NextResponse } from "next/server";

export const GET = async(req:Request)=> {
    try {
      const { orderId } = await req.json();
      await connectToDatabase();
  
      const order = await OrderModel.findById(orderId)
        .populate('userId', 'name email')
        .populate({
            path: 'orderItems.product',
            model:"Product"
        })
  
      console.log('Order:', order);
  
      return NextResponse.json({order: order})
    } catch (error) {
      console.log(error);
      throw error;
    }
   }