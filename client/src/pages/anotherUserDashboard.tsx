import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Card } from "../components/ui/Card"
import type{ ContextTypes } from "../hooks/useContent"
import axios from "axios"

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL
export function AnotherDashboard() {
    const [loading, setLoading] = useState<boolean>(true);
    const {shareId} = useParams();
    const [data, setData] = useState<ContextTypes[]>([])
    useEffect(()=>{
        const fetchLink = async () => {
        try {
            const res = await axios.get(`${url}/api/v1/brain/${shareId}`);
            console.log(res.data);
            setData(res.data.message)
            setLoading(false);
        } catch (err) {
            console.error("Error fetching link", err);
            
        }
        };
        fetchLink();
    }, [shareId]);
    
    return (
    <div className='bg-bgGray-100 min-h-screen min-w-screen flex justify-center'>
      <div>
        <div className=' flex p-2 pt-5 gap-2 flex-wrap font-bold text-3xl justify-around w-screen bg-purpleBlue-600 text-white'>
            All Notes
        </div>
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
