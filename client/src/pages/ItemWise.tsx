import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button";
import type{ ContextTypes } from "../hooks/useContent";
import axios from "axios";
import { Card } from "../components/ui/Card";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL
export default function ItemWisePage(){
    const [type, setType] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
    const raw = location.pathname.split("/")[1];
    const titleCase =
  raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    setType(titleCase);
        
    },[]);
    const [data, setData] = useState<ContextTypes[]>([]);
    useEffect(()=>{
        const contentType = location.pathname.split("/")[1];
        axios.get(`${url}/api/v1/content/${contentType}`, {
            headers:{
                    "Authorization": localStorage.getItem("token"),
                }
        }).then((response)=>{
            setLoading(false);
            setData(response.data.contents);}).catch((err)=>{
            console.log(err);
        });
    
    }, [location.pathname]);
    return(
        <div className="bg-bgGray-100 min-h-screen min-w-screen">
            <div className="flex pb-2 px-2 pt-2 gap-2 flex-wrap justify-between w-screen border-b border-slate-400">
                <div className="font-bold text-5xl sm:text-3xl">{type}</div>
                <Button size="2xl" variant="primary" text=" Return To DashBoard" onClick={()=>{navigate("/dashboard")}}></Button>
            </div>
            <div>
                {loading?<div className="flex items-center justify-center h-[70vh] w-full flex-col gap-4 text-xl text-gray-600">
        <svg
            className="animate-spin w-10 h-10 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
        >
            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeOpacity="0.75" />
        </svg>
        <div className="animate-pulse">Fetching your Data...</div>
        </div>:
            <div className='flex gap-10 flex-wrap justify-center pt-10'>
          {data.length===0?(
        <div className="mt-20 flex justify-center">
          <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Content Available</h2>
            </div>
        </div>):(data.map(({type, link, title, tags}, id)=> <Card isShared={false} key={id} title={title} type={type} link={link} tags={tags} />))}
        </div>}
            </div>
        </div>
    )
}