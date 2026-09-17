import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        items: [{
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            catalogProductId: { type: Number, min: 1 },
            productName: { type: String, required: true },
            unitPrice: { type: Number, required: true, min: 0 },
            quantity: { type: Number, required: true, min: 1 },
            size: { type: String, trim: true },
            color: { type: String, trim: true },
        }],
        shippingAddress: {
            fullName: { type: String, required: true },
            line1: { type: String, required: true },
            line2: { type: String },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        total: { type: Number, required: true, min: 0 },
        status: { type: String, enum: ["pending", "paid", "shipped", "delivered", "cancelled"], default: "pending" },
        paymentReference: { type: String, trim: true },
    },
    { timestamps: true },
);

export type OrderDocument = InferSchemaType<typeof orderSchema>;
export const Order: Model<OrderDocument> =
    models.Order ?? model<OrderDocument>("Order", orderSchema);