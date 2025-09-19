import { deleteUser, getAllUsers, getUser, updateUser } from "@/controllers/user.controller"
import { verifyAdmin, verifyUser } from "@/middlewares/auth.middleware"
import express, { Router } from "express"
const router: Router = express.Router()

//GET A USER
router.get("/:userId", verifyUser, getUser)

//GET ALL USERS
router.get("/", verifyAdmin, getAllUsers)

//UPDATE A USER
router.put("/:userId", verifyUser, updateUser)

//DELETE A USER
router.delete("/:userId", verifyUser, deleteUser)


export default router