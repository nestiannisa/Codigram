import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Action/userAction";
import logo from "../asset/logo1.png";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
const [refresh, setRefresh] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("1.masuk handle submit");
    //add user
    navigate("/");
    setRefresh(true)
    window.location.reload();
    dispatch(login({ username: username, password: password, isLogin: true }));
  };
  console.log(refresh)
  return (
    <div className="loginpage">
      <Row className="justify-content-center  login">
        <Col xs={3} className="loginForm">
          <Row>
            <Col>
              <Form onSubmit={(event) => handleSubmit(event)} className="mx-4 mt-3">
                <img
                  src={logo}
                  className="logoLogin mt-2"
                  width="100px"
                  height="80px"
                />
                <h4>Login</h4>
                <Form.Group className="mb-3">
                  <Form.Label className="mt-3">Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                  />
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form.Group>
                <Form.Group className="mt-2 mb-3">
                  <small>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                  </small>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
