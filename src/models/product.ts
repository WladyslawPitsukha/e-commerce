import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const productSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
        description: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        compareAtPrice: { type: Number, min: 0 },
        images: { type: [String], required: true, validate: (images: string[]) => images.length > 0 },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
        brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true, index: true },
        sizes: [{ name: { type: String, required: true }, inStock: { type: Boolean, default: true } }],
        colors: [{ name: { type: String, required: true }, hex: { type: String, required: true } }],
        rating: { type: Number, default: 0, min: 0, max: 5 },
        reviewCount: { type: Number, default: 0, min: 0 },
        stock: { type: Number, required: true, min: 0, default: 0 },
        isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true },
);

export type ProductDocument = InferSchemaType<typeof productSchema>;
export const Product: Model<ProductDocument> =
    models.Product ?? model<ProductDocument>("Product", productSchema);