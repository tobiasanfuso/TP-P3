import React, { useState } from 'react'
import { Card, Row, Col, Button, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast,Zoom } from 'react-toastify';

export const FormRegister = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    //const [role, setRole] = useState("customer");
    const [errors, setErrors] = useState({ userName: "", password: "", email: "" });



    const handleUserChange = (e) => {
        setUserName(e.target.value);
        setErrors({ ...errors, username: "" });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors({ ...errors, password: "" });
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors({ ...errors, email: "" });
    }
    // const handleRoleChange = (e) => {
    //     setRole(e.target.value);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault()

        //validacion
        let validationErrors = { userName: "", password: "", email: "" };
        if (!username.length) {
            validationErrors.userName = "El campo usuario es obligatorio";
        }
        if (!password.length) {
            validationErrors.password = "La contraseña debe tener al menos 7 caracteres";
        }
        if (!email.includes('@') || !email.length) {
            validationErrors.email = "El email debe ser valido";
        }
        if (validationErrors.userName || validationErrors.password || validationErrors.email) {
            setErrors(validationErrors);
            return;
        }


        //envio al backend con fetch
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, })
            });
            const data = await response.json();

            if (response.ok) {
                toast.success();
                toast.success("Usuario registrado exitosamente", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom,
                });
            } else {
                toast.error(data.message || "Error al registrar");
            }
        } catch (error) {
            console.log("Error al registrar", error);
            toast.error("Intenta nuevamente");
        };
    };





    return (
        <Card className="mt-5 mx-3 p-3 px-5 shadow form-card display-flex flex-column align-items-center">
            <Card.Body>
                <Row className="mb-2">
                    <h5>¡Bienvenido a AlquiMaq S.R.L!</h5>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="email"
                            required
                            placeholder="Ingrese email"
                            onChange={handleEmailChange}
                            value={email}
                            className={errors.email && "border border-danger"}
                        />
                        <p className="text-danger mt-2">{errors.email}</p>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="text"
                            required
                            placeholder="Ingrese nombre de usuario"
                            onChange={handleUserChange}
                            value={username}
                            className={errors.userName && "border border-danger"}
                        />
                        <p className="text-danger mt-2">{errors.userName}</p>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control
                            type="password"
                            required
                            placeholder="Ingrese contraseña"
                            onChange={handlePasswordChange}
                            value={password}
                            className={errors.password && "border border-danger"}
                        />
                        <p className="text-danger mt-2">{errors.password}</p>
                    </Form.Group>
                    <Row>
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">
                                Registrarse
                            </Button>
                        </Col>
                    </Row>
                </Form>
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
            </Card.Body>
        </Card>


    );
};

export default FormRegister;
