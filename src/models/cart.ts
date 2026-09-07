import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const cartSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        items: [{
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, min: 1 },
            size: { type: String, trim: true },
            color: { type: String, trim: true },
        }],
    },
    { timestamps: true },
);

export type CartDocument = InferSchemaType<typeof cartSchema>;
export const Cart: Model<CartDocument> =
    models.Cart ?? model<CartDocument>("Cart", cartSchema);