import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true
        },
        WarehouseId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const InventoryModel = mongoose.model("Inventory", InventorySchema)

export default InventoryModel;