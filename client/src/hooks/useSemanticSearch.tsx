import { useState } from "react";
import axios from "axios";
import type{ ContextTypes } from "./useContent";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL
export function useSemanticSearch(){
    const [searchResults, setSearchResults] = useState<ContextTypes[]>([]);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    function search(query:string){
        setSearchLoading(true);
        axios.post( `${url}/api/v1/content/search`,
        {
            query
        },
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        ).then((response)=>{
                setSearchResults(response.data.contents);}).catch((err)=>console.log(err)).finally(()=>setSearchLoading(false));
    }
    function clearResults() {
        setSearchResults([]);
    }
    return {searchResults, clearResults, search, searchLoading};
}