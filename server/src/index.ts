import express, {Request, Response} from 'express';
import {z} from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose, { Types } from 'mongoose';
import {User, Content, Tag, Link} from "./db"
import { authMiddleware } from './middleware';
const app = express();
app.use(express.json());
mongoose.connect("mongodb+srv://bhumesh01:YLBq3bRCoNvajxpa@mycluster.jta6k4p.mongodb.net/secondBrain")
const JWT_PASSWORD = "bhumesh01";
const userZodSchema = z.object({
    username: z.string().min(3, { message: "username must be atleast 3 characters long" }).max(10, {message: "username can't be greater than 10 letters"}),
    password: z.string().min(8, { message: "Password must be atleast 8 characters long" }).max(20,  {message: "Password can't be greater than 20 letters"}).refine(val=>/[A-Z]/.test(val),{ message: "Password must contain at least one uppercase letter" }) .refine(val => /[a-z]/.test(val), { message: "Password must contain at least one lowercase letter" }).refine(val => /[^A-Za-z0-9]/.test(val), { message: "Password must contain at least one special symbol" }).refine(val => /[0-9]/.test(val), { message: "Password must contain at least one digit" })
})
const objectIdString = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");
const contentZodSchema = z.object({
    link: z.string().url("Invalid URL format").min(7, "Link is required"),
    type: z.enum(['video', 'article', 'image', 'audio', 'document', 'tweet', 'youtube', 'link']),
    title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title cannot exceed 200 characters"),
    tags: z.array(objectIdString).optional()
})

// Sign Up
app.post('/api/v1/signup', async (req: Request,res: Response)=>{
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
})

// Sign In
app.post('/api/v1/signin', async (req: Request,res: Response)=>{
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
                const token = jwt.sign({
                    id: user._id
                }, JWT_PASSWORD);
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
})
app.use(authMiddleware);
// For Adding new content
interface CustomRequest extends Request {
    userId?: string;
}
app.post('/api/v1/content', async(req: CustomRequest,res)=>{
    try{
        const {success, data, error} = contentZodSchema.safeParse(req.body);
        if(!success){
            return res.status(400).json({
                message: error.format(),
            })
        }
        const userId = req.userId;
        const content: z.infer<typeof contentZodSchema> = data;
        await Content.create({
            link: content.link,
            type: content.type,
            title: content.title,
            userId: userId,
            tags : content.tags
        });
        res.status(200).json({
            message: "Content Added Successfully",
        });
    }
    catch(error: any){
        res.status(500).json({
            message: error
        })
    }
})

// For Fetching all existing documents
app.get('/api/v1/content', async (req: CustomRequest,res: Response)=>{
    try{
        const userId = req.userId;
        const userContent = await Content.find({
            userId: userId,
        }).populate("userId", "username");
        return res.status(200).json({
            contents: userContent
        })
    }
    catch(error){
        return res.status(500).json({
            message: error
        });
    }
})

// For Deleting a document
app.delete('/api/v1/content', async(req: CustomRequest,res: Response)=>{
    try{
        const contentId = req.body.contentId;
        const response = await Content.deleteOne({
            _id: contentId,
            userId: req.userId
        });
        if(!response){
            return res.status(403).json({
                message: "No such content exists"
            });
        }
        return res.status(200).json({
            message: "Content Deleted Successfully"
        });
    }
    catch(error){
        return res.status(500).json({
            message: error
        });
    }
})

// Function for creating Hash
function genHash(len: number) {
  const allowedValue = "azxnvkfjasdfsloiewt1234567890rqopwruit";

  let hash = "";

  for (let i = 0; i < len; i++) {
    const element =
      allowedValue[Math.floor(Math.random() * allowedValue.length)];
    hash = hash + element;
  }

  return hash;
}
// For Creating a shareable link for your second brain
app.post('/api/v1/brain/share', async(req: CustomRequest,res: Response)=>{
    try{
        const hash = genHash(10);
        const shareLink = req.body.share;
        let linkDoc = await Link.findOne({userId: req.userId});
        if (shareLink === "true") {
          if (!linkDoc) {
            // Create new share link
            const hash = genHash(10)
            linkDoc = await Link.create({
              hash: hash,
              userId: req.userId,
            })
          }

          return res.status(200).json({
            message: "Share link created successfully",
            shareUrl: `/api/v1/brain/${linkDoc.hash}`,
          })
        } else {
          // If shareLink is "false", optionally delete the existing link
          if (linkDoc) {
            await Link.deleteOne({ userId: req.userId })
          }

          return res.status(200).json({
            message: "Share link disabled",
          })
        }
    }
    catch(error){
        return res.status(500).json({
            message: error
        });
    }
})

// For Fetching another user's shared brain content
app.get('/api/v1/brain/:shareLink', async (req: Request,res: Response)=>{
    try{
        const hash = req.params.shareLink;
        const linkDoc = await Link.findOne({hash: hash});
        if(linkDoc){
            const contents = await Content.find({userId: linkDoc.userId}).populate("userId", "username");
            return res.status(200).json({
                message: contents
            });
        }
        return res.status(404).json({
            message: "shared Link Doesn't Exists"
        });
    }
    catch(error){
        return res.status(500).json({
            message: error
        })
    }
})
app.listen(3000);