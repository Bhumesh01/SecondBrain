import {Request, Response} from 'express';
import dotenv from 'dotenv';
import {z} from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {User} from "../models/db"
dotenv.config();
const userZodSchema = z.object({
    username: z.string().min(3, { message: "username must be atleast 3 characters long" }).max(10, {message: "username can't be greater than 10 letters"}),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long" }).max(20,  {message: "Password can't be greater than 20 letters"}).refine(val=>/[A-Z]/.test(val),{ message: "Password must contain at least one uppercase letter" }) .refine(val => /[a-z]/.test(val), { message: "Password must contain at least one lowercase letter" }).refine(val => /[^A-Za-z0-9]/.test(val), { message: "Password must contain at least one special symbol" }).refine(val => /[0-9]/.test(val), { message: "Password must contain at least one digit" })
})

// Sign Up
export const signup = async (req: Request,res: Response)=>{
    try{
        const {success, data, error} = userZodSchema.safeParse(req.body);
        if(!success){
            const formatted = error.format();
            const usernameErrors = formatted.username?._errors || [];
            const passwordErrors = formatted.password?._errors || [];

            return res.status(400).json({
              usernameErrors,
              passwordErrors
            });
        }
        const credentials:z.infer<typeof userZodSchema> = data;
        const hash = await bcrypt.hash(credentials.password, 5);
        await User.create({
            username: credentials.username,
            password: hash
        })
        res.status(200).json({
            message: "Successfully signed up"
        });
    }
    catch(err: any){
        if (err?.code === 11000) {
        return res.status(403).json({ message: "User already exists" });
    }
        return res.status(500).json({ message: err });
    }
}

// Sign In
export const login = async (req: Request,res: Response)=>{
    try{
        const {success, data, error} = userZodSchema.safeParse(req.body);
        if(!success){
            const formatted = error.format();
            const usernameErrors = formatted.username?._errors || [];
            const passwordErrors = formatted.password?._errors || [];

            return res.status(400).json({
              usernameErrors,
              passwordErrors
            });
        }
        const credentials:z.infer<typeof userZodSchema> = data;
        const user = await User.findOne({
            username: credentials.username
        })
        if(user){
            const result = await bcrypt.compare(credentials.password, user.password);
            if(result){
                if (!process.env.JWT_PASSWORD) {
                    throw new Error("JWT_PASSWORD not set in environment");
                }
                const token = jwt.sign({
                    id: user._id
                }, process.env.JWT_PASSWORD);
                return res.status(200).json({
                    message: "Successfully signed in",
                    token: token
                });
            }
            return res.status(403).json({
                message: "wrong password"
            })
        }
        return res.status(404).json({
            message: "User not Found. Please Sign Up"
        })
    }
    catch(err: any){
        return res.status(500).json({ message: err });
    }
}