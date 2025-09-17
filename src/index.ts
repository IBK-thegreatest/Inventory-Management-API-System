import express from "express"
import mongoose from "mongoose";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"

// dotenv.config();
// mongoose.connect(
//     process.env.MONGO_URL
// ).then(() => {
//     console.log("Database Connection Successful")
// }).catch(err => {
//     console.log(err)
// })

const app = express()
app.use(express.json())
app.use(compression)
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is currently running on port ${port}`);
})
