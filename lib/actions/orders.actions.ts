"use server"
import OrderModel from "@/database/models/orderModel";
import ProductModel from "@/database/models/productModel";
import { connectToDatabase } from "@/database/mongodb";
import { GetOrderByIdParams } from "@/utils/shared";
import mongoose from "mongoose";

export async function getAllOrders() {
    try {
        await connectToDatabase()
        const orders = await OrderModel.find({}).populate('userId', 'email name')
        .populate('orderItems.product')
       return orders 
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
       .populate("userId", "name email")
       .populate("orderItems.product"); // Populate the product information
 
     return order;
   } catch (error) {
     console.log(error);
     throw error;
   }
 }
 
 
 