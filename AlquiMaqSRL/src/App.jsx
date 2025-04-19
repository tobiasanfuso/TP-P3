import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import FormLogin from './components/auth/FormLogin'
import MainScreen from './components/dashboard/MainSceen'



const ProtectedRoute = ({ user, element }) => {
  return user !== null ? element : <Navigate to="/login" />;
};

function App() {
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
}

export default App
