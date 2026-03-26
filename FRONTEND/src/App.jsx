import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/userLogin'
import UserSignup from './pages/userSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/captainSignup'
import { UserDataContext } from './context/UserContext'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'


const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/user-login' element={<UserLogin/>}/>
        <Route path='/riding' element={<Riding/>}/>
        <Route path='/user-signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<CaptainLogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/home' element={<UserProtectWrapper><Home/></UserProtectWrapper>}/>
        <Route path='/user-logout' element={<UserProtectWrapper><UserLogout/> </UserProtectWrapper>}/>
        <Route path='/captain-home' element={<CaptainProtectWrapper>
          <CaptainHome/>
          </CaptainProtectWrapper>}/>
        
      </Routes>
    </div>
  )
}

export default App
