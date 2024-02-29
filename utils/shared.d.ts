import { IUser } from "@/database/models/userModel";
import mongoose, { mongo } from "mongoose";
export interface GetAllUsersProps {
   page?: number;
   pageSize?:number;
   path?:string;
}
export interface GetProductsByCategoryParams {
   path?: string;
   categoryName: string;
   page?:number;
   pageSize?: number;
}
export interface GetProductsByBrandParams {
  path?: string;
  brandName: string;
  page?:number;
  pageSize?: number;
}
export interface ProductProps {
  product : {
    brand: string;
    name: string;
    _id: string;
    images: string[];
    user: mongoose.Schema.Types.ObjectId;
    description: string;
    price: number;
    prevPrice: number;
    category: string;
    position: string;
    productType?:string;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews: [
      {
        user: string;
        rating: number;
        comment: string;
        name: string;
        
      }
    ];
 }
   
}
export interface GetProductsParams {
   
    page?: number;
    pageSize?: number;
    query?: string;
}
export interface CreateUserParams {
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
  }
  export interface UpdateUserParams {
    clerkId: string;
    updateData: Partial<IUser>;
    path: string;
  }
  export interface DeleteUserParams {
    clerkId: string;
  }
  export interface GetProductDetailsParams {
     productId: string;
  }
  
  export interface CreateCartParams {
     productId: string;
     quantity: number;
     path: string;
     userId: string;
  }
  export interface GetUserByIdParams {
    clerkId: string;
  }
  export interface  GetUserCart {
    userId: string;
    path?: string;
  }
  export interface GetTotalCartCount {
    userId: string;
  }
  export interface UpdateProductParams {
    name: string;
    description: string;
    productId: string;
    price: number;
    prevPrice: number;
    category: string;
    images: string[];
    brand: string;
    position: string;
    productType?: string;
    countInStock: number;
    path: string;
    
  }
  export interface CreateProductParams {
    userId: string;
    path: string;
  }