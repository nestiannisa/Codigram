import React, { useEffect, useState, useRef } from "react";
import { getPostDetail } from "../Action/postAction";
import { useSelector, useDispatch } from "react-redux";
import { API_URL, login, token_for_access } from "../utils/constant";
import { timeSince } from "../utils/time";
import {
  Row,
  Card,
  Col,
  Form,
  Button,
  Popover,
  Overlay,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BiSend, BiTrashAlt, BiEdit } from "react-icons/bi";
import { commentById, addComment } from "../Action/commentAction";
import { deleteComment } from "../Action/commentAction";
import { accountUser } from "../Action/userAction";
import { Link } from "react-router-dom";
import { FiEdit, FiDelete } from "react-icons/fi";
import { deletePost} from "../Action/postAction";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";


function CardDetailPost() {
  const { getPostDetailResult, getPostDetailLoading, getPostDetailError } =
    useSelector((state) => state.posts);

  const { commentIdResult, commentIdLoading, commentIdError } = useSelector(
    (state) => state.comments
  );

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const { userAccountResult, userAccountLoading, userAccountError } =
    useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const params = useParams();

  const id = +params.id;

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

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
    console.log("1.masuk delete");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        //add user
        dispatch(deletePost(id));
      }
    });
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
                          <Link to={`/users/account/${post.User.id}`}>
                            <Card.Title className="postUser">
                              {post.User.username}
                            </Card.Title>
                          </Link>
                          <small className=" date">
                            {timeSince(post.createdAt)}
                          </small>
                        </Col>
                        <Col lg={1}>
                          {login && post.UserId === userAccountResult.id ? (
                            <div ref={ref}>
                              <button
                                className="buttonPop"
                                onClick={handleClick}
                              >
                                {" "}
                                <BsThreeDotsVertical />{" "}
                              </button>

                              <Overlay
                                show={show}
                                target={target}
                                placement="bottom"
                                container={ref}
                                containerPadding={20}
                              >
                                <Popover id="popover-contained">
                                  <Popover.Body>
                                    <div>
                                      <Link
                                        to={`/users/account/${post.User.id}`}
                                      >
                                        <p>
                                          <FaUser /> Profile
                                        </p>
                                      </Link>

                                      <Link
                                        to={`/account/posts/edit/${post.id}`}
                                      >
                                        <p><FiEdit /> Edit</p>
                                      </Link>
                                      <a
                                        href=""
                                        variant="danger"
                                        onClick={(e) =>
                                          handleDelete(e, post.id)
                                        }
                                      >
                                        <p> <FiDelete /> Delete</p>
                                      </a>
                                    </div>
                                  </Popover.Body>
                                </Popover>
                              </Overlay>
                            </div>
                          ) : (
                            <></>
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
                                <Col lg={1} xs={1}>
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
