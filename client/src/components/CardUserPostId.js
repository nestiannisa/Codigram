import React, { useEffect, useState, useRef } from "react";
import { Card, Col, Row, Overlay, Popover } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL, login, token_for_access } from "../utils/constant";
import { timeSince } from "../utils/time";
import { useParams } from "react-router-dom";
import { accountUser } from "../Action/userAction";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, postByUserId } from "../Action/postAction";
import { FiEdit, FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";
import { BsThreeDotsVertical } from "react-icons/bs";

function CardUserPostId() {
  const { userPostIdResult, userPostIdLoading, userPostIdError } = useSelector(
    (state) => state.posts
  );

  const { userAccountResult, userAccountLoading, userAccountError } =
    useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    //panggil action post list
    console.log("1.use");
    dispatch(postByUserId(id));
    dispatch(accountUser(token_for_access));
  }, [dispatch]);

  const params = useParams();
  const id = +params.id;

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

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <>
      {userPostIdResult ? (
        userPostIdResult.map((post, i) => {
          return (
            <Col key={i} md={5} lg={4}>
              <Card className="mt-5">
                <Card.Img
                  className="userPostImage mt-0"
                  variant="top"
                  src={`${API_URL}/${post.image}`}
                />
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Text>{post.caption}</Card.Text>
                    </Col>
                    <Col xxs={1} xs={1} sm={1} md={2} lg={1}>
                      {login && post.UserId === userAccountResult.id ? (
                        <div>
                          <div ref={ref}>
                            <button className="buttonPop" onClick={handleClick}>
                              {" "}
                              <BsThreeDotsVertical />{" "}
                            </button>

                            <Overlay
                              show={show}
                              target={target}
                              placement="left"
                              container={ref}
                              containerPadding={20}
                            >
                              <Popover id="popover-contained">
                                <Popover.Body>
                                  <div>
                                    <Link to={`/account/posts/edit/${post.id}`}>
                                      <p className="mx-3">
                                        <FiEdit className="mx-3" /> Edit
                                      </p>
                                    </Link>
                                    <a
                                      href=""
                                      variant="danger"
                                      onClick={(e) => handleDelete(e, post.id)}
                                    >
                                      <p className="mx-3">
                                        {" "}
                                        <FiDelete className="mx-3" /> Delete
                                      </p>
                                    </a>
                                  </div>
                                </Popover.Body>
                              </Popover>
                            </Overlay>
                          </div>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <small className=" date mb-3">
                      {timeSince(post.createdAt)}
                    </small>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : userPostIdLoading ? (
        <p>loading</p>
      ) : (
        <p>{userPostIdError ? userPostIdError : "data kosong"}</p>
      )}
    </>
  );
}

export default CardUserPostId;
