import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PlusIcon } from '../icons/plusIcon'
import { ShareIcon } from '../icons/shareIcon'
import { SideBar } from '../components/ui/SideBar'
import { useEffect, useState } from 'react'
import { CreateContentModal } from '../components/ui/CreateContentModal'
import { useContent } from '../hooks/useContent'
export function Dashboard() {
  const [ModalOpen, setModalOpen] = useState(false);
  const {contents, refresh}  = useContent();
  useEffect(()=>{
    refresh;
  }, [ModalOpen])
  return (
    <div className='bg-bgGray-100 min-h-screen min-w-screen flex'>
      <div className='sm:block hidden transition ease-in-out duration-200'>
        <SideBar />
      </div>
      <div className='pt-5 sm:ml-76'>
        <div className=' flex p-2 pt-5 gap-2 flex-wrap'>
          <div className='flex-[3] font-bold text-3xl pl-5'>
            All Notes
          </div>
          <div className='flex-[2] flex sm:flex-row flex-col gap-5 lg:gap-2 justify-around xl:flex-[1.5]  2xl:flex-[1]'>
            <Button variant="secondary" size="lg" text="Share Brain" onClick={()=>{alert("Hi")}} startIcon={<ShareIcon />}></Button>
            <Button variant="primary" size="lg" text="Add Content" onClick={()=>{setModalOpen(true)}} startIcon={<PlusIcon />}></Button>
          </div>
        </div>
        <CreateContentModal open={ModalOpen} onClose={()=>{setModalOpen(false)}}/>
        <div className='flex gap-10 flex-wrap justify-center pt-10'>
          {contents?.map(({type, link, title, tags}, id)=> <Card key={id} title={title} type={type} link={link} tags={tags} />)}
        </div>
      </div>
    </div>
  )
}
