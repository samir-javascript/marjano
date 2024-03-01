"use server"
import User from "@/database/models/userModel";

import { connectToDatabase } from "@/database/mongodb";
import { CreateUserParams, DeleteUserParams, EditUserProfileParams, GetAllUsersProps,
    ToggleSavedProductParams, UpdateUserParams } from "@/utils/shared";
import { revalidatePath } from "next/cache";
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
        const { clerkId } = params;
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
      const { page, pageSize } = params;
      await connectToDatabase()
      const users = await User.find({})
      return { users }
       
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