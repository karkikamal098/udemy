import { Router } from "express";

const router = Router();

import {registerUser, loginUser, deleteUser} from "../Controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);

export default router;
