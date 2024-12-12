import express from "express"

import {login,logout,signup, updateProfile} from '../controllers/auth.controller.js'
import { checkAuth, protectRoute } from "../middleware/auth.middlewares.js";

const router =express.Router();


router.post('/signup',signup);

router.post('/login',login);

router.post('/logout',logout);

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,checkAuth)




export default router;