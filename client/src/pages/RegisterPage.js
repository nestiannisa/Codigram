import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../Action/userAction";
import logo from "../asset/logo1.png";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("1.masuk handle submit");
    //add user
    dispatch(register({ username: username, password: password }));
  };

  return (
    <>
      <div className="registerPage">
        <Row className="justify-content-center register">
          <Col xs={3} className="registerForm">
            <Row>
              <Col>
                <Form onSubmit={(event) => handleSubmit(event)} className="mx-4 mt-3">
                  <img
                    src={logo}
                    className="logoRegister mt-2"
                    width="100px"
                    height="80px"
                  />
                    <h4>Register</h4>
                    <Form.Group className="mb-3">
                      <Form.Label className="mt-3">Username</Form.Label>
                      <Form.Control
                        id="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter username"
                      />
                    </Form.Group>

                    <Form.Group className="mb-5">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button variant="primary" type="submit">
                        Create an Account
                      </Button>
                    </Form.Group>
                    <Form.Group className="mt-2 mb-3">
                      <small>
                        Already have an account? <Link to="/">Log In</Link>
                      </small>
                    </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RegisterPage;
