import { connectToDatabase } from "@/database/mongodb";
import ProductModel from "@/database/models/productModel";
import { GetProductsParams } from "@/utils/shared";
import { revalidatePath } from "next/cache";
export async function getProducts(params:GetProductsParams) {
   try {
     
      await connectToDatabase()
      const products = await ProductModel.find({})
      if(!products) {
        throw new Error('No product was found')
      }
      
      return {products}
   } catch (error) {
       console.log(error)
       throw error;
   }
}