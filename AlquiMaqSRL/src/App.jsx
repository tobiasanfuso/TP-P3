import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer, Zoom } from 'react-toastify';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import FormLogin from './components/auth/FormLogin'
import FormRegister from './components/auth/FormRegister';
import MainScreen from './components/dashboard/MainSceen'
import NotFound from './components/dashboard/NotFound';




function App() {
  const ProtectedRoute = ({ isSignedIn }) => {
    if (!isSignedIn) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogIn = () => {
    setLoggedIn(true);
  }
  const handleLogOut = () => {
    setLoggedIn(false);
    setUser(null);
  }
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<FormLogin onLogin={handleLogIn} setUser={setUser} />} />
          <Route path='/register' element={<FormRegister/>}/>
    
          <Route element={<ProtectedRoute isSignedIn={loggedIn} />}>
            <Route path='/main' element={<MainScreen user={user} setUser={setUser} logOut={handleLogOut} />} />
          </Route>
  
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    transition={Zoom}
                />
    </div>
  );
}

export default App
