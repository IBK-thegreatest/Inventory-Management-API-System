import { createCategoryService, getAllCategoriesService, updateCategoryService } from "@/services/category.services"
import { Request, Response, NextFunction } from "express"

//CREATE A CATEGORY
export const createCategory = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categoryData = req.body
        const newCategory = await createCategoryService(categoryData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New Category has been Created",
            data: newCategory
        })
    } catch (error) {
        next(error)
    }
}

//GET ALL CATEGORIES
export const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categories = await getAllCategoriesService()
        res.status(200).json(categories)
    } catch (error) {
        next(error)
    }
}

//UPDATE CATEGORY INFORMATION
export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categoryId = req.params.categoryId
        const categoryData = req.body
        const updatedCategory = await updateCategoryService(categoryId, categoryData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Category Information has been Updated Successfully",
            data: updatedCategory
        })
    } catch (error) {
        next(error)
    }
}