import express from "express"
import { protectRoute } from "../middleware/auth.middlewares.js";
import { getMesages, getUserForSideBar, sendMessage } from "../controllers/message.controller.js";

const router =express.Router();

router.get("/users",protectRoute,getUserForSideBar);
router.get("/id",protectRoute,getMesages);

router.post("/send/:id",protectRoute,sendMessage)


 export default router;

