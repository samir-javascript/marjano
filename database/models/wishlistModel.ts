import mongoose, { Document, Schema } from "mongoose";

export interface IWishlist extends Document {
    userId: Schema.Types.ObjectId;
    products: Schema.Types.ObjectId[];
}

const WishlistModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    ]
}, { timestamps: true });

const Wishlist = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistModel);
export default Wishlist;
