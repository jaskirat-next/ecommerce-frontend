
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button, Container, Row, Col, Spinner, Card } from "react-bootstrap";
import  "../styles/signup.scss"




const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("")
    const [loading, setLoading] =useState("")


    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
    

        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
                role
            })

            localStorage.setItem("token", response.data.user.token);

            toast.success("Signup successful!")

            setTimeout(() => {
                navigate('/')
            }, 2000);
        }  catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    } 


    return (
        <Container className="signup-container">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="signup-card shadow-lg">
            <Card.Body>
              <h3 className="text-center mb-4">Create an Account</h3>

              {error && <p className="text-danger text-center">{error}</p>}

              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    className="signup-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Signing Up...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
    );
}

export default Signup;