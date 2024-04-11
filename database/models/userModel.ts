import  { Schema, model, models, Document} from 'mongoose'


export interface IUser extends Document {
    clerkId: string;
    username: string;
    name: string;
    email: string;
    picture: string;
    saved: Schema.Types.ObjectId[];
    password?: string;
    joinedAt: Date;
    isAdmin: boolean;
}
const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true
    },
    saved: [{
        type: Schema.Types.ObjectId,
        ref: 'Product', 
    }],
    username: {
        type: String,
        required: true,
        
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
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
})

const User = models?.User || model('User', UserSchema)
export default User;