import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../Action/userAction";
import { API_URL } from "../utils/constant";
import { BiSearchAlt } from "react-icons/bi";

function Search() {
  const { usersResult, usersLoading, usersError } = useSelector(
    (state) => state.users
  );

  const [user, setUser] = useState([]);

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    console.log("1. dapet usr");
    dispatch(allUser());
    setUser(usersResult);
  }, [dispatch]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("search", searchTerm);
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <Form.Group className="mb-5">
            <InputGroup className="mb-3">
              <Button variant="outline-secondary" id="button-addon1">
              <span>
                <BiSearchAlt />{" "}
              </span>
              </Button>
              <Form.Control
                id="text"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                name="text"
                type="text"
                placeholder={`${(<BiSearchAlt />)} Search...`}
              />
              
            </InputGroup>
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <div>
        {searchTerm == "" ? (
          <p></p>
        ) : (
          usersResult &&
          usersResult
            .filter((val) => {
              if (
                val.username.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((suggestion, i) => {
              return (
                <div key={i}>
                  <Container>
                    <Card className="mt-5">
                      <Row>
                        <Col lg={2} md={1} sm={1} xs={1}>
                          <Card.Img
                            className="imageSearch"
                            variant="top"
                            src={`${API_URL}/${suggestion.avatar}`}
                            width="150px"
                            height="200px"
                          />
                        </Col>
                        <Col>
                          <Card.Body className="pt-5">
                            <Link to={`/users/account/${suggestion.id}`}>
                              <h3>{suggestion.username}</h3>
                            </Link>
                            <Card.Text>{suggestion.name}</Card.Text>
                            <Card.Text>{suggestion.bio}</Card.Text>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Container>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default Search;
