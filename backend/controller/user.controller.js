import createTokenAndSaveCookie from "../jwt/generateToken.js";
import { User } from "../model/user.model.js";
import brycpt from "bcryptjs";

export const signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (!name || !email || !password || !confirmPassword) {
            res.status(500).json({ message: "Please fill all the required fields" });
        }

        const findEmail = await User.findOne({ email: email });
        if (findEmail) {
            res.status(500).json({ message: "Alreay registered email" });
        }

        if (password != confirmPassword) {
            res.status(500).json({ message: "Password and confirmPassword should be same" })
        };

        const hashedPassword = await brycpt.hash(password, 10);
        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(200).json({ message: "User Registered successfully", user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
              }, });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req,res) => {
    const { email, password } = req.body;
    try{
        if(!email || !password)
        {
            res.status(500).json({message: "Please fill required field" });
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({ message: "Email address is not registred."})
        }

        const isCorrectPassword = await brycpt.compare(password, user.password);
        if(isCorrectPassword){
            createTokenAndSaveCookie(user._id, res);
            res.status(201).json({
                message: "User logged in successfully",
                user: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                },
              });
        }
        else{
            res.status(400).json({message: "Password is incorrect"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server error "});
    }
};

export const logout = async (req, res) => {
    try {
      res.clearCookie("jwt");
      res.status(201).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const allUsers = async (req,res) => {
    try{
        const loggedInUser = req.user._id;
        // all user except loggedIn User
        const allUsers = await User.find({ _id: {$ne: loggedInUser}}).select("-password");
        res.status(200).json( allUsers );
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal Server error in all users controller" });
    }
};