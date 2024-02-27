import { ObjectId, Document, Schema, models, model} from 'mongoose'
interface CartItem {
    productId: ObjectId;
    quantity: number;
}
interface CartDocument extends Document {
    userId: ObjectId;
    cartItems: CartItem[]
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
        }
       }
    ]
}, {timestamps: true})
const Cart = models?.Cart || model("Cart", CartSchema)
export default Cart;
