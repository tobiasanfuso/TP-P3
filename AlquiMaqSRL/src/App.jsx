import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import FormLogin from './components/auth/FormLogin'
import Home from './components/dashboard/Home'



function App() {

  const [user,setUser] = useState([])

  return (
    <div className='App'>
      {
      !user.length
      ? <FormLogin setUser = {setUser} />
      : <Home/>
      }
    
   

    </div>
  )
}

export default App
