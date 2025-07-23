import { Item } from "./SidebarItems"
import Logo from "../../icons/brain.svg"
import { TwitterIcon } from "../../icons/tweetIcon"
import { YoutubeIcon } from "../../icons/youtubeIcon"
import { ImageIcon } from "../../icons/imageIcon"
import { DocumentIcon } from "../../icons/documentIcon"
import { LinkIcon } from "../../icons/linkIcon"

export const SideBar = () => {
  return (
    <div className="bg-white shadow-2xl rounded-r-3xl p-3 h-full flex flex-col">
      <div className="flex pb-10 gap-5 flex-wrap">
        <div>
          <img width={150} src={Logo || "/placeholder.svg"} alt="Brain Logo" />
        </div>
        <div className="flex justify-center items-center font-bold text-4xl ml-2">Second Brain</div>
      </div>
      <div className="p-2 flex flex-col gap-5 justify-start flex-1">
        <div className="rounded-3xl hover:bg-bgGray-100 transition-colors duration-200">
          <Item icon={<TwitterIcon />} type="Tweets" />
        </div>
        <div className="rounded-3xl hover:bg-bgGray-100 transition-colors duration-200">
          <Item icon={<YoutubeIcon />} type="YouTube Links" />
        </div>
        <div className="rounded-3xl hover:bg-bgGray-100 transition-colors duration-200">
          <Item icon={<DocumentIcon />} type="Documents" />
        </div>
        <div className="rounded-3xl hover:bg-bgGray-100 transition-colors duration-200">
          <Item icon={<ImageIcon />} type="Images" />
        </div>
        <div className="rounded-3xl hover:bg-bgGray-100 transition-colors duration-200">
          <Item icon={<LinkIcon />} type="Links" />
        </div>
      </div>
    </div>
  )
}
