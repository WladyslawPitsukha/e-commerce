import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const brandSchema = new Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },
        slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
        description: { type: String, trim: true },
        logoUrl: { type: String, trim: true },
        websiteUrl: { type: String, trim: true },
    },
    { timestamps: true },
);

export type BrandDocument = InferSchemaType<typeof brandSchema>;
export const Brand: Model<BrandDocument> =
    models.Brand ?? model<BrandDocument>("Brand", brandSchema);