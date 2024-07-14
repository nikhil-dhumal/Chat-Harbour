import express from "express"

import userRoutes from "./user.routes.js"
import chatRoutes from "./chat.routes.js"

const router = express.Router()

router.use("/user", userRoutes)
router.use("/chat", chatRoutes)

export default router
