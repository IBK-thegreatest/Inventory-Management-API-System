import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
            required: true
        },
        categoryId: {
            type: String,
            required: true
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        outOfStock: {
            type: String,
            enum: ["yes", "no"]
        }
    },
    {
        timestamps: true
    }
)

const ProductModel = mongoose.model("Product", ProductSchema)

export default ProductModel