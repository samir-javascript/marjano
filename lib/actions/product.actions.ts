"use server"
import { connectToDatabase } from "@/database/mongodb";
import ProductModel from "@/database/models/productModel";
import { CreateCartParams, CreateProductParams, GetProductDetailsParams, GetProductsParams, UpdateProductParams } from "@/utils/shared";
import { revalidatePath } from "next/cache";
import cloudinary from "@/utils/cloudinary";
import User from "@/database/models/userModel";
import { NextResponse } from "next/server";
import Cart from "@/database/models/cartModel";
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
export async function getProductDetails(params:GetProductDetailsParams) {
     try {
       const { productId } = params;
       await connectToDatabase()
       const products = await ProductModel.findById(productId)
       return { products}
     } catch (error) {
        console.log(error)
        throw error;
     }
}

export async function createProduct(params:CreateProductParams) {
  try {
   const { userId, path } = params;
     await connectToDatabase()
     const product = await ProductModel.create({
      name: 'sample name',
      brand: 'SAMPLE BRAND',
      description: 'sample description',
      price: 0,
      productType: 'sample product type',
      prevPrice: 0,
      countInStock: 0,
      category: "sample category",
      images: [
        
      ],
      numReviews: 0,
      rating: 0,
      user: userId,
      position: 'en ce moment',

     })
     const createdProduct = await product.save()
     revalidatePath(path)
     return { createdProduct}
  } catch (error) {
     console.log(error)
     throw error;
  }
}

export async function addToCart(params: CreateCartParams) {
   try {
     const { quantity, productId, userId, path } = params;
 
     await connectToDatabase();
     const user = await User.findById(userId);
 
     const cart = await Cart.findOne({ userId: user?._id });
 
     if (!cart) {
       await Cart.create({
         userId: user._id,
         cartItems: [{ productId, quantity }],
       });
     } else {
       const existingItemIndex = cart.cartItems.findIndex((item: any) => item.productId.toString() === productId);
 
       if (existingItemIndex !== -1) {
         // Update the quantity of the existing item
         cart.cartItems[existingItemIndex].quantity += quantity;
 
         // Remove the item if the quantity is less than or equal to 0
         if (cart.cartItems[existingItemIndex].quantity <= 0) {
           cart.cartItems.splice(existingItemIndex, 1);
         }
       } else {
         cart.cartItems.push({ productId, quantity });
       }
     }
 
     await cart.save();
     revalidatePath(path);
 
     return NextResponse.json({ success: true });
   } catch (error) {
     console.log(error);
     throw error;
   }
 }


 export async function editProduct(params: UpdateProductParams) {
  try {
    const {
      productId, name, description,
      price, prevPrice, path,
      category, brand, productType,
      position, countInStock, images
    } = params;

    await connectToDatabase(); // Replace with your implementation

    // Get the product that you want to update
    const product = await ProductModel.findById(productId);

    if (product) {
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

      // Upload and update images one by one
      const uploadedImages = [];

      for (const image of images) {
        try {
          const result = await cloudinary.uploader.upload(image, {
            upload_preset: 'marjane-mall',
            transformation: [
              { crop: "scale" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ]
          });
          uploadedImages.push(result.secure_url);
        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          // Handle the error as needed, e.g., log it or provide user feedback
          continue; // Skip to the next iteration on upload error
        }
      }

      // Update product images
      product.images = uploadedImages;
//  MONGODB_URL = mongodb+srv://soso:f5ZNG6Xo03ycgHEd@cluster0.dg5pqdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
      // Save the updated product
      const updatedProduct = await product.save();
      revalidatePath(path); // Replace with your implementation

     return  {
      product:updatedProduct
     }
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
}

