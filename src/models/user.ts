import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true, unique: true },
        passwordHash: { type: String, required: true, select: false },
        role: { type: String, enum: ["customer", "admin"], default: "customer" },
        wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User: Model<UserDocument> =
    models.User ?? model<UserDocument>("User", userSchema);