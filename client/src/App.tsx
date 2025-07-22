import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/plusIcon'
import { ShareIcon } from './icons/shareIcon'
function App() {

  return (
    <div className='p-5'>
      <div className=' flex border-2 border-b-blue-800 p-2 rounded-2xl'>
        <div className='flex-3/5 font-bold text-3xl'>
          All Notes
        </div>
        <div className='flex-2/5 flex gap-5 justify-around'>
          <Button variant="secondary" size="lg" text="Add Content" onClick={()=>{alert("Hi")}} startIcon={<ShareIcon />}></Button>
          <Button variant="primary" size="lg" text="Add Content" onClick={()=>{alert("Hi")}} startIcon={<PlusIcon />}></Button>
        </div>
      </div>
    </div>
  )
}

export default App
