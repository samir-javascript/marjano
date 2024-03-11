"use server"
import { connectToDatabase } from "@/database/mongodb";
import ProductModel from "@/database/models/productModel";
import { CreateCartParams, CreateProductParams, CreateReviewParams, DeleteProductParams,
   GetProductDetailsParams, GetProductsByBrandParams, GetProductsByCategoryParams,
    GetProductsParams, GetRecommendedProduct } from "@/utils/shared";
import { revalidatePath } from "next/cache";

import User from "@/database/models/userModel";
import { FilterQuery } from "mongoose";
import { NextResponse } from "next/server";
import Cart from "@/database/models/cartModel";



export async function getProducts(params: GetProductsParams) {
  try {
    const { searchQuery, page = 1, filter, filterRating } = params;
    const pageSize = 12;
    const skipAmount = pageSize * (page - 1);

    const query: FilterQuery<typeof ProductModel> = {};

    if (searchQuery || filter) {
      query.$or = [
        { name: { $regex: searchQuery || filter, $options: 'i' } },
        { brand: { $regex: searchQuery || filter, $options: 'i' } },
        { category: { $regex: searchQuery || filter, $options: 'i' } },
      ];
    }

    if (filterRating) {
      query.rating = Number(filterRating);
    }

    

    const count = (searchQuery || filter)
  ? await ProductModel.countDocuments(query)
  : (filterRating
    ? await ProductModel.countDocuments({ rating: Number(filterRating) })
    : await ProductModel.countDocuments());

    await connectToDatabase();

    const products = await ProductModel.find(query)
      .limit(pageSize)
      .skip(skipAmount);

    return { products, page, pages: Math.ceil(count / pageSize) };
  } catch (error) {
    console.error(error);
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
    const { categoryName, page = 1 } = params;
    
    const pageSize = 12;
    const skipAmount = pageSize * (page - 1)
    const count = await ProductModel.countDocuments({category:categoryName})
      await connectToDatabase()
      const products = await ProductModel.find({ category: { $regex: categoryName, $options: "i" } })
      .limit(pageSize)
      .skip(skipAmount)
      return{ products , page , pages: Math.ceil(count / pageSize)}
  } catch (error) {
    console.error('Error in getProductsByCategory:', error);
    throw error;
  }
}

export async function getrecommendationProducts(params:GetRecommendedProduct) {
  const {productId }= params;

  const product = await ProductModel.findById(productId);
  
  if (!product) {
    
    throw new Error('Product Not Found');
  }

  const recommendedProducts = await ProductModel.find({
    category: product.category,
    _id: { $ne: productId },
   
    // Exclude the product with the specified ID
  }).limit(4);
 return recommendedProducts
}

export async function getProductsByBrand(params:GetProductsByBrandParams) {
  try {
    const { brandName, page = 1 } = params;
    const pageSize = 12;
    const skipAmount = pageSize * (page - 1)
    const count = await ProductModel.countDocuments({brand: { $regex: brandName, $options: "i"}})
     await connectToDatabase()
     const products = await ProductModel.find({brand: { $regex: brandName, $options: "i"}})
     .limit(pageSize)
     .skip(skipAmount)

     return {products , page, pages: Math.ceil(count / pageSize)}
  } catch (error) {
     console.log(error)
     throw error;
  }
}

export async function createReview (params:CreateReviewParams) {
  const {rating, comment,userId, name, productId, path } = params;
  try {
    const product = await ProductModel.findById(productId);
  if(product) {
     const alreadyReviewed = product.reviews.find((review:any) => review.user.toString() === userId)
     if(alreadyReviewed) {
        throw new Error('Product already reviewed')
     }
     const review = {
        user:userId, 
        rating,
        comment,
        name,
     }
     product.reviews.push(review)
     product.numReviews = product.reviews.length;
     product.rating = product.reviews.reduce((acc:any, review:any) => acc + review.rating,0) / product.reviews.length;
     await product.save()
      revalidatePath(path)
  }else {
   
     throw new Error('Product not found')
  }
  } catch (error) {
     console.log(error)
     throw error
  }
}
