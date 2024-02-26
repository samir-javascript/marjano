import User from "@/database/models/userModel";
import Wishlist from "@/database/models/wishlistModel";
import { connectToDatabase } from "@/database/mongodb";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "@/utils/shared";
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
         await Wishlist.deleteMany({userId: user._id})
         // delete his reviews;
         // delete his history orders etc;
         const deletedUser = await User.findByIdAndDelete(user._id)
         return deletedUser
     } catch (error) {
         console.log(error)
         throw error;
     }
  }