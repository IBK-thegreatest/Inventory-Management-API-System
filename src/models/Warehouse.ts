import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        location: {
            type: String,
            required: true
        },
        managerId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const WarehouseModel = mongoose.model("Warehouse", WarehouseSchema)

export default WarehouseModel