import { useEffect, useState } from "react";
import axios from "axios";
import type{ Tag } from "../components/ui/Card";
export interface ContextTypes{
    link: string,
    type: 'video'| 'article'| 'image'| 'audio'| 'document'| 'tweet'| 'youtube'| 'link',
    title: string,
    tags: Tag[],
    _id?: string
}
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL
export function useContent(){
    const [contents, setContents] = useState<ContextTypes[]>([]);
    function refresh(){
        axios.get(`${url}/api/v1/content`, {
                    headers:{
                        "Authorization": localStorage.getItem("token"),
                    }
            }).then((response)=>{
                setContents(response.data.contents)})
    }
    try{
        useEffect(function(){
            let interval = setInterval(()=>{
                refresh()
            }, 10*1000)
            return ()=>{
                clearInterval(interval);
            }
        }, []);
        return {contents, refresh};
     }
    catch(error:any){
        setContents(error);
        return {contents, refresh};
    }
}