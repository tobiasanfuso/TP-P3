import React from 'react'
import { useState } from 'react'
import './FormLogin.css'



const FormLogin = ({setUser}) => {
  const [usuario,setUsuario] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState(false)

  const handleSubmit = (e) =>{
    e.preventDefault()

    if (usuario === "" || password === ""){
      setError(true)
      return
    }
    setError(false)
    setUser([usuario])
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow" style={{ width: '97%', maxWidth: '1280px', maxHeight: '720px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormLogin