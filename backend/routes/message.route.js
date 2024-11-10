import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js"
import { authUser } from "../middleware/authUser.js";


const router = express.Router();

router.post("/send/:id", authUser, sendMessage);
router.get("/get/:id", authUser, getMessage);


export default router;