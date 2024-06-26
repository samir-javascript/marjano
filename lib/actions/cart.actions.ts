"use server"
import Cart from "@/database/models/cartModel";
import { connectToDatabase } from "@/database/mongodb";
import { ClearCartParams, GetTotalCartCount, GetUserByIdParams, GetUserCart } from "@/utils/shared";
import User from "@/database/models/userModel";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
export async function getUserById(params:GetUserByIdParams) {
  try {
     const { clerkId } = params;
     const user = await User.findOne({clerkId: clerkId})
     return{ user};
  } catch (error) {
    console.log(error)
    throw error;
  }
}
export async function getUserCart(params:GetUserCart) {
   try {
      const { userId } = params;
      const cart = await Cart.findOne({userId:userId})
      .populate('cartItems.productId')
      
      
      return { cart }
   } catch (error) {
     console.log(error)
     throw error;
   }
}
export async function getCartTotalCount(params:GetTotalCartCount) {
   try {
      const { userId } = params;
      await connectToDatabase()
      const cart = await Cart.aggregate([
        {$match: {userId: new mongoose.Types.ObjectId(userId)}},
        {$unwind: "$cartItems"},
        {$group: {
          _id: "$_id",
          totalQuantity: {$sum: "$cartItems.quantity"}
        }}

      ])
     if(cart.length) {
      return  cart[0].totalQuantity
     }else {
      return 0;
     }
     
   } catch (error) {
     console.log(error)
     throw error;
   }
}
export async function clearCart(params:ClearCartParams) {
   try {
     const { userId , path } = params;
     await connectToDatabase()
    const cart = await Cart.findOne({userId}) 
      if(cart) {
         await Cart.findByIdAndDelete(cart._id)
      }else {
        throw new Error('Cart not found')
      }
     revalidatePath(path)

   } catch (error) {
      console.log(error)
      throw error
   }
}