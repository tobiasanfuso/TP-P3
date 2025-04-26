import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NewProduct from '../NewProduct/NewProduct'
import ProductCard from '../ProductCard/ProductCard'
import './MainScreen.css'

const MainScreen = ({ user, setUser,logOut }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, title: "Agricola 1", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" },
    { id: 2, title: "Agricola 2", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" },
    { id: 3, title: "Agricola 3", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", image: "https://placeholder.pics/svg/400x250/FFDEAA-FFA2A2" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentRole = user.role;
  const currentUser = user.name;


  //cierre de sesion
  const handleLogout = () => {
    logOut()
    navigate("/login");
    setUser(null);
    
  };
  const handleProfile = () => {
    // Lógica para mostrar el perfil del usuario
    alert(`Perfil de ${currentUser}`);}

  //agregar producto (admin y sysadmin)
  const handleAddProduct = (newProduct) => {
    const productWhithId = { ...newProduct, id: products.length + 1 };
    setProducts([...products, productWhithId]);
  }


  //menu segun el rol
  const navItems = [
    <li className="nav-item" key="home">
      <a className="nav-link" href="#home">Inicio</a>
    </li>
  ];

  if (user.role === "customer" || user.role === "admin" || user.role === "sysadmin") {
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
    <div className="container-fluid ">
      <header> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid ">
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
          <button className="btn btn-primary me-2" onClick={handleProfile}>{currentUser}</button>
          <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main className="p-4">
        <h2>Bienvenido {currentUser} a AlquiMaq S.R.L</h2>
        <p>Esta es la pantalla principal del sistema.</p>
        {(currentRole === "admin" || currentRole === "sysadmin") && (
          <button className="btn btn-success mb-4" onClick={() => setIsModalOpen(true)}>Agregar Producto</button>
        )}
        {isModalOpen && (
          <NewProduct
            onSave={handleAddProduct}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <div className="row g-3">
          {products.map(product => (
            <div className="col-12 col-sm-6 col-md-4 mb-3" key={product.id}>
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
      <footer className="text-center p-3 bg-secondary text-light vw-100">
        <p>© 2025 AlquiMaq S.R.L. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
};

export default MainScreen