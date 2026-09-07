import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const categorySchema = new Schema(
    {
        name: { type: String, required: true, trim: true, unique: true },
        slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
        description: { type: String, trim: true },
        imageUrl: { type: String, trim: true },
    },
    { timestamps: true },
);

export type CategoryDocument = InferSchemaType<typeof categorySchema>;
export const Category: Model<CategoryDocument> =
    models.Category ?? model<CategoryDocument>("Category", categorySchema);