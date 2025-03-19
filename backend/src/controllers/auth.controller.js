import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "7d" });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    
    const token = signToken(newUser._id);

    
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    
    const { password: _, ...userWithoutPassword } = newUser._doc;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user=await User.findOne({email});

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
       
        const isPassword=await bcrypt.compare(password,user.password);

        if(!isPassword){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = signToken(user._id);

        res.cookie("jwt", token, {
         maxAge: 7 * 24 * 60 * 60 * 1000, 
         httpOnly: true,
         sameSite: "strict",
         secure: process.env.NODE_ENV === "production",
        });

        const { password: _, ...userWithoutPassword } = user._doc;
         res.status(200).json(userWithoutPassword);
    }catch(error){
        console.error("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
 };

export const logout=(req,res)=>{
    try{
       res.cookie("jwt","",{maxAge:0});
       res.status(200).json({ message: "Logged out successfully" });
    }catch(error){
        console.error("Error in logout controller", error.message);
       res.status(500).json({ message: "Internal Server Error" });
    }
};

 export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
 