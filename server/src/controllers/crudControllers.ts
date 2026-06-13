import genHash from "../config/hash";
import mongoose, {Types} from 'mongoose';
import { Content, Link, Tag, User } from "../models/db";
import {Request, Response} from 'express';
import {z} from 'zod';
import { deleteRecords, getRecords, insertRecords } from "../services/semanticSearch";
// For Adding new content

// const objectIdString = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");
export const contentZodSchema = z.object({
    link: z.string().min(7, "Link is required"),
    type: z.enum(['video', 'article', 'image', 'audio', 'document', 'tweet', 'youtube', 'link']),
    title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title cannot exceed 200 characters"),
    tags: z.array(z.string()).optional()
})
interface CustomRequest extends Request {
    userId?: string;
}
const contentTypes = ['video', 'article', 'image', 'audio', 'document', 'tweet', 'youtube', 'link'];
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
        let tagIds:Types.ObjectId[] = [];
        if(content.tags){
            const tagPromises = content.tags.map(async (tag) => {
            const existingTag = await Tag.findOne({ title: tag });
            if (!existingTag) {
                const newTag = await Tag.create({ title: tag });
                return newTag._id;
            } else {
                return existingTag._id;
            }
        });
        tagIds = await Promise.all(tagPromises);
        }
        const result = await Content.create({
            link: content.link,
            type: content.type,
            title: content.title,
            userId: userId,
            tags : tagIds
        });
        const mongoDB_ID = result._id;
        try{
            await insertRecords({
                link: content.link,
                type: content.type,
                title: content.title,
                tags : content.tags
            }, userId?.toString()!, mongoDB_ID.toString());
        }
        catch(error){
            console.log('Pinecone sync failed:', error);
        }
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
        if(!userId){
            return res.status(404).json({
                message: "Unauthorized"
            })
        }
        const userContent = await Content.find({
            userId: userId,
        }).populate("userId", "username").populate("tags", "title");
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
        const contentId = req.params.contentId;
        const response = await Content.deleteOne({
            _id: contentId,
            userId: req.userId
        });
        if (response.deletedCount === 0) {
            return res.status(403).json({ message: "No such content exists" });
        }
        await deleteRecords(req.userId?.toString()!, contentId);
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
            const contents = await Content.find({userId: linkDoc.userId}).populate("userId", "username").populate("tags", "title");
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

// getting the content by a type
export const getContentByType = async (req:CustomRequest, res: Response)=>{
    try{
        const contentType = req.params.id;
        if(!contentType|| !contentTypes.includes(contentType)){
            return res.status(400).json({
                message: "Invalid data",
            });
        }
        const userId = req.userId;
        const userContent = await Content.find({
            userId: userId,
            type: contentType
        }).populate("tags");
        res.status(200).json({
            contents: userContent
        });
    }
    catch(error){
        return res.status(400).json({
            message: error
        });
    }
}

// semantic search
export const getSemanticSearch = async(req:CustomRequest, res: Response)=>{
    try{
        const userId = req.userId;
        const query = req.body.query;
        if(!query){
            return res.status(400).json({
                message: "Please Enter the record to search"
            })
        }
        if(!userId){
            return res.status(404).json({
                message: "Unauthorized"
            })
        }
        const searchResponse = await getRecords(query, userId);
        return res.status(200).json(searchResponse);
    }
    catch(error){
        return res.status(500).json({
            message: error
        });
    }
}

// test
// export const migrate = async(req:CustomRequest, res: Response)=>{
//     try{
//         const userId = req.userId;
//         if(!userId){
//             return res.status(404).json({
//                 message: "Unauthorized"
//             })
//         }
//         const contents = await Content.find({userId: userId}).populate("tags", "title");;
//         let migrated = 0;
//         let failed = 0;
//         for(const content of contents){
//             const tags = content.tags.map(
//                 (tag: any) => tag.title
//             );
//             const data:z.infer<typeof contentZodSchema>  = {
//                 link: content.link as string,
//                 title: content.title as string,
//                 type: content.type as  z.infer<typeof contentZodSchema>["type"],
//                 tags: tags
//             };
//             try{
//                 await insertRecords(data, userId, content._id.toString());
//                 migrated++;
//             }
//             catch(err){
//                 console.error(
//                     `Failed: ${content._id}`,
//                     err
//                 );
//                 failed++;
//             }
//         }
//         return res.status(200).json({
//     message: "Migration completed",
//     migrated
// });
//     }
//     catch(error){
//         return res.status(500).json({
//             message: error
//         });
//     }
// }