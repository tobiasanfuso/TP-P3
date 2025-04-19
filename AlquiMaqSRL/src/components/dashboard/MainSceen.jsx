import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ProductCard from '../ProductCard/ProductCard'
import './MainScreen.css'

const MainScreen = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, title: "Agricola 1", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" },
    { id: 2, title: "Agricola 2", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" },
    { id: 3, title: "Agricola 3", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" },
    { id: 4, title: "Agricola 4", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" },
    { id: 5, title: "Agricola 5", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" },
    { id: 6, title: "Agricola 6", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" }
  ])

  const currentRole = user.role;
  const currentUser = user.name;

  //cierre de sesion
  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  //agregar producto (admin y sysadmin)
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      title: `Agricola ${products.length + 1}`,
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2"
    };
    setProducts([...products, newProduct]);
  }

  //si es sysadmin puede cambiar el rol de los demas
  const handleRoleChange = (e) => {
    setUser({ ...user, role: e.target.value });
  };

  //menu segun el rol
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
        <h2>Bienvenido {currentUser} a AlquiMaq S.R.L</h2>
        <p>Esta es la pantalla principal del sistema.</p>
        {currentRole === "admin" || currentRole === "sysadmin" ? (
          <button className="btn btn-success mb-3" onClick={handleAddProduct}>Agregar Producto</button>
        ) : null}

        <div className="row">
          {products.map(product => (
            <div className="col-md-4 mb-3" key={product.id}>
              <ProductCard
                title={product.title}
                description={product.description}
                image={product.image}
                onDetails={() => alert(`Detalles de ${product.title}`)}
              />
            </div>
          )
          )
          }
        </div>
      </main>

      <footer className="text-center p-3 bg-secondary text-light">
        <p>© 2025 AlquiMaq S.R.L. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainScreen