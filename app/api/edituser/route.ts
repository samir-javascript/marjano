import User from "@/database/models/userModel";
import { connectToDatabase } from "@/database/mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PUT = async(req:Request)=> {
    try {
       const { path, userId,name, email, isAdmin } = await req.json();
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