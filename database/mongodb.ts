
import mongoose from 'mongoose'
let isConnected: boolean = false
export const connectToDatabase = async ()=> {
   mongoose.set('strictQuery', true)
   if(!process.env.MONGODB_URL) {
     return console.log('missing mongo db api secret key')

   }
   if(isConnected) {
      return console.log('mongo db is already connected')
   }
   try {
      await mongoose.connect(process.env.MONGODB_URL)
       isConnected = true
   } catch (error) {
       console.log(error)
   }

   return console.log('mongoose is connected successefly')

}