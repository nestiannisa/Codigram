import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../Action/userAction";
import { API_URL } from "../utils/constant";

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
    console.log("userre", usersResult);
  }, [dispatch]);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = user.filter((usr) => {
        const regex = new RegExp(`${text}`, "gi");
        return usr.username.match(regex);
      });
    }
    console.log("hasil", suggest);

    setSuggest(matches);
    setText(text);
  };
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Control
                id="text"
                onChange={(event) => onChangeHandler(event.target.value)}
                value={text}
                name="text"
                type="text"
                placeholder="Search..."
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <div>
        {suggest &&
          suggest.map((suggestion, i) => {
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
                          height="150px"
                        />
                      </Col>
                      <Col>
                        <Card.Body>
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
          })}
      </div>
    </div>
  );
}

export default Search;
