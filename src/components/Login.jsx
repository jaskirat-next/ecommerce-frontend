import { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import api from "../api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../styles/login.scss"


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    
    
        try {
            const response = await api.post('/auth/loginUser', {
                 email,
                 password
            })
    
            localStorage.setItem("token", response.data.user.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            toast.success("Login Successful!")

            setTimeout(() => {
                navigate('/')

            }, 2000)
            
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }
    return (
        <Container className="login_container">
            <Row>
                <Col md={6} lg={5}>
                    <div className="login_card shadow-lg">
                    <h3>Login</h3>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <Form onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control
                        type="email" placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password" placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div>
                        <Button type="submit" 
                            variant="primary"
                            className="login_btn"
                            disabled={loading}
                        >
                            {
                                loading ? (
                                    <>
                                    <Spinner animation="border" size="sm" />
                                    Login....
                                    </>
                                ) : "Login"
                            }
                        </Button>
                        <ToastContainer />
                    </div>
                    </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;