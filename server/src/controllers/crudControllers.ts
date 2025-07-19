import { authMiddleware } from "../middleware/middleware";
import genHash from "../config/hash";
import { Content, Link } from "../models/db";
import {Request, Response} from 'express';
import {z} from 'zod';
// For Adding new content

const objectIdString = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");
const contentZodSchema = z.object({
    link: z.string().url("Invalid URL format").min(7, "Link is required"),
    type: z.enum(['video', 'article', 'image', 'audio', 'document', 'tweet', 'youtube', 'link']),
    title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title cannot exceed 200 characters"),
    tags: z.array(objectIdString).optional()
})
interface CustomRequest extends Request {
    userId?: string;
}
export const postContent = async(req: CustomRequest,res: Response)=>{
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
};

// For Fetching all existing documents
export const showContent = async (req: CustomRequest,res: Response)=>{
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
};

// For Deleting a document
export const deleteContent = async(req: CustomRequest,res: Response)=>{
    try{
        const contentId = req.body.contentId;
        const response = await Content.deleteOne({
            _id: contentId,
            userId: req.userId
        });
        if (response.deletedCount === 0) {
            return res.status(403).json({ message: "No such content exists" });
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
};

// For Creating a shareable link for your second brain
export const shareLink = async(req: CustomRequest,res: Response)=>{
    try{
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
};

// For Fetching another user's shared brain content
export const getLink = async (req: Request,res: Response)=>{
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
};