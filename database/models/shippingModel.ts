import mongoose, { Schema, Document } from 'mongoose';

export interface IShippingAddress extends Document {
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    user: Schema.Types.ObjectId;
}

const shippingAddressSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const ShippingAddress = mongoose.models.ShippingAddress || mongoose.model<IShippingAddress>('ShippingAddress', shippingAddressSchema);

export default ShippingAddress;
