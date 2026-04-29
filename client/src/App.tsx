import './App.css'
import { Dashboard } from './pages/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { AnotherDashboard } from './pages/anotherUserDashboard'
import Home from './pages/home'
import ItemWisePage from './pages/ItemWise'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/brain/:shareId' element={<AnotherDashboard />}></Route>
        <Route path='/tweets' element={<ItemWisePage />}></Route>
        <Route path='/youtube' element={<ItemWisePage />}></Route>
        <Route path='/articles' element={<ItemWisePage />}></Route>
        <Route path='/images' element={<ItemWisePage />}></Route>
        <Route path='/links' element={<ItemWisePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
