import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PlusIcon } from '../icons/plusIcon'
import { ShareIcon } from '../icons/shareIcon'
import { SideBar } from '../components/ui/SideBar'
import { useEffect, useState } from 'react'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import SideBarIcon from '../icons/sideBarIcon'
import { SearchIcon } from '../icons/searchIcon'
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL
const frontendUrl = import.meta.env.VITE_REACT_APP_FRONTEND_URL
export function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);
  const {contents, refresh}  = useContent();
  const [showSideBar, setShowSidebar] = useState<boolean>(false);
  useEffect(()=>{
    refresh();
  }, [ModalOpen])
  return (
    <div className='bg-bgGray-100 min-h-screen flex'>
      <div className='sm:block hidden transition ease-in-out duration-200'>
        <SideBar />
      </div>
      <div className='sm:hidden block absolute py-2 px-6 z-[60]' onClick={() => setShowSidebar(prev => !prev)}>
        <SideBarIcon />
      </div>
      {showSideBar && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      <div className={`sm:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300  ${showSideBar ? "translate-x-0" : "-translate-x-full hidden"}`}>
        <SideBar />
      </div>
      <div className='pt-5 sm:ml-76 w-full'>
        <div className=' flex p-2 pt-5 flex-wrap'>
          <div className='flex-[2] font-bold text-3xl pl-4'>
            All Notes
          </div>
          <div className='flex-[3] flex sm:flex-row flex-col gap-5 lg:gap-2 justify-around xl:flex-[1.5]  2xl:flex-[1]'>
            <div className="flex items-center w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
  
              <input type="text" placeholder="Search notes, links, videos..." className=" flex-1 px-4 py-3 outline-none text-gray-700 placeholder:text-gray-400" />

              <button className=" h-full px-5 bg-purpleBlue-500 hover:bg-purpleBlue-600 text-white transition-colors flex items-center justify-center">
                <SearchIcon />
              </button>    
            </div>
            <Button loading={loading} variant="secondary" size="lg" text="Share Brain" onClick={()=>{
              setLoading(true);
              axios.post(`${url}/api/v1/brain/share`, {
                share: "true"
              }, {
                headers:{
                  Authorization: localStorage.getItem("token")
                }
              }).then(response=>{
                let shareUrl = response.data.shareUrl.split("brain/")[1];
                navigator.clipboard.writeText(`${frontendUrl}/brain/${shareUrl}`);
                alert(`Url copied to clipboard: ${frontendUrl}/brain/${shareUrl}`);
                setLoading(false);
              })
            }} startIcon={<ShareIcon />}></Button>
            <Button variant="primary" size="lg" text="Add Content" onClick={()=>{setModalOpen(true)}} startIcon={<PlusIcon />}></Button>
          </div>
        </div>
        <CreateContentModal open={ModalOpen} onClose={()=>{setModalOpen(false)}}/>
          {message&&(
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 border border-green-600 rounded-lg p-4 text-white font-semibold backdrop-blur-sm">
              <div className="flex items-center space-x-2 gap-1 justify-center">
                <span className="text-green-300">✓</span>
                <span>{message}</span>
              </div>
            </div>
          )}
            {error&&(
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 border border-red-500 rounded-lg p-4 text-white font-semibold backdrop-blur-sm">
              <div className="flex items-center space-x-2 gap-1 justify-center">
                <span className="text-red-300">⚠</span>
                <span>{error}</span>
              </div>
            </div>
          )}
        <div className='flex gap-10 flex-wrap justify-center pt-10'>
          {contents?.map((content, id)=> <Card isShared={true} key={id}contentId={content._id}  setError={setError} setMessage={setMessage} title={content.title} type={content.type} link={content.link} tags={content.tags} />)}
          {contents.length === 0 && (
          <div className="mt-20 flex justify-center">
            <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Posts Available</h2>
              <p className="text-gray-500">You haven't created any posts yet. Click the "+" button to get started!</p>
            </div>
          </div> )}
        </div>
      </div>
    </div>
  )
}
