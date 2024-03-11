"use server"

import User from "@/database/models/userModel";

import { connectToDatabase } from "@/database/mongodb";
import { CreateUserParams, DeleteUserByAdminParams, DeleteUserParams, EditUserByAdminParams, EditUserProfileParams, GetAllUsersProps,
    GetSavedProductsParams,
    ToggleSavedProductParams, UpdateUserParams } from "@/utils/shared";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
export async function createUser(userData:CreateUserParams) {
   try {
      await connectToDatabase()
      const newUser = await User.create(userData)
      return newUser
   } catch (error) {
      console.log(error)
      throw error;
   }
}
export async function updateUser(params:UpdateUserParams) {
    try {
        await connectToDatabase()
        const { clerkId, path, updateData} = params;
        await User.findOneAndUpdate({clerkId}, updateData , {
          new: true
        })
        revalidatePath(path)
    } catch (error) {
       console.log(error)
       throw new Error('something went wrong while updating a user')
    }
  }
  export async function deleteUser(params:DeleteUserParams) {
     try {
        const { clerkId  } = params;
         await connectToDatabase()
         const user = await User.findOneAndDelete({clerkId})
         if(!user) {
            throw new Error('User not found')
         }
       
         // delete his reviews;
         // delete his history orders etc;
         const deletedUser = await User.findByIdAndDelete(user._id)
        
         return deletedUser
     } catch (error) {
         console.log(error)
         throw error;
     }
  }
  export async function getAllUsers(params:GetAllUsersProps) {
     try {
      await connectToDatabase()
      const { page } = params;
      const pageSize = 12;
      const skipAmount = pageSize * (page! - 1)
      const count = await User.countDocuments()
      
      const users = await User.find({})
      .limit(pageSize)
      .skip(skipAmount)
      return { users, page, pages: Math.ceil(count / pageSize) }
       
     } catch (error) {
         console.log(error)
         throw error
     }
  }
  export async function editUserProfile(params:EditUserProfileParams) {
     try {
        const { path, name, username, email, userId} = params;
        await connectToDatabase()
        const user = await User.findById(userId)
        if(!user) {
         throw new Error('User not found')
        }
        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        const updatedUser = await user.save()
        revalidatePath(path)
        return {
           user: updatedUser
        }
     } catch (error) {
        console.log(error)
        throw error;
     }
  }

  export async function toggleSavedProduct(params:ToggleSavedProductParams ) {
     try {
        const { productId, path, userId } = params;
        await connectToDatabase()
        const user = await User.findById(userId)
        if(!user) {
           throw new Error('User not found')
        }
        const isProductSaved = user?.saved?.includes(productId)
        if(isProductSaved) {
           await User.findByIdAndUpdate(userId, { $pull: {saved: productId}}, {new: true})
        }else {
         await User.findByIdAndUpdate(userId,
            {$addToSet: {saved: productId}},
            {new: true})
        }
        revalidatePath(path)
     } catch (error) {
       console.log(error)
       throw error;
     }
  }

  export async function editUserByAdmin(params:EditUserByAdminParams) {
      try {
         const { path, userId,name, email, isAdmin } = params;
         await connectToDatabase()
         const user = await User.findById(userId)
         if(!user) {
            throw new Error('User not found')
         }
         user.name = name || user.name;
         user.email =  email || user.email;
         user.isAdmin = Boolean(isAdmin) || user.isAdmin;
         await user.save()
         revalidatePath(path)
         return NextResponse.json({message: "user has been updated successfuly"})
      } catch (error) {
          console.log(error)
          throw error;
      }
  }



  export async function getSavedProducts(params: GetSavedProductsParams) {
   try {
     const { clerkId, page } = params;
     const pageSize = 12;
     const skipAmount = pageSize * (page! - 1);
     await connectToDatabase();
 
     const aggregationPipeline = [
       { $match: { clerkId: clerkId } },
       {
         $lookup: {
           from: 'products',
           localField: 'saved',
           foreignField: '_id',
           as: 'savedProducts',
         },
       },
       { $unwind: '$savedProducts' },
       {
         $group: {
           _id: '$_id',
           clerkId: { $first: '$clerkId' },
           savedProducts: { $push: '$savedProducts' },
           totalProducts: { $sum: 1 },
         },
       },
       {
         $sort: { 'savedProducts.createdAt': -1 },
       },
       {
         $project: {
           _id: 0,
           clerkId: 1,
           savedProducts: {
             $slice: ['$savedProducts', skipAmount, pageSize],
           },
           totalProducts: 1,
         },
       },
     ];
 // @ts-ignore
     const userAggregationResult = await User.aggregate(aggregationPipeline);
 
     if (userAggregationResult.length === 0) {
       throw new Error('User not found');
     }
 
     const { savedProducts, totalProducts } = userAggregationResult[0];
 
     const totalPages = Math.ceil(totalProducts / pageSize);
 
     return {  savedProducts, page, pages: totalPages };
   } catch (error) {
     console.log(error);
     throw error;
   }
 }
 
 


export async function deleteUserByAdmin(params:DeleteUserByAdminParams) {
     try {
        const {  userId, path  } = params;
        await connectToDatabase()
        const user = await User.findById(userId)
        if(!user) {
         throw new Error('User not found')
        }
        if(user.isAdmin) {
         throw new Error('admin users cannot be deleted')
         }
         await User.findOneAndDelete({_id: user._id})
         revalidatePath(path)
     } catch (error) {
        console.log(error)
     }
}

