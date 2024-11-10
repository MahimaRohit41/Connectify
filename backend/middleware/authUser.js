import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const authUser = async(req,res,next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.jwt;
        console.log("token", token);
        if (!token) {
          return res.status(401).json({ error: "No token, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (!decoded) {
          return res.status(401).json({ error: "Invalid Token" });
        }

        console.log(decoded);
        const user = await User.findById(decoded.userID).select("-password"); // current loggedin user
        if (!user) {
          return res.status(401).json({ error: "No user found" });
        }
        console.log("User MAhima", user);
        req.user = user;
        next();
      } catch (error) {
        console.log("Error in authUser: ", error);
        res.status(500).json({ error: "Internal server error" });
      }
  
};