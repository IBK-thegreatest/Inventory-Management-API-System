import HttpException from "@/exceptions/HttpException";
import { Category, CategoryInfo } from "@/interfaces/category.interface";
import CategoryModel from "@/models/Category";

//CREATE A CATEGORY
export const createCategoryService = async (categoryData: Category): Promise<Category> => {
    const category = await CategoryModel.findOne({ name: categoryData.name })
    if(category) throw new HttpException(409, "This category already Exists!!!")
    const data: Category = {
        name: categoryData.name,
        description: categoryData.description,
        isDisabled: categoryData.isDisabled
    }
    const newCategory = new CategoryModel(data)
    const saveCategory = await newCategory.save();
    return saveCategory
}

//GET ALL CATEGORIES
export const getAllCategoriesService = async (): Promise<CategoryInfo[]> => {
    const categories = await CategoryModel.find()
    return categories
}

//UPDATE CATEGORY INFORMATION
export const updateCategoryService = async (categoryId: string, categoryData: Category): Promise<CategoryInfo> => {
    const category = await CategoryModel.findOne({ name: categoryData.name })
    if(!category) throw new HttpException(404, "This Category of Products does not Exist!!!")

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { $set: categoryData },
        { new: true }
    )
    return updatedCategory
}