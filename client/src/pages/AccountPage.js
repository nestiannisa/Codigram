import React, { useEffect } from "react";
import { API_URL, token_for_access } from "../utils/constant";
import { CardUserPost } from "../components/index";
import { Link } from "react-router-dom";
import { Row, Card, Col, Button } from "react-bootstrap";
import { accountUser } from "../Action/userAction";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit} from 'react-icons/fi';

function AccountPage() {
  const { userAccountResult, userAccountLoading, userAccountError } =
    useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    //panggil action post list
    dispatch(accountUser(token_for_access));
  }, [dispatch]);

  return (
    <>
      {userAccountResult ? (
        <div className="container">
          <Row className="justify-content-md-center pt-5">
            <Card className="mt-3 cardAccount">
              <Row>
                <Col sm={1} md={2} lg={3}>
                  <Card.Img
                    className=" accountImage mt-3 mb-3"
                    variant="top"
                    src={`${API_URL}/${userAccountResult.avatar}`}
                  />
                </Col>
                <Col>
                  <Card.Body>
                    <Row>
                      <Col >
                        <Card.Title className="accountUsername">
                          {userAccountResult.username}
                        </Card.Title>
                      </Col>
                      <Col xxs={1} xs={1} sm={1} md={2} lg={1}>
                        <Link to={`/account/edit`}>
                        <FiEdit/>
                        </Link>
                      </Col>
                    </Row>

                    <Card.Text className="content">{userAccountResult.name}<br></br>
                    {userAccountResult.bio}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Row>
          <hr></hr>
          <Row>
            <CardUserPost />
          </Row>
        </div>
      ) : userAccountLoading ? (
        <p>loading</p>
      ) : (
        <p> {userAccountError ? userAccountError : "data kosong"}</p>
      )}
    </>
  );
}
export default AccountPage;
