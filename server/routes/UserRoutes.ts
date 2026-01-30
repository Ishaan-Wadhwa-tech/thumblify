import express from 'express'
import { getThumbnailsbyId, getUserThumbnails } from '../controllers/UserController.js'
import protect from '../middlewares/auth.js'
export const userRouter = express.Router()
userRouter.get('/thumbnails',protect,getUserThumbnails)
userRouter.get('/thumbnail/:id',protect,getThumbnailsbyId)