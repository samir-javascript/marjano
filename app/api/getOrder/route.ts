import OrderModel from "@/database/models/orderModel";
import ProductModel from "@/database/models/productModel";
import { connectToDatabase } from "@/database/mongodb";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async(req:Request)=> {
    try {
      const { orderId } = await req.json();
      if(!isValidObjectId(orderId)) {
         throw new Error('Invalid Order ID')
      }
      await connectToDatabase();
  
      const order = await OrderModel.findById(orderId)
        .populate('userId', 'name email')
        .populate({
            path: 'orderItems.product',
            model:ProductModel
        })
  
     
        
  
      return NextResponse.json({order: order})
    } catch (error) {
      console.log(error);
      throw error;
    }
   }