import React from 'react';
import { Card, Form, Button, Row, Col, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState,useRef } from 'react';
import './FormLogin.css';



const FormLogin = ({ setUser, onLogin }) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const userRef = useRef(null)
  const passwordRef = useRef(null)

  const [errors, setErrors] = useState({
    userName:false,
    password:false
  })


  const handleUserChange = (e) => {
    setUserName(e.target.value)
    setErrors({ ...errors, userName: false })
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setErrors({ ...errors, password: false })
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    //logica de validacion

    if (!userRef.current.value.length) {
      setErrors({ ...errors, userName: true })
      userRef.current.focus()
      return
    }
    else if (!passwordRef.current.value.length || password.length < 7) {
      setErrors({ ...errors, password: true })
      passwordRef.current.focus()
      return
    }
    setErrors({userName: false, password: false})
    
    //logica de roles
    let role = "customer";
    if (userName.toLowerCase() === "admin") {
      role = "admin";
    } else if (userName.toLowerCase() === "sysadmin") {
      role = "sysadmin";
    }

    setUser({ name: userName, role });
    onLogin();
    navigate("/main");
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
              ref={userRef}
              placeholder="Ingresar usuario"
              onChange={handleUserChange}
              value={userName} />
              <p className="text-danger mt-2">{errors.userName && "El campo usuario es obligatorio"}</p>
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Control
            className={errors.password && "border border-danger"}
              type="password"
              required
              ref={passwordRef}
              placeholder="Ingresar contraseña"
              onChange={handlePasswordChange}
              value={password}
              />
              <p className="text-danger mt-2">{errors.password && "La contraseña es incorrecta"}</p>
          </FormGroup>
          <Row>
            <Col />
            <Col md={6} className="d-flex justify-content-end">
              <Button variant="secondary" type="submit">
                Iniciar sesión
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
              
  )
}

export default FormLogin