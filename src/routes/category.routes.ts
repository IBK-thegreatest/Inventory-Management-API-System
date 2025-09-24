import { createCategory, getAllCategories, updateCategory } from "@/controllers/category.controller"
import { verifyAdmin, verifyToken } from "@/middlewares/auth.middleware"
import express, { Router } from "express"
const router: Router = express.Router()

//CREATE A CATEGORY
router.post("/", verifyAdmin, createCategory)

//GET ALL CATEGORIES
router.get("/", verifyToken, getAllCategories)

//UPDATE THE DETAILS OF A CATEGORY
router.put("/", verifyAdmin, updateCategory)


export default router