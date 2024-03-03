"use server"
import { connectToDatabase } from "@/database/mongodb";
import ProductModel from "@/database/models/productModel";
import { CreateCartParams, CreateProductParams, DeleteProductParams, GetProductDetailsParams, GetProductsByBrandParams, GetProductsByCategoryParams, GetProductsParams, UpdateProductParams } from "@/utils/shared";
import { revalidatePath } from "next/cache";
import cloudinary from "@/utils/cloudinary";
import User from "@/database/models/userModel";
import { FilterQuery } from "mongoose";

import { NextResponse } from "next/server";
import Cart from "@/database/models/cartModel";

export async function getProducts(params:GetProductsParams) {
   try {
     const { searchQuery } = params;
     const query:FilterQuery<typeof ProductModel> = {}
      if(searchQuery) {
         query.$or =  [
          { name: { $regex: searchQuery, $options: "i" } } ,
           { brand: { $regex: searchQuery, $options: "i" } } ,
          { category: { $regex: searchQuery, $options: "i" } },
         ]
      }
      await connectToDatabase()
      const products = await ProductModel.find(query)
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
     const { quantity, productId, userId, path, price, name  } = params;
 
     await connectToDatabase();
     const user = await User.findById(userId);
 
     const cart = await Cart.findOne({ userId: user?._id });
 
     if (!cart) {
       await Cart.create({
         userId: user._id,
        
         cartItems: [{ productId, quantity,  name,
          
          price, }],
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
         cart.cartItems.push({ productId, quantity , name,
         
          price,});
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
      let uploadedImages = [] as any;
      if (images.length > 0) {
        // Use Promise.all to handle multiple image uploads concurrently
        uploadedImages = await Promise.all(images.map(async (image) => {
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

//  MONGODB_URL = mongodb+srv://soso:f5ZNG6Xo03ycgHEd@cluster0.dg5pqdw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
      
      const updatedProduct = await product.save();
      revalidatePath(path); 

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

export async function getNosCoupsDeCoursProducts() {
   try {
      await connectToDatabase()
      const products = await ProductModel.find({position: "Nos coups de coeur"})
      if(!products) {
         throw new Error('No product was found')
      }
      return { products }
   } catch (error) {
    console.log(error)
      throw error;
   }
}
export async function getBonPlansProducts() {
  try {
     await connectToDatabase()
     const products = await ProductModel.find({position: "bon plans"})
     if(!products) {
        throw new Error('No product was found')
     }
     return { products }
  } catch (error) {
   console.log(error)
     throw error;
  }
}
export async function getEnCemomentProducts() {
  try {
     await connectToDatabase()
     const products = await ProductModel.find({position: "en ce moment"})
     if(!products) {
        throw new Error('No product was found')
     }
     return { products }
  } catch (error) {
   console.log(error)
     throw error;
  }
}
export async function deleteProduct(params:DeleteProductParams) {
  try {
      const { productId, path } = params;
      await connectToDatabase()
     const product = await ProductModel.findById(productId)
     if(!product) {
       throw new Error('Prodict not found')
     }
     await ProductModel.findOneAndDelete({_id: product._id})
     revalidatePath(path)
     
  } catch (error) {
     console.log(error)
     throw error;
  }
}


export async function getProductsByCategory(params:GetProductsByCategoryParams) {
  try {
    const { categoryName } = params;
      await connectToDatabase()
      const products = await ProductModel.find({category: categoryName})
      return products
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    throw error;
  }
}


export async function getProductsByBrand(params:GetProductsByBrandParams) {
  try {
    const { brandName } = params;
     await connectToDatabase()
     const products = await ProductModel.find({brand: { $regex: brandName, $options: "i"}})
     return products;
  } catch (error) {
     console.log(error)
     throw error;
  }
}