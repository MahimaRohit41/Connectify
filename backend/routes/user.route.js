import express from "express";
import { allUsers, login, logout, signup } from "../controller/user.controller.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", authUser, allUsers);


export default router;