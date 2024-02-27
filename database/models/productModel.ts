import mongoose, { Document, Schema, Types, models, model  } from "mongoose";

interface IReview extends Document {
    user: Types.ObjectId;
    name: string;
    comment: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IProduct extends Document {
    name: string;
    user: Types.ObjectId;
    price: number;
    prevPrice: number;
    numReviews: number;
    productType?: string;
    description: string;
    reviews: IReview[];
    rating: number;
    countInStock: number;
    images: { type: Object; required: true }[];
    position: string;
    brand: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });
const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        default: 0.0
    },
    prevPrice: {
        type: Number,
        default: 0.0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    productType: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0,
    },
    countInStock: {
        type: Number,
        default: 0.0
    },
    images: [
        { type: Object, required: true }
    ],
    position: {
        type: String,
        default: 'en ce moment'
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, { timestamps: true });

const ProductModel = models?.Product || model<IProduct>('Product', ProductSchema);
export default ProductModel;
