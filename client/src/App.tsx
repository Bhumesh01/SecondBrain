import './App.css'
import { Dashboard } from './pages/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { AnotherDashboard } from './pages/anotherUserDashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/brain/:shareId' element={<AnotherDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
