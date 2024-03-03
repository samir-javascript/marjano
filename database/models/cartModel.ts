import { ObjectId, Document, Schema, models, model} from 'mongoose'
interface CartItem {
    productId: ObjectId;
    quantity: number;
    price: number;
    name: string;
}
interface CartDocument extends Document {
    userId: ObjectId;
    cartItems: CartItem[];
}
const CartSchema = new Schema<CartDocument>({
   userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
    },
    cartItems: [{
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        },
        name: {
            type: String,
            
        },
       
        price: {
            type: Number,
        }
       }
    ]
}, {timestamps: true})
const Cart = models?.Cart || model("Cart", CartSchema)
export default Cart;
