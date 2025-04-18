import React from 'react'
import { useState } from 'react'
import './FormLogin.css'



const FormLogin = ({ setUser }) => {
  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (usuario === "" || password === "") {
      setError(true)
      return
    }
    setError(false)
    setUser([usuario])
  }

  return (
    <div className='bg-dark vh-100 vw-100'>
      <div className='text-center py-4'>
        <h1 className='text-light'>AlquiMaq S.R.L🛠️</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center bg-dark vh-100 vw-100">
        <div className="card bg-light text-dark p-4 shadow-lg rounded border border-secondary"
          style={{ width: '100%', maxWidth: '700px' }}>
          {/* <h2 className="text-center mb-4">Iniciar Sesión</h2> */}
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
            {error && <div className="text-danger mb-3">Por favor completa todos los campos.</div>}
            <button type="submit" className="btn btn-primary w-100">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormLogin