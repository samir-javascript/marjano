import mongoose, { Document, models,model, Schema, Types } from "mongoose";

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
