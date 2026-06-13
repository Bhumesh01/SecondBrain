import { Pinecone } from '@pinecone-database/pinecone';
import {z} from "zod";
import { contentZodSchema } from '../controllers/crudControllers';
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.PINECONE_DB_API_KEY;
const HOST = process.env.PINECONE_DB_HOST;
const INDEX_NAME = process.env.PINECONE_DB_INDEX_NAME;
const pc = new Pinecone({
  apiKey: API_KEY!
});
export async function insertRecords(data:z.infer<typeof contentZodSchema>, UserId: string, mongoDB_ID: string) {
    try{
        if(!INDEX_NAME || !HOST){
            console.log("Error connecting to pineconeDB");
            return "Error connecting";
        }
        if(!data || !UserId || !mongoDB_ID){
            console.log("Please enter all the details");
            return "Please enter all the details";
        }
        const userText = `
            Title: ${data.title}
            Type: ${data.type}
            Tags: ${(data.tags || []).join(", ")}
            `.trim();
        const namespace = pc.index(INDEX_NAME, HOST).namespace(UserId+"user");
        const response = await namespace.upsertRecords({
            records: [
                {
                    "id": mongoDB_ID,
                    "text": userText,
                    "title": data.title,
                    "link": data.link,
                    "category": data.type
                }
            ]
        });
        console.log(response);
        return "Successfully connected " + response;
    }
    catch(err){
        console.log(err);
        return "Error encountered";
    }
}

export async function getRecords(userQuery: string, UserId: string) {
    try{
        if(!INDEX_NAME || !HOST){
            console.log("Error connecting to pineconeDB");
            return "Error connecting";
        }
        const namespace = pc.index(INDEX_NAME, HOST).namespace(`${UserId}user`);
        const searchResponse = await namespace.searchRecords({
          query: {
            topK: 10,
            inputs: { text: userQuery },
          },
          fields: ['text','category', 'title', 'link'],
          rerank: {
            model: 'bge-reranker-v2-m3',
            rankFields: ['text'],
            topN: 5,
          },
        });
        console.log(searchResponse);
        return searchResponse;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export async function deleteRecords(UserId: string, contentId: string){
    try{
        if(!INDEX_NAME || !HOST){
            console.log("Error connecting to pineconeDB");
            return "Error connecting";
        }
        const namespace = pc.index(INDEX_NAME, HOST).namespace(`${UserId}user`);
        await namespace.deleteOne({id: contentId});
        console.log("Content deleted successfully");
    }
    catch(err){
        console.log("Error while deleting: " + err);
    }
}