import mongoose, { Document, models,model, Schema, Types } from "mongoose";
/*
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
*/


interface Address {
    city: string;
    country: string;
    line1: string;
    line2?: string | null;
    postal_code: string;
    state: string;
}

interface OrderItem {
    name: string;
    price: number;
    quantity: number;
    product: mongoose.Schema.Types.ObjectId; // Change Types.ObjectId to string
  }

interface ShippingDetails {
    address: Address;
    email: string;
    name: string;
}

interface OrderDocument extends Document {
    userId: string;
    itemsPrice: number;
    shippingAddress: {
        city: string;
        country: string;
        postalCode: string;
        phoneNumber: string;
        address: string;
    },
    shippingPrice: number;
    stripeCustomerId: string;
    paymentMethode: string;
    isPaid: boolean;
    isDelivered: boolean;
    paidAt: Date;
    deliveredAt: Date;
    paymentIntent: string;
    totalAmount: number;
    shippingAmount: number;
    shippingDetails: ShippingDetails;
    paymentStatus: string;
    deliveryStatus: 'delivered' | 'ordered' | 'shipped';
    orderItems: OrderItem[];
}

const OrderSchema = new Schema<OrderDocument>({
    userId: { type: String, required: true , ref: "User"},
    stripeCustomerId: { type: String},
    paymentIntent: { type: String,  },
    totalAmount: { type: Number,  },
    shippingAmount: { type: Number,  },
    paymentMethode: {
        type: String,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    shippingAddress : {
      city: { type: String},
      country: {type: String},
      postalCode: { type: String},
      address: { type: String},
      phoneNumber: { type: String}
    },
    isDelivered: {
         type: Boolean,
         default: false
    },
    paidAt: {
        type: Date,
        default: Date.now()
    },
    deliveredAt: {
        type: Date,
        default: Date.now()
    },
    itemsPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
   
    shippingPrice: {
        type: Number,
        default: 0.0
    },
    shippingDetails: {
        type: {
            address: {
                city: { type: String,  },
                country: { type: String,  },
                line1: { type: String,  },
                line2: { type: String, default: null },
                postal_code: { type: String,  },
                state: { type: String,  },
            },
            email: { type: String,  },
            name: { type: String,  },
        },
       
    },
    paymentStatus: { type: String },
    deliveryStatus: {
        type: String,
        enum: ['delivered', 'ordered', 'shipped'],
    },
    orderItems: [
        {
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        },
    ],
}, {timestamps: true});

const OrderModel = models.Order || model('Order', OrderSchema);

export default OrderModel;
