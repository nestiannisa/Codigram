import React, { useEffect, useState } from "react";
import { getPostDetail } from "../Action/postAction";
import { useSelector, useDispatch } from "react-redux";
import { API_URL, login, token_for_access } from "../utils/constant";
import { timeSince } from "../utils/time";
import { Row, Card, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BiSend, BiTrashAlt, BiEdit } from "react-icons/bi";
import { commentById, addComment } from "../Action/commentAction";
import { deleteComment } from "../Action/commentAction";
import { accountUser } from "../Action/userAction";
import { Link } from "react-router-dom";
import { FiEdit, FiDelete } from "react-icons/fi";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function CardDetailPost() {
  const { getPostDetailResult, getPostDetailLoading, getPostDetailError } =
    useSelector((state) => state.posts);

  const { commentIdResult, commentIdLoading, commentIdError } = useSelector(
    (state) => state.comments
  );

  const { userAccountResult, userAccountLoading, userAccountError } =
    useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const params = useParams();

  const id = +params.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("1. add");
    dispatch(addComment(id, { text: text }));
  };

  useEffect(() => {
    //panggil action post list
    console.log("1.use");
    dispatch(getPostDetail(id));
    dispatch(commentById(id));
    dispatch(accountUser(token_for_access));
  }, [dispatch]);

  const handleDelete = (e, id) => {
    e.preventDefault();
  };

  return (
    <>
      {getPostDetailResult ? (
        getPostDetailResult.map((post) => {
          return (
            <Row className="justify-content-md-center pt-5">
              <Card style={{ width: "70rem" }} className="mt-3">
                <Row>
                  <Col lg={8}>
                    <Card.Img
                      className="mt-3 mb-3"
                      variant="top"
                      src={`${API_URL}/${post.image}`}
                    />
                  </Col>
                  <Col>
                    <Card.Body>
                      <Row>
                        <Col lg={2} xs={2}>
                          <Card.Img
                            className=" PostAvatar mt-2 mb-1"
                            variant="top"
                            src={`${API_URL}/${post.User.avatar}`}
                          />
                        </Col>
                        <Col>
                          <Card.Title className="postUser">
                            {post.User.username}
                          </Card.Title>
                          <small className=" date">
                            {timeSince(post.createdAt)}
                          </small>
                        </Col>
                        <Col lg={2}>
                          {login && post.UserId === userAccountResult.id ? (
                            <div>
                              <Dropdown  drop="right" >
                                <DropdownToggle></DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem>
                                    <Link to={`/account/posts/edit/${post.id}`}>
                                      <FiEdit />
                                    </Link>
                                  </DropdownItem>
                                  <DropdownItem>
                                    <a
                                      href=""
                                      variant="danger"
                                      onClick={(e) => handleDelete(e, post.id)}
                                    >
                                      <FiDelete />
                                    </a>
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          ) : (
                            <p></p>
                          )}
                        </Col>
                        <Card.Text className="postCaption">
                          {post.caption}
                        </Card.Text>
                      </Row>
                      <hr></hr>
                      {commentIdResult ? (
                        commentIdResult.map((com) => {
                          return (
                            <div>
                              <Row>
                                <Col>
                                  <p className="postComment">
                                    {com.User.username}: {com.text}
                                  </p>
                                </Col>
                                <Col lg={3} xs={4}>
                                  {login &&
                                  com.User.id === userAccountResult.id ? (
                                    <div>
                                      <a
                                        href=""
                                        variant="danger"
                                        onClick={() =>
                                          dispatch(deleteComment(com.id))
                                        }
                                      >
                                        <BiTrashAlt />
                                      </a>
                                      <Link
                                        to={`/comments/edit/${com.id}`}
                                        className=" mx-1"
                                      >
                                        <a>
                                          <BiEdit />
                                        </a>
                                      </Link>
                                    </div>
                                  ) : (
                                    <p></p>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          );
                        })
                      ) : commentIdLoading ? (
                        <p>loading</p>
                      ) : (
                        <p>{commentIdError ? commentIdError : "datakosong"}</p>
                      )}
                      <Row>
                        <Col>
                          <Form.Control
                            id="text"
                            name="text"
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Add Comment..."
                          />
                        </Col>
                        <Col>
                          <Button onClick={(e) => handleSubmit(e)}>
                            <BiSend />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Row>
          );
        })
      ) : getPostDetailLoading ? (
        <p>loading</p>
      ) : (
        <p>{getPostDetailError ? getPostDetailError : "data kosong"}</p>
      )}
    </>
  );
}

export default CardDetailPost;
