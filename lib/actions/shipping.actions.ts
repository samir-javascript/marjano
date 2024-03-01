"use server"

import ShippingAddress from "@/database/models/shippingModel";
import { connectToDatabase } from "@/database/mongodb";
import { CreateShippingAddressParams, DeleteShippingAddressParams, EditShippingAddress, GetUserShippingAddressParams } from "@/utils/shared";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

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

export async function editShipping(params:EditShippingAddress) {
     try {
        const  { postalCode, path, userId, phoneNumber, city, country, address} = params;
        await connectToDatabase()
        const shipping = await ShippingAddress.findOne({user:userId})
        if(!shipping) {
           throw new Error('Shipping not found')
        }
        shipping.postalCode = postalCode || shipping.postalCode;
        shipping.address = address || shipping.address;
        shipping.phoneNumber = phoneNumber || shipping.phoneNumber;
        shipping.city = city || shipping.city;
        shipping.country = country  || shipping.country;
        const updatedShippingAddress = await shipping.save()
        revalidatePath(path)
        return {
           shipping: updatedShippingAddress
        }
     } catch (error) {
        console.log(error)
        throw error;
     }
}

export async function deleteShipping(params:DeleteShippingAddressParams) {
    try {
        const { shippingId, path } = params;
        await connectToDatabase()
        const shipping = await ShippingAddress.findById(shippingId)
        if(!shipping) {
         throw new Error('No shipping address found')
        }
        await ShippingAddress.deleteOne({_id: shipping._id})
        revalidatePath(path)
        return NextResponse.json({message: 'shipping address has been deleted successfuly'})
    } catch (error) {
       console.log(error)
       throw error;
    }
}