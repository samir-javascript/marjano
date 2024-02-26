import { IUser } from "@/database/models/userModel";

export interface ProductProps {
    product: {
        name: string;
        description: string;
        rating: number;
        brand: string;
        category: string;
        countInStock: number;
        price: number;
        prevPrice: number;
        numReviews: number;
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
  