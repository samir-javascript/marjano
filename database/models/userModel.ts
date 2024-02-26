import  { Schema, model, models, Document} from 'mongoose'


export interface IUser extends Document {
    clerkId: string;
    username: string;
    name: string;
    email: string;
    picture: string;
    password?: string;
    joinedAt: Date;
}
const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,
        required: true
    },
    password: { type: String },
    joinedAt: {
        type: Date,
        default : Date.now()
    }
})

const User = models.User || model<IUser>('User', UserSchema)
export default User;