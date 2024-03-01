"use server"

import ShippingAddress from "@/database/models/shippingModel";
import { connectToDatabase } from "@/database/mongodb";
import { CreateShippingAddressParams, GetUserShippingAddressParams } from "@/utils/shared";
import { revalidatePath } from "next/cache";

export async function createShippingAddress(params:CreateShippingAddressParams) {
    try {
       const { phoneNumber, address, user, city, country, path, postalCode} = params;
       
       await connectToDatabase()
       const userAddress = await ShippingAddress.create({
          user,
          phoneNumber,
          postalCode,
          country,
          address,
          city
       })
       const savedAddress = await userAddress.save()
       revalidatePath(path)
       return {
         savedAddress
       }
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export async function getShipping(params:GetUserShippingAddressParams) {
   try {
      const { userId } = params;
      await connectToDatabase()
      const shipping = await ShippingAddress.findOne({user:userId})
      return shipping;
   } catch (error) {
      console.log(error)
      throw error;
   }
}