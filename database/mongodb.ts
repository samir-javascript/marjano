import mongoose from "mongoose";
export const connectToDatabase = async()=> {
   try {
    if(!process.env.MONGODB_URL) {
         throw new Error('missing mongo db secret key')
    }
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('mongo db has been connected successfuly')
   } catch (error) {
     console.log(error)
   }
}
