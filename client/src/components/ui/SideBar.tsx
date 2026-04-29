import { Item } from "./SidebarItems"
import Logo from "../../icons/brain.svg"
import { TwitterIcon } from "../../icons/tweetIcon"
import { YoutubeIcon } from "../../icons/youtubeIcon"
import { ImageIcon } from "../../icons/imageIcon"
import { DocumentIcon } from "../../icons/documentIcon"
import { LinkIcon } from "../../icons/linkIcon"
import { useNavigate } from "react-router-dom"

export const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-2xl rounded-r-3xl p-3 h-full flex flex-col w-76 fixed inset-0 z-[9999] border-r border-bgGray-200">
      <div className="flex pb-10 gap-5 flex-wrap">
        <div>
          <img width={150} src={Logo || "/placeholder.svg"} alt="Brain Logo" />
        </div>
        <div className="flex justify-center items-center font-bold text-4xl ml-2">Brainly</div>
      </div>
      <div className="p-2 flex flex-col gap-5 justify-start flex-1 w-48">
        <div onClick={()=>{
          navigate("/tweet")
        }} className="transition ease-in-out active:scale-100 cursor:pointer active:bg-bgGray-200 hover:scale-75 rounded-3xl hover:bg-bgGray-100">
          <Item icon={<TwitterIcon />} type="Tweets" />
        </div>
        <div onClick={()=>{
          navigate("/youtube")
        }} className="transition ease-in-out active:scale-100 cursor:pointer active:bg-bgGray-200 hover:scale-75 rounded-3xl hover:bg-bgGray-100 duration-200">
          <Item icon={<YoutubeIcon />} type="YouTube Links" />
        </div>
        <div onClick={()=>{
          navigate("/article")
        }} className="transition ease-in-out active:scale-100 cursor:pointer active:bg-bgGray-200 hover:scale-75 rounded-3xl hover:bg-bgGray-100 duration-200">
          <Item icon={<DocumentIcon />} type="Articles" />
        </div>
        <div onClick={()=>{
          navigate("/image")
        }} className="transition ease-in-out active:scale-100 cursor:pointer active:bg-bgGray-200 hover:scale-75 rounded-3xl hover:bg-bgGray-100 duration-200">
          <Item icon={<ImageIcon />} type="Images" />
        </div>
        <div onClick={()=>{
          navigate("/link")
        }} className="transition ease-in-out active:scale-100 cursor:pointer active:bg-bgGray-200 hover:scale-75 rounded-3xl hover:bg-bgGray-100 duration-200">
          <Item icon={<LinkIcon />} type="Links" />
        </div>
      </div>
    </div>
  )
}
