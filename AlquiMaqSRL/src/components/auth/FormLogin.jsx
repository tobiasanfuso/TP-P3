import React from 'react';
import { Card, Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './FormLogin.css';
import 'react-toastify/dist/ReactToastify.css'
import { toast,Zoom} from 'react-toastify';



const FormLogin = ({ setUser, onLogin }) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ userName: false, password: false })

  const navigate = useNavigate();



  const handleUserChange = (e) => {
    setUserName(e.target.value)
    setErrors({ ...errors, userName: false })
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setErrors({ ...errors, password: false })
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {
    userName: userName.trim() === "",
    password: password.trim().length < 7,
  };

  setErrors(newErrors);

  if (newErrors.userName || newErrors.password) {
    if (newErrors.userName) toast.error("El campo usuario es obligatorio");
  if (newErrors.password) toast.error("La contraseña debe tener al menos 7 caracteres");
  return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userName, password }),
    });

    const data = await response.json();

    if (!response.ok) {
  const message = data?.message || `Error ${response.status}: ${response.statusText}`;
  toast.error(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Zoom,
  });
  return;
}

    if (data.user && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.role);

      setUser({ name: data.user.username, role: data.user.role });

      onLogin();
      navigate("/main");
    } else {
      toast.error("Datos de usuario inválidos");
    }
  } catch (error) {
    console.error("Error al loguearse", error);
    toast.error("Error al loguearse", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Zoom,
    });
  }
}


  return (
    <Card className="mt-5 mx-3 p-3 px-5 shadow form-card display-flex flex-column align-items-center">
      <Card.Body>
        <Row className="mb-2">
          <h5>¡Bienvenidos a AlquiMaq S.R.L!</h5>
        </Row>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="username"
              required
              className={errors.userName && "border border-danger"}
              placeholder="Ingresar usuario"
              onChange={handleUserChange}
              value={userName} />
            {/* <p className="text-danger mt-2">{errors.userName && "El campo usuario es obligatorio"}</p> */}
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Control
              className={errors.password && "border border-danger"}
              type="password"
              required
              placeholder="Ingresar contraseña"
              onChange={handlePasswordChange}
              value={password}
            />
            {/* <p className="text-danger mt-2">{errors.password && "La contraseña es incorrecta"}</p> */}
          </FormGroup>
          <Button variant="secondary" type="submit">
            Iniciar sesión
          </Button>

          <div className="text-center mt-3">
            <span>¿No tenés cuenta?</span>{" "}
            <Button variant="secondary" className='p-1' onClick={() => navigate("/register")}>
              Registrarse
            </Button>

          </div>
        </Form>
      </Card.Body>
    </Card>

  )
}

export default FormLogin