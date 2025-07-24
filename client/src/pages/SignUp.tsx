import { Button } from '../components/ui/Button'
import Logo from '../icons/brain.svg'
export function SignUp(){
    return(
        <div className="h-screen w-full bg-radial-[at_50%_50%] from-purpleBlue-500 to-purpleBlue-300 flex justify-center items-center">
            <div className="bg-white/30 backdrop-blur-sm w-120 rounded-2xl h-120 outline outline-purpleBlue-300 flex flex-col gap-10 items-center flex-wrap m-5">
                <div className='flex justify-center items-center flex-wrap'>
                    <div><img width={150} src={Logo} /></div>
                    <div className='font-bold text-4xl'>Sign Up</div>
                </div>
                <div className='text-xl sm:text-2xl margin-2'>
                    <input type='text' placeholder='Enter Your username' className='outline outline-purpleBlue-100 text-center m-auto p-2 rounded-2xl' />
                </div>
                <div className='text-xl sm:text-2xl margin-2'>
                    <input type='password' placeholder='Enter Your Password' className='outline outline-purpleBlue-100 text-center m-auto p-2 rounded-2xl'/>
                </div>
                <div>
                    <Button text='Submit' variant='primary' size='2xl' onClick={()=>{}}/>
                </div>
            </div>
        </div>
    )
}