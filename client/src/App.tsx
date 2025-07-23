import './App.css'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { PlusIcon } from './icons/plusIcon'
import { ShareIcon } from './icons/shareIcon'
import { SideBar } from './components/ui/SideBar'
import { useState } from 'react'
import { CreateContentModal } from './components/ui/CreateContentModal'
function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className='bg-bgGray-100 min-h-screen min-w-screen flex'>
      <div className='w-1/4 sm:block hidden'>
        <SideBar />
      </div>
      <div className='pt-5 flex-1'>
        <div className=' flex p-2 flex-wrap'>
          <div className='flex-3/5 font-bold text-3xl pl-5'>
            All Notes
          </div>
          <div className='flex-2/5 flex gap-5 justify-around'>
            <Button variant="secondary" size="lg" text="Share Brain" onClick={()=>{alert("Hi")}} startIcon={<ShareIcon />}></Button>
            <Button variant="primary" size="lg" text="Add Content" onClick={()=>{setOpen(curr=>!curr)}} startIcon={<PlusIcon />}></Button>
          </div>
        </div>
        <CreateContentModal open={open} onClose={<h1 className='text-2xl text-white'>Hello</h1>}/>
        <div className='flex gap-10 flex-wrap justify-center pt-10'>
          <Card title='How to build a second Brain' type="article" link='The best way to learn is to build in public, Share your progress, get feedback, and help others along the way' tags={["productivity", "learning"]} />
          <Card title='Solana Bootcamp' type="tweet" link='https://x.com/SuperteamIN/status/1946130006029344810' tags={["productivity", "learning"]} />
          <Card title='Cohort  Website' type="link" link='https://app.100xdevs.com' tags={["productivity", "learning"]} />
          <Card title='Project Ideas' type="document" heading='Future Project' link='Build a personal knowledge base, create a habit tracker, Design  a minimalist todo app' tags={["productivity", "ideas"]} />
          <Card title='Open Source' type="link" link='https://docs.google.com/spreadsheets/d/12TYRJSwCimT8DIBT4UKKUGR7lrpG2lzTNK82Zc1LwO0/edit?gid=0#gid=0' tags={["productivity", "learning"]} />
          <Card title='How to build a second Brain' type="audio" link='https://app.100xdevs.com' tags={["productivity", "learning"]} />
          <Card title='How to Land a Job in 6 Months' type="youtube" link='https://www.youtube.com/embed/4XVvbZj794o?si=slyGl0FqXe-otCiQ' tags={["productivity", "learning"]} />
          <Card title='My Painting' type="image" link='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8SyZBgOL7rmplnae3xAfi0D-to5rWUh-VPg&s' tags={["Birds", "comfort"]} />
        </div>
      </div>
    </div>
  )
}

export default App
