import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css'
<<<<<<< Updated upstream
=======
import 'bootstrap/dist/css/bootstrap.min.css'

import FormLogin from './components/auth/FormLogin'
import MainScreen from './components/dashboard/MainSceen'


>>>>>>> Stashed changes

const ProtectedRoute = ({ user, element }) => {
  return user !== null ? element : <Navigate to="/login" />;
};

function App() {
<<<<<<< Updated upstream
  

  return (
    <h1>ALQUIMAQ</h1>
  )
=======
  const [user, setUser] = useState(null); // Estado inicial del usuario

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route path="/login" element={<FormLogin setUser={setUser} />} />

        {/* Ruta protegida para MainScreen */}
        <Route
          path="/main"
          element={<ProtectedRoute user={user} element={<MainScreen user={user} setUser={setUser} />} />}
        />

        {/* Redirige cualquier otra ruta al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
>>>>>>> Stashed changes
}

export default App
