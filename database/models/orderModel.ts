import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    user: Schema.Types.ObjectId;
    shippingAddress: {
        city: string;
        phoneNumber: string;
        country: string;
        address: string;
        postalCode: string;
        user: Schema.Types.ObjectId;
    };
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    deliveredAt: Date;
    paidAt: Date;
    paymentResult: {
        _id: string;
        status: string;
        update_time: string;
        email_address: string;
    };
    orderItems: [
        {
            name: string;
            price: number;
            quantity: number;
            product: Schema.Types.ObjectId;
        }
    ]
}

const OrderSchema =  new Schema({
    // this is the user that holds the orders,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // these are the products inside the cart
    orderItems: [
        {
            name: { type: String, },
            price: { type: Number, },
            quantity: { type: Number, },
          
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
           
        }
    ],
    shippingAddress: {
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: String, required: true},
        user: { type: Schema.Types.ObjectId, ref: 'User'}
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    itemsPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
   
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true
    },
    paidAt: {
        type: Date,
    },
    deliveredAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true
    },
}, {
    timestamps: true
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
