import ProductModel from "@/database/models/productModel";
import { connectToDatabase } from "@/database/mongodb";
import cloudinary from "@/utils/cloudinary";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(req:Request) {
    try {
      const {
        productId, name, description,
        price, prevPrice, path,
        category, brand, productType,
        position, countInStock, images
      } = await req.json();
  
      await connectToDatabase(); // Replace with your implementation
  
      // Get the product that you want to update
      const product = await ProductModel.findById(productId);
  
      if (product) {
        let uploadedImages = [] as any;
        if (images.length > 0) {
          // Use Promise.all to handle multiple image uploads concurrently
          uploadedImages = await Promise.all(images.map(async (image:string) => {
            const result = await cloudinary.uploader.upload(image, {
              upload_preset: 'marjane-mall',
              transformation: [
                {crop: "scale"},
                {quality: "auto"},
                {fetch_format: "auto"},
              ]
            });
            return result.secure_url;
          }));
        }
  
        // Update product properties
        product.name = name;
        product.description = description;
        product.countInStock = countInStock;
        product.price = price;
        product.category = category;
        product.brand = brand;
        product.position = position;
        product.prevPrice = prevPrice;
        product.productType = productType;
        product.images = uploadedImages;
  
  //  MONGODB_URL = mongodb+srv://soso:f5ZNG6Xo03ycgHEd@cluster0.dg5pqdw.mongodb.net/?retryWritestrue&w=majority&appName=Cluster0
        
        const updatedProduct = await product.save();
        revalidatePath(path); 
  
       return  NextResponse.json(updatedProduct)
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
        NextResponse.json({error:'error while updating product'})
      console.error('Error editing product:', error);
      throw error;
    }
  }