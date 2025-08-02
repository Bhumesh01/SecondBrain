import { useEffect, useState } from "react";
import axios from "axios";
import type{ Tag } from "../components/ui/Card";
interface ContextTypes{
    link: string,
    type: 'video'| 'article'| 'image'| 'audio'| 'document'| 'tweet'| 'youtube'| 'link',
    title: string,
    tags: Tag[]
}
const url = import.meta.env.VITE_BACKEND_URL
export function useContent(){
    try{
        const [contents, setContents] = useState<ContextTypes[]>([])
        useEffect(function(){
            axios.get(`${url}/api/v1/content`, {
                    headers:{
                        "Authorization": localStorage.getItem("token"),
                    }
            }).then((response)=>{
                setContents(response.data.contents)})
        }, []);
        return contents;
     }
    catch(error){

    }
}