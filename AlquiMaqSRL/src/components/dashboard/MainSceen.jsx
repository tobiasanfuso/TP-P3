import React from 'react'
import { useState } from 'react'
import './MainScreen.css'
import { useNavigate } from 'react-router-dom'

const MainScreen = ({ user, setUser }) => {
  const navigate = useNavigate();

  // Define el rol actual desde user
  const currentRole = user.role;

  // Maneja el cierre de sesión
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  // Maneja el cambio de rol solo si es sysadmin
  const handleRoleChange = (e) => {
    setUser({ ...user, role: e.target.value });
  };

  // Construcción del menú de navegación basado en el rol
  const navItems = [
    <li className="nav-item" key="home">
      <a className="nav-link" href="#home">Inicio</a>
    </li>
  ];

  if (user.role === "customer") {
    navItems.push(
      <li className="nav-item" key="apply">
        <a className="nav-link" href="#">Solicitar alquiler</a>
      </li>,
      <li className="nav-item" key="my-applys">
        <a className="nav-link" href="#">Mis solicitudes</a>
      </li>
    );
  }

  if (user.role === "admin" || user.role === "sysadmin") {
    navItems.push(
      <li className="nav-item" key="management">
        <a className="nav-link" href="#">Gestión de usuarios</a>
      </li>
    );
  }

  if (user.role === "sysadmin") {
    navItems.push(
      <li className="nav-item" key="admin-panel">
        <a className="nav-link" href="#">Panel de control</a>
      </li>
    );
  }

  return (
    <div className="container-fluid">
      <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-light">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <h1 className="navbar-brand text-primary">AlquiMaq S.R.L</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {navItems}
              </ul>
            </div>
          </div>
        </nav>
        <div className="d-flex align-items-center">
          {currentRole === "sysadmin" && (
            <div className="me-3">
              <label htmlFor="roleSelect" className="me-2">Cambiar rol:</label>
              <select
                id="roleSelect"
                className="form-select form-select-sm"
                value={user.role}
                onChange={handleRoleChange}
              >
                <option value="customer">Cliente</option>
                <option value="admin">Administrador</option>
                <option value="sysadmin">Super Administrador</option>
              </select>
            </div>
          )}
          <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main className="p-4">
        <h2>Bienvenido {currentRole} a AlquiMaq S.R.L</h2>
        <p>Esta es la pantalla principal del sistema.</p>
        {currentRole === "sysadmin" && (
          <p>Recuerda que puedes cambiar tu rol desde el menú de navegación.</p>
        )}

        <div className="row">
          <div className="col-md-4">
            <div className="card mb-3">
              <img
                src="https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2"
                className="card-img-top"
                alt="Agricola 1"
              />
              <div className="card-body">
                <h5 className="card-title">Agricola 1</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
                <button className="btn btn-primary">+ Detalles</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center p-3 bg-secondary text-light">
        <p>© 2025 AlquiMaq S.R.L. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainScreen