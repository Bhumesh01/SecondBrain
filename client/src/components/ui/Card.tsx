import { useState, type ReactElement } from "react"
import { AudioIcon } from "../../icons/audioIcon"
import { DocumentIcon } from "../../icons/documentIcon"
import { ImageIcon } from "../../icons/imageIcon"
import { LinkIcon } from "../../icons/linkIcon"
import { TwitterIcon } from "../../icons/tweetIcon"
import { VideoIcon } from "../../icons/videoIcon"
import { YoutubeIcon } from "../../icons/youtubeIcon"
import { DeleteIcon } from "../../icons/deleteIcon"
import { Tweet } from 'react-tweet';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import axios from 'axios'
import { useContent } from "../../hooks/useContent"
export interface Tag {
  _id: string;
  title: string;
}
const url = import.meta.env.VITE_BACKEND_URL;
interface CardProps {
    "title": string,
    "type": 'video'| 'article'| 'image'| 'audio'| 'document'| 'tweet'| 'youtube'| 'link',
    "link": string,
    "tags"?: Tag[],
    "contentId"?: string,
    "setMessage"?: (msg: string) => void;
    "setError"?: (err: string) => void;
    "isShared"?: boolean; 
}
type iconTypes = Record<string, ReactElement>
const iconType:iconTypes = {
    "video": <VideoIcon />,
    "audio": <AudioIcon />,
    "image": <ImageIcon />,
    "article": <DocumentIcon />,
    "document": <DocumentIcon />,
    "tweet": <TwitterIcon />,
    "youtube": <YoutubeIcon />,
    "link": <LinkIcon />
}

const extractYouTubeId = (url: string): string => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : ""
}
const extractTweetId = (url: string): string => {
  const match = url.match(/status\/(\d+)/)
  return match ? match[1] : ""
}
export const Card = (props:CardProps)=>{
  const {refresh} = useContent();
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const icon: ReactElement = iconType[props.type]
  const tweetId = props.type === "tweet" ? extractTweetId(props.link) : ""
  const youTubeId = props.type === "youtube" ? extractYouTubeId(props.link) : ""
  async function deleteCard(){
    if (!props.contentId) return;
    setIsDeleting(true);
    try {
        const response = await axios.delete(`${url}/api/v1/content/${props.contentId}`, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        });
        refresh();
        props.setMessage?.(response?.data?.message || "Failed to delete");
        setTimeout(()=>{
            props.setMessage?.("");
        }, 1000)
    } catch (err: any) {
      props.setError?.(err?.response?.data?.message || "Failed to delete");
      console.error("Delete error:", err);
      setTimeout(()=>{
            props.setError?.("");
        }, 1000)
    } finally {
      setIsDeleting(false);
  }
  }
    return(
        <div className="bg-white w-90 max-w-md py-5 px-8 rounded-3xl shadow-2xl border border-slate-200 flex justify-between flex-col max-h-[400px]">
            <div className="flex gap-1 justify-between pb-2 pt-2">
                <div className="flex gap-2 text-3xl">
                    <div className="flex justify-center items-center mr-2 text-purpleBlue-600">
                        {icon}
                    </div>
                    <h1 className="font-bold text-2xl">{props.title}</h1>
                </div>
                    {props.isShared && (
                        <div className="flex justify-end pl-3 items-start">
                        <button onClick={deleteCard} className="p-1 hover:bg-gray-300 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled={isDeleting}> <DeleteIcon /></button></div>)}
            </div>
            <div className="pb-5 flex-1 overflow-y-auto">
                {props.type === "link"?(<a target="_blank" rel="noopener noreferrer" href={props.link} className="text-lg text-blue-800 hover:text-purpleBlue-500 break-words">{props.link}</a>):props.type === "tweet" && tweetId?(<Tweet id={tweetId} />):props.type === "youtube"&& youTubeId?(<LiteYouTubeEmbed id={youTubeId} title={props.title}poster="maxresdefault" />): props.type === "image" ? (<img src={props.link || "/placeholder.svg"} alt={props.title}className="w-full h-auto rounded-lg object-cover"/>) : ( <div className="text-lg break-words">{props.link}</div>)}
            </div>
            <div className="flex gap-5 flex-wrap">
                {(props.tags||[]).map((tag, index)=><span key={index} className="bg-purpleBlue-300 text-purpleBlue-600 rounded-2xl py-1 px-3">#{tag.title}</span>)}
            </div>
        </div>
    )
}