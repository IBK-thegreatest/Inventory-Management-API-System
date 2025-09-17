import express from "express"
import mongoose from "mongoose";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import activityRoutes from "./routes/activityLogs.routes"
import authRoutes from "./routes/auth.routes"
import categoryRoutes from "./routes/category.routes"
import inventoryRoutes from "./routes/inventory.routes"
import locationRoutes from "./routes/location.routes"
import notificationRoutes from "./routes/notification.routes"
import orderRoutes from "./routes/order.routes"
import orderItemRoutes from "./routes/orderItems.routes"
import productRoutes from "./routes/product.routes"
import reportRoutes from "./routes/report.routes"
import stockTransferRoutes from "./routes/stockTransfer.routes"
import supplierRoutes from "./routes/supplier.routes"
import supplierProductRoutes from "./routes/supplierProducts.routes"
import userRoutes from "./routes/user.routes"
import warehouseRoutes from "./routes/warehouse.routes"

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL
).then(() => {
    console.log("Database Connection Successful")
}).catch(err => {
    console.log(err)
})

const app = express()
app.use(express.json())
app.use(compression)
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use("/api/v1/activity", activityRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/inventory", inventoryRoutes)
app.use("/api/v1/location", locationRoutes)
app.use("/api/v1/notifications", notificationRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/orderItems", orderItemRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/reports", reportRoutes)
app.use("/api/v1/stockTransfer", stockTransferRoutes)
app.use("/api/v1/supplier", supplierRoutes)
app.use("/api/v1/supplierProducts", supplierProductRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/warehouses", warehouseRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is currently running on port ${port}`);
})
