import React, { useEffect } from "react";
import { API_URL,login, token_for_access } from "../utils/constant";
import { FiEdit } from "react-icons/fi";
import { CardUserPostId } from "../components/index";
import { Row, Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { accountById, accountUser } from "../Action/userAction";
import { useSelector, useDispatch } from "react-redux";

function AccountPageUser() {
  const {
    userAccountResult,
    userAccountIdResult,
    userAccountIdtLoading,
    userAccountIdError,
  } = useSelector((state) => state.users);
  
  const dispatch = useDispatch();

  const params = useParams();
  const id = +params.id;
  useEffect(() => {
    //panggil action post list
    console.log("1.use");
    dispatch(accountById(id));
    dispatch(accountUser(token_for_access));
  }, [dispatch]);

  return (
    <>
      {userAccountIdResult ? (
        <div className="container">
          <Row className="justify-content-md-center pt-5">
            <Card className="mt-3 cardAccount">
              <Row>
                <Col lg={2} md={4} sm={4} xs={5}>
                  <Card.Img
                    className=" accountImage mt-3 mb-3"
                    variant="top"
                    src={`${API_URL}/${userAccountIdResult.avatar}`}
                  />
                </Col>
                <Col>
                  <Card.Body>
                    <Row>
                      <Col lg={4} md={6} xs={11}>
                        <Card.Title className="accountUsername">
                          {userAccountIdResult.username}
                        </Card.Title>
                      </Col>
                      <Col>
                        {login &&
                        userAccountIdResult.id === userAccountResult.id ? (
                          <Link to={`/account/edit`}>
                            <FiEdit />
                          </Link>
                        ) : (
                          <p></p>
                        )}
                      </Col>
                    </Row>
                    <Card.Text className="content">
                      {userAccountIdResult.name}
                      <br></br>
                      {userAccountIdResult.bio}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Row>
          <hr></hr>
          <Row>
            <CardUserPostId />
          </Row>
        </div>
      ) : userAccountIdtLoading ? (
        <p>loading</p>
      ) : (
        <p> {userAccountIdError ? userAccountIdError : "data kosong"}</p>
      )}
    </>
  );
}
export default AccountPageUser;
